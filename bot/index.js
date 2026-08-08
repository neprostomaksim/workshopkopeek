import "dotenv/config";
import { createServer } from "node:http";
import { Bot, Keyboard } from "grammy";
import { createClient } from "@supabase/supabase-js";

const { BOT_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_CHAT_ID } = process.env;

if (!BOT_TOKEN || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "❌ Заполните BOT_TOKEN, SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в .env (см. .env.example)"
  );
  process.exit(1);
}

if (!ADMIN_CHAT_ID) {
  console.warn(
    "⚠️ ADMIN_CHAT_ID не задан — уведомления о заявках слать некуда. Напишите боту /id, чтобы узнать свой id."
  );
}

// service_role обходит RLS — ключ живёт ТОЛЬКО здесь, на сервере. Никогда не кладите его на сайт.
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const bot = new Bot(BOT_TOKEN);

// Состояние диалога в памяти. Для больших нагрузок вынести в Redis/БД.
const sessions = new Map(); // chatId -> { step: 'name'|'phone', name?, source }
const DEFAULT_SOURCE = "vibe-coding";

bot.command("start", async (ctx) => {
  // ?start=vibecoding из ссылки лендинга приходит сюда — метка, с какого лендинга заявка.
  const source = (ctx.match || "").trim() || DEFAULT_SOURCE;
  sessions.set(ctx.chat.id, { step: "name", source });
  await ctx.reply(
    "Здравствуйте! 👋\nЗапишу вас на воркшоп «Вайб-кодинг за 3 часа».\n\nКак вас зовут?",
    { reply_markup: { remove_keyboard: true } }
  );
});

bot.command("cancel", async (ctx) => {
  sessions.delete(ctx.chat.id);
  await ctx.reply("Отменил. Чтобы записаться заново — /start", {
    reply_markup: { remove_keyboard: true },
  });
});

// Узнать свой chat id — чтобы вписать в ADMIN_CHAT_ID и получать заявки в этот чат.
bot.command("id", async (ctx) => {
  await ctx.reply(
    `Этот чат id: ${ctx.chat.id}\n\nВпишите его в переменную ADMIN_CHAT_ID — сюда будут приходить заявки.`
  );
});

// Телефон, пришедший кнопкой «Отправить телефон»
bot.on("message:contact", async (ctx) => {
  const s = sessions.get(ctx.chat.id);
  if (!s || s.step !== "phone") return;
  await saveLead(ctx, s, ctx.message.contact.phone_number);
});

// Текстовые сообщения: имя, затем (при желании) телефон вручную
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim();
  if (text.startsWith("/")) return; // команды обрабатываются отдельно

  const s = sessions.get(ctx.chat.id);
  if (!s) {
    await ctx.reply("Чтобы записаться на воркшоп, нажмите /start");
    return;
  }

  if (s.step === "name") {
    if (text.length < 2) {
      await ctx.reply("Напишите, пожалуйста, ваше имя.");
      return;
    }
    s.name = text;
    s.step = "phone";
    sessions.set(ctx.chat.id, s);

    const kb = new Keyboard().requestContact("📱 Отправить телефон").resized().oneTime();
    await ctx.reply(
      `Приятно познакомиться, ${s.name}!\n\nОставьте номер телефона — нажмите кнопку ниже или впишите вручную.`,
      { reply_markup: kb }
    );
    return;
  }

  if (s.step === "phone") {
    const phone = normalizePhone(text);
    if (!phone) {
      await ctx.reply(
        "Похоже, это не телефон. Пришлите номер или нажмите кнопку «📱 Отправить телефон»."
      );
      return;
    }
    await saveLead(ctx, s, phone);
  }
});

async function saveLead(ctx, s, rawPhone) {
  const from = ctx.from || {};
  const phone = normalizePhone(rawPhone) || rawPhone;

  const { error } = await supabase.from("workshop_leads").insert({
    name: s.name,
    phone,
    source: s.source,
    tg_user_id: from.id ?? null,
    tg_username: from.username ?? null,
  });

  sessions.delete(ctx.chat.id);

  if (error) {
    console.error("Supabase insert error:", error);
    await ctx.reply(
      "Не получилось сохранить заявку 😔 Попробуйте ещё раз через минуту (/start) или напишите нам.",
      { reply_markup: { remove_keyboard: true } }
    );
    return;
  }

  await ctx.reply(
    "Готово! Заявка принята ✅\n\nСкоро свяжемся и пришлём детали оплаты и точный адрес.\nДо встречи на воркшопе!",
    { reply_markup: { remove_keyboard: true } }
  );

  // Уведомление организатору о новой заявке.
  const when = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" });
  await notifyAdmin(
    "🆕 Новая заявка на воркшоп\n\n" +
      `👤 Имя: ${s.name}\n` +
      `📞 Телефон: ${phone}\n` +
      `🔗 Telegram: ${from.username ? "@" + from.username : "—"}\n` +
      `🏷 Источник: ${s.source}\n` +
      `🕐 ${when}`
  );
}

// Шлём организатору сообщение, если задан ADMIN_CHAT_ID. Ошибка тут не ломает запись клиента.
async function notifyAdmin(text) {
  if (!ADMIN_CHAT_ID) return;
  try {
    await bot.api.sendMessage(ADMIN_CHAT_ID, text);
  } catch (e) {
    console.error("notifyAdmin error:", e);
  }
}

function normalizePhone(text) {
  const cleaned = String(text).replace(/[^\d+]/g, "");
  const digits = cleaned.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15 ? cleaned : null;
}

bot.catch((err) => console.error("Bot error:", err));

// Мини HTTP-сервер: нужен, чтобы деплоить на бесплатный Web Service (Render/аналоги),
// который требует слушать порт, и чтобы пинг-сервис не давал сервису «уснуть».
const PORT = process.env.PORT || 3000;
createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("ok");
}).listen(PORT, () => console.log(`🌐 health-сервер слушает порт ${PORT}`));

bot.start({
  onStart: (info) => console.log(`✅ Бот @${info.username} запущен`),
});

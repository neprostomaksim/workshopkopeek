import "dotenv/config";
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Bot, Keyboard, InputFile, InlineKeyboard, webhookCallback } from "grammy";
import { createClient } from "@supabase/supabase-js";

const {
  BOT_TOKEN,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_CHAT_ID,
  META_CONVERSIONS_API_TOKEN,
  META_GRAPH_API_VERSION,
  META_TEST_EVENT_CODE,
  META_EVENT_SOURCE_URL,
} = process.env;

const META_PIXEL_ID = process.env.META_PIXEL_ID || "1415485604048699";

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
const sessions = new Map(); // chatId -> { step: 'pick'|'name'|'phone', name?, source, workshop? }
const DEFAULT_SOURCE = "vibe-coding";

// Оплата воркшопа (express-pay / ЕРИП).
const __dirname = dirname(fileURLToPath(import.meta.url));
const PAYMENT_URL = "https://client.express-pay.by/show?k=2E4F8596-B7B0-4E8C-8AAC-07BA78696B99";
const PRICE = "130 BYN";
const QR_PATH = join(__dirname, "qr.png");

// Расписание воркшопов. Чтобы изменить/добавить — правьте этот список (и передеплойте).
const VENUE = "Минск, Пространство «Молоко»";
const WORKSHOPS = [
  { id: "ai-agents-29-09", date: "29 сентября", title: "Создание ИИ-агентов" },
  { id: "vibe-coding-06-10", date: "6 октября", title: "Вайб-кодинг для предпринимателей" },
  { id: "ai-sales-13-10", date: "13 октября", title: "Создание ИИ-менеджера по продажам" },
  { id: "vibe-coding-20-10", date: "20 октября", title: "Вайб-кодинг для предпринимателей" },
];
const workshopById = (id) => WORKSHOPS.find((w) => w.id === id) || null;
function workshopKeyboard(excludeWorkshopId) {
  const kb = new InlineKeyboard();
  for (const w of WORKSHOPS) {
    if (w.id !== excludeWorkshopId) kb.text(`${w.date} — ${w.title}`, `w:${w.id}`).row();
  }
  return kb;
}

bot.command("start", async (ctx) => {
  // ?start=... из ссылки лендинга — метка источника (для статистики).
  const source = (ctx.match || "").trim() || DEFAULT_SOURCE;
  if (source.startsWith("lead_") && (await continueWebsiteLead(ctx, source))) {
    logStart(ctx, "website-lead");
    return;
  }
  sessions.set(ctx.chat.id, { step: "pick", source });
  logStart(ctx, source); // фиксируем вход в бота (для статистики), не блокируя ответ
  await ctx.reply(
    `Здравствуйте! 👋\nВыберите воркшоп, на который хотите записаться:\n\n📍 ${VENUE}`,
    { reply_markup: workshopKeyboard() }
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

// Выбор воркшопа из списка кнопок.
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data || "";
  if (!data.startsWith("w:")) return void ctx.answerCallbackQuery();
  const w = workshopById(data.slice(2));
  if (!w) return void ctx.answerCallbackQuery({ text: "Воркшоп не найден" });

  const prev = sessions.get(ctx.chat.id) || {};
  if (prev.step === "additional_pick" && prev.name && prev.phone) {
    sessions.set(ctx.chat.id, {
      step: "phone",
      source: "telegram-repeat",
      workshop: w,
      name: prev.name,
    });
    await ctx.answerCallbackQuery();
    try {
      await ctx.editMessageText(`✅ Ещё один воркшоп: ${w.title}\n🗓 ${w.date} · ${VENUE}`);
    } catch (_) {}
    await saveLead(ctx, { name: prev.name, workshop: w, source: "telegram-repeat" }, prev.phone);
    return;
  }

  sessions.set(ctx.chat.id, { step: "name", source: prev.source || DEFAULT_SOURCE, workshop: w });
  await ctx.answerCallbackQuery();
  try {
    await ctx.editMessageText(`✅ Воркшоп: ${w.title}\n🗓 ${w.date} · ${VENUE}`);
  } catch (_) {}
  await ctx.reply("Как вас зовут?", { reply_markup: { remove_keyboard: true } });
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

  if (s.step === "pick") {
    await ctx.reply("Пожалуйста, выберите воркшоп кнопкой выше 👆", {
      reply_markup: workshopKeyboard(),
    });
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
  const w = s.workshop;
  const workshopLabel = w ? `${w.title} · ${w.date}` : s.source;

  const now = new Date().toISOString();
  const { error } = await supabase.from("workshop_leads").insert({
    name: s.name,
    phone,
    source: s.source || "telegram",
    workshop_id: w?.id ?? null,
    status: "payment_link_sent",
    bot_started_at: now,
    payment_link_sent_at: now,
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
    `Готово! Заявка на «${w ? w.title : "воркшоп"}»${w ? ` (${w.date})` : ""} принята ✅\n\n` +
      "Осталось оплатить участие — ссылка и QR-код ниже 👇",
    { reply_markup: { remove_keyboard: true } }
  );
  await sendPayment(ctx);

  // Реальная конверсия: отправляем Lead только после успешного сохранения телефона.
  // Ошибка Meta не должна мешать заявке или ответу бота.
  if (s.source !== "telegram-repeat") {
    void sendMetaLead({ from, phone, name: s.name, workshopLabel });
  }

  // Уведомление организатору о новой заявке.
  const when = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" });
  await notifyAdmin(
    "🆕 Новая заявка\n\n" +
      `🎓 Воркшоп: ${workshopLabel}\n` +
      `👤 Имя: ${s.name}\n` +
      `📞 Телефон: ${phone}\n` +
      `🔗 Telegram: ${from.username ? "@" + from.username : "—"}\n` +
      `🕐 ${when}`
  );
}

// Заявка уже создана на сайте. В start-параметре только одноразовый токен —
// имя и телефон никогда не передаются в ссылке Telegram.
async function continueWebsiteLead(ctx, token) {
  const { data: lead, error } = await supabase
    .from("workshop_leads")
    .select("id,name,phone,source,workshop_id")
    .eq("registration_token", token)
    .maybeSingle();

  if (error) {
    console.error("Website lead lookup error:", error.message || error);
    return false;
  }
  if (!lead) return false;

  const from = ctx.from || {};
  const workshop = workshopById(lead.workshop_id);
  const workshopLabel = workshop ? `${workshop.title} · ${workshop.date}` : lead.source;
  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("workshop_leads")
    .update({
      tg_user_id: from.id ?? null,
      tg_username: from.username ?? null,
      registration_token: null,
      status: "payment_link_sent",
      bot_started_at: now,
      payment_link_sent_at: now,
    })
    .eq("id", lead.id);

  if (updateError) {
    console.error("Website lead Telegram handoff error:", updateError.message || updateError);
    await ctx.reply("Не получилось открыть вашу запись. Пожалуйста, напишите нам — поможем.");
    return true;
  }

  await ctx.reply(
    `Здравствуйте, ${lead.name}! ✅\n\n` +
      `Вы записаны на «${workshopLabel}».\n\n` +
      "Ниже — ссылка на оплату. После оплаты пришлём детали участия.",
    { reply_markup: { remove_keyboard: true } }
  );
  await sendPayment(ctx);

  await notifyAdmin(
    "🔔 Заявка перешла в Telegram\n\n" +
      `🎓 Воркшоп: ${workshopLabel}\n` +
      `👤 Имя: ${lead.name}\n` +
      `📞 Телефон: ${lead.phone}\n` +
      "💳 Ссылка на оплату отправлена"
  );

  if (WORKSHOPS.some((item) => item.id !== workshop?.id)) {
    sessions.set(ctx.chat.id, {
      step: "additional_pick",
      name: lead.name,
      phone: lead.phone,
    });
    await ctx.reply("Хотите записаться ещё на другой воркшоп?", {
      reply_markup: workshopKeyboard(workshop?.id),
    });
  }
  return true;
}

function sha256(value) {
  return createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

function normalizePhoneForMeta(value) {
  const digits = String(value).replace(/\D/g, "");
  if (digits.length === 9) return `375${digits}`;
  if (digits.length === 11 && digits.startsWith("80")) return `375${digits.slice(2)}`;
  return digits;
}

async function sendMetaLead({ from, phone, name, workshopLabel }) {
  if (!META_PIXEL_ID || !META_CONVERSIONS_API_TOKEN) return;

  const version = META_GRAPH_API_VERSION ? `${META_GRAPH_API_VERSION.replace(/^\/+|\/+$/g, "")}/` : "";
  const endpoint = new URL(`https://graph.facebook.com/${version}${META_PIXEL_ID}/events`);
  endpoint.searchParams.set("access_token", META_CONVERSIONS_API_TOKEN);
  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "chat",
    event_source_url: META_EVENT_SOURCE_URL || "https://workshopkopeek.vercel.app/",
    user_data: {
      ph: [sha256(normalizePhoneForMeta(phone))],
      fn: name ? [sha256(name)] : undefined,
      external_id: from.id ? [sha256(from.id)] : undefined,
    },
    custom_data: {
      content_name: workshopLabel,
      content_category: "workshop",
      currency: "BYN",
      value: 130,
    },
  };

  try {
    const body = { data: [event] };
    if (META_TEST_EVENT_CODE) body.test_event_code = META_TEST_EVENT_CODE;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("Meta CAPI error:", response.status, message.slice(0, 500));
    }
  } catch (error) {
    console.error("Meta CAPI request error:", error.message || error);
  }
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

// Фиксируем вход в бота (нажатие /start) в таблицу bot_events — для статистики
// переходов и конверсии. Fire-and-forget: не ждём и не ломаем диалог при ошибке
// (например, если таблица bot_events ещё не создана).
function logStart(ctx, source) {
  const from = ctx.from || {};
  supabase
    .from("bot_events")
    .insert({
      type: "start",
      tg_user_id: from.id ?? null,
      tg_username: from.username ?? null,
      source,
    })
    .then(({ error }) => {
      if (error) console.error("bot_events insert error:", error.message || error);
    });
}

// Отправляет клиенту QR-код и кнопку-ссылку на оплату.
async function sendPayment(ctx) {
  const caption =
    "💳 Оплата участия\n\n" +
    "Оплатите онлайн по кнопке ниже или отсканируйте QR-код (ЕРИП) — как удобнее.\n" +
    "Сумма указана в форме оплаты. После оплаты пришлём точный адрес и детали.";
  try {
    await ctx.replyWithPhoto(new InputFile(QR_PATH), {
      caption,
      reply_markup: new InlineKeyboard().url("💳 Оплатить онлайн", PAYMENT_URL),
    });
  } catch (e) {
    console.error("sendPayment error:", e);
    // Фолбэк: если фото не ушло — хотя бы ссылка текстом с кнопкой.
    await ctx.reply(`💳 Оплата участия\n${PAYMENT_URL}`, {
      reply_markup: new InlineKeyboard().url("💳 Оплатить онлайн", PAYMENT_URL),
    });
  }
}

function normalizePhone(text) {
  const cleaned = String(text).replace(/[^\d+]/g, "");
  const digits = cleaned.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15 ? cleaned : null;
}

bot.catch((err) => console.error("Bot error:", err));

// ── Запуск ────────────────────────────────────────────────────────────────
// На Render (есть публичный URL) — webhook: Telegram сам шлёт апдейты на наш адрес,
// поэтому нет long-polling и нет конфликта 409 при передеплое.
// Локально (URL нет) — long polling для удобного теста.
const PORT = process.env.PORT || 3000;
const PUBLIC_URL = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL || "";
const SECRET = (BOT_TOKEN.split(":")[1] || "hook").replace(/[^A-Za-z0-9_-]/g, ""); // для проверки, что запрос от Telegram
const WEBHOOK_PATH = "/telegram";

if (PUBLIC_URL) {
  const handleUpdate = webhookCallback(bot, "http", { secretToken: SECRET });

  const server = createServer(async (req, res) => {
    if (req.method === "POST" && req.url === WEBHOOK_PATH) {
      try {
        await handleUpdate(req, res);
      } catch (e) {
        console.error("webhook error:", e);
        if (!res.headersSent) {
          res.writeHead(200);
          res.end();
        }
      }
      return;
    }
    // Health-эндпоинт (для Render и пинг-сервиса UptimeRobot)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
  });

  server.listen(PORT, async () => {
    console.log(`🌐 сервер слушает порт ${PORT}`);
    try {
      await bot.init();
      await bot.api.setWebhook(`${PUBLIC_URL}${WEBHOOK_PATH}`, {
        secret_token: SECRET,
        drop_pending_updates: true,
      });
      console.log(`✅ Бот @${bot.botInfo.username} на webhook: ${PUBLIC_URL}${WEBHOOK_PATH}`);
    } catch (e) {
      console.error("setWebhook error:", e);
    }
  });
} else {
  // Локальный режим: снимаем возможный webhook и работаем polling.
  bot.api
    .deleteWebhook({ drop_pending_updates: false })
    .catch(() => {})
    .finally(() => {
      createServer((_req, res) => {
        res.writeHead(200);
        res.end("ok");
      }).listen(PORT, () => console.log(`🌐 health-сервер слушает порт ${PORT}`));
      bot.start({
        onStart: (info) => console.log(`✅ Бот @${info.username} запущен (polling)`),
      });
    });
}

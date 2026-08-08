# Telegram-бот записи на воркшоп

Собирает **имя + телефон** и пишет заявку в **Supabase** (таблица `workshop_leads`).
Ссылка «Занять место» на лендинге ведёт сюда: `https://t.me/<бот>?start=vibecoding`.

Поток: `/start` → «Как вас зовут?» → имя → кнопка «📱 Отправить телефон» → заявка сохранена ✅

## 1. Создать таблицу в Supabase (один раз)

Supabase → **SQL Editor** → выполните файл [`../supabase/workshop_leads.sql`](../supabase/workshop_leads.sql).

## 2. Создать бота

1. В Telegram напишите [@BotFather](https://t.me/BotFather) → `/newbot` → задайте имя и @username.
2. Скопируйте **токен**.
3. Впишите @username бота в `lib/config.js` лендинга:
   `registerUrl: "https://t.me/ВАШ_БОТ?start=vibecoding"`.

## 3. Настроить и запустить

```bash
cd bot
cp .env.example .env      # впишите BOT_TOKEN и SUPABASE_SERVICE_ROLE_KEY
npm install
npm start
```

`SUPABASE_SERVICE_ROLE_KEY` берётся в Supabase → **Project Settings → API → service_role**.
⚠️ Это секрет — он обходит RLS. Живёт только здесь, на сервере. Никогда не кладите его на сайт/в git.

## 4. Деплой на Render (24/7, бесплатно)

В репозитории есть `render.yaml` (Blueprint) — Render сам поднимет сервис.

1. [dashboard.render.com](https://dashboard.render.com) → **New → Blueprint** → подключите GitHub-репозиторий `workshopkopeek`.
2. Render найдёт `render.yaml` и предложит сервис **workshop-tg-bot**. Нажмите **Apply**.
3. В сервисе → **Environment** впишите секреты (их нет в git):
   - `BOT_TOKEN` — токен из BotFather
   - `SUPABASE_URL` — `https://yiaugigxfdmkicaruhsw.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` — service_role ключ
4. **Manual Deploy → Deploy**. В логах должно появиться `✅ Бот @… запущен`.

### Чтобы бесплатный сервис не «засыпал»
Free Web Service на Render засыпает после 15 минут без HTTP-запросов. У бота есть health-эндпоинт
`/` — настройте внешний пинг, чтобы держать его живым:

- [uptimerobot.com](https://uptimerobot.com) (бесплатно) → Add Monitor → HTTP(s) → URL вашего сервиса
  на Render (вида `https://workshop-tg-bot.onrender.com`) → интервал 5 минут.

Тогда бот работает постоянно и отвечает мгновенно.

> Нужна максимальная надёжность без пинга — поменяйте в `render.yaml` `type: web` → `type: worker`
> (Render **Background Worker**, ~$7/мес): он не засыпает и не требует health-пинга.

**Важно:** когда бот работает на Render, не держите второй экземпляр запущенным локально —
Telegram разрешает только один polling на токен (иначе конфликт 409). Остановите локальный `npm start`.

### Альтернатива — VPS
`npm install` + `pm2 start index.js --name workshop-bot`.

## Заявки

Смотреть заявки: Supabase → **Table Editor → workshop_leads**.
Поле `source` показывает, с какого лендинга пришла заявка (метка из `?start=`).

## Уведомления о заявках

Бот присылает организатору сообщение при каждой новой заявке (имя, телефон, ник, источник, время).

Как включить:
1. Напишите боту команду **`/id`** — он ответит вашим chat id.
2. Впишите этот id в переменную **`ADMIN_CHAT_ID`** (в `.env` локально или в Environment на Render) → передеплой.

Хотите, чтобы заявки видела вся команда — создайте группу в Telegram, добавьте туда бота,
отправьте в группе `/id` и укажите id группы (он с минусом) в `ADMIN_CHAT_ID`.

## Команды бота
- `/start` — начать запись (принимает метку: `/start vibecoding`)
- `/cancel` — отменить и начать заново
- `/id` — показать chat id (для настройки уведомлений)

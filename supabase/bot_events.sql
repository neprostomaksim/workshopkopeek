-- События бота для статистики: пока фиксируем вход (нажатие /start) с меткой источника.
-- Запустить один раз в Supabase → SQL Editor (проект yiaugigxfdmkicaruhsw).
-- Пишет сюда Telegram-бот через service_role ключ (обходит RLS), читает — платформа.

create table if not exists public.bot_events (
  id           uuid primary key default gen_random_uuid(),
  bot          text        not null default 'workshopkopeek', -- на будущее: несколько ботов
  type         text        not null default 'start',          -- start | (позже другие события)
  tg_user_id   bigint,                                        -- id пользователя в Telegram
  tg_username  text,                                          -- @username, если есть
  source       text,                                          -- метка ?start= (лендинг/канал)
  created_at   timestamptz not null default now()
);

create index if not exists bot_events_created_at_idx on public.bot_events (created_at desc);
create index if not exists bot_events_type_idx       on public.bot_events (type);
create index if not exists bot_events_source_idx     on public.bot_events (source);

-- RLS включён, публичных политик нет: бот пишет service_role-ключом (обходит RLS),
-- платформа читает тоже service_role-ключом. Доступ с anon закрыт.
alter table public.bot_events enable row level security;

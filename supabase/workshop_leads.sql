-- Таблица заявок с лендингов воркшопов.
-- Запустить в Supabase → SQL Editor (проект yiaugigxfdmkicaruhsw).
-- Пишет в неё Telegram-бот через service_role ключ (обходит RLS).

create table if not exists public.workshop_leads (
  id           uuid primary key default gen_random_uuid(),
  name         text        not null,
  phone        text        not null,
  source       text,                    -- какой лендинг: 'vibe-coding', 'ai-agents' и т.д.
  tg_user_id   bigint,                  -- id пользователя в Telegram
  tg_username  text,                    -- @username, если есть
  workshop_id  text,                    -- идентификатор выбранного воркшопа
  registration_token text unique,        -- одноразовый токен передачи из сайта в Telegram
  status       text not null default 'new',
  bot_started_at timestamptz,
  payment_link_sent_at timestamptz,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  meta_event_id text,
  created_at   timestamptz not null default now()
);

create index if not exists workshop_leads_created_at_idx on public.workshop_leads (created_at desc);
create index if not exists workshop_leads_source_idx     on public.workshop_leads (source);

-- Безопасная миграция для уже созданной таблицы.
alter table public.workshop_leads add column if not exists workshop_id text;
alter table public.workshop_leads add column if not exists registration_token text;
alter table public.workshop_leads add column if not exists status text not null default 'new';
alter table public.workshop_leads add column if not exists bot_started_at timestamptz;
alter table public.workshop_leads add column if not exists payment_link_sent_at timestamptz;
alter table public.workshop_leads add column if not exists utm_source text;
alter table public.workshop_leads add column if not exists utm_medium text;
alter table public.workshop_leads add column if not exists utm_campaign text;
alter table public.workshop_leads add column if not exists utm_content text;
alter table public.workshop_leads add column if not exists meta_event_id text;
create index if not exists workshop_leads_status_idx on public.workshop_leads (status);
create unique index if not exists workshop_leads_registration_token_idx
  on public.workshop_leads (registration_token) where registration_token is not null;

-- Включаем Row Level Security и НЕ добавляем публичных политик:
-- бот пишет service_role-ключом (он обходит RLS), поэтому доступ с anon закрыт.
alter table public.workshop_leads enable row level security;

-- (Опционально) если когда-нибудь захотите вставлять заявки прямо с сайта
-- анонимным ключом — раскомментируйте политику ниже. Пока НЕ нужно.
-- create policy "anon insert leads" on public.workshop_leads
--   for insert to anon with check (true);

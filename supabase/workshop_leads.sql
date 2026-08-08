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
  created_at   timestamptz not null default now()
);

create index if not exists workshop_leads_created_at_idx on public.workshop_leads (created_at desc);
create index if not exists workshop_leads_source_idx     on public.workshop_leads (source);

-- Включаем Row Level Security и НЕ добавляем публичных политик:
-- бот пишет service_role-ключом (он обходит RLS), поэтому доступ с anon закрыт.
alter table public.workshop_leads enable row level security;

-- (Опционально) если когда-нибудь захотите вставлять заявки прямо с сайта
-- анонимным ключом — раскомментируйте политику ниже. Пока НЕ нужно.
-- create policy "anon insert leads" on public.workshop_leads
--   for insert to anon with check (true);

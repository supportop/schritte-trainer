-- Schritte Trainer cloud sync
-- Run this once in Supabase Dashboard -> SQL Editor.

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "users_manage_own_progress" on public.user_progress;

create policy "users_manage_own_progress"
on public.user_progress
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update, delete
on table public.user_progress
to authenticated;

-- Each authenticated user can now read/write only the row whose user_id
-- equals their own auth.uid().

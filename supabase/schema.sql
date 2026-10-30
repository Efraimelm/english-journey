-- English Journey: tabela de progresso (uma linha por aluno, com o progresso em JSON).
-- Cada aluno só enxerga e altera a própria linha (RLS).

create table if not exists public.english_journey (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.english_journey enable row level security;

create policy "aluno lê o próprio progresso" on public.english_journey
  for select using (auth.uid() = user_id);
create policy "aluno cria o próprio progresso" on public.english_journey
  for insert with check (auth.uid() = user_id);
create policy "aluno atualiza o próprio progresso" on public.english_journey
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

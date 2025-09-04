-- users handled by auth.users
create table if not exists public.profiles (
  user_id uuid primary key references auth.users on delete cascade,
  full_name text,
  company text,
  created_at timestamptz default now()
);

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users on delete cascade,
  tenweb_site_id text,
  status text not null default 'draft',
  domain text,
  plan text not null default 'starter',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.site_drafts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users on delete cascade,
  brief jsonb not null,
  design jsonb,
  pages_meta jsonb,
  created_at timestamptz default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,
  plan text,
  trial_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;
alter table sites enable row level security;
alter table site_drafts enable row level security;
alter table subscriptions enable row level security;

create policy "self profile" on profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own sites" on sites for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "own drafts" on site_drafts for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "own subs" on subscriptions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


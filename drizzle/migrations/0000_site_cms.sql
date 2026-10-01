create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- First signed-in user may claim admin once; afterwards nobody can.
create or replace function public.claim_admin()
returns boolean language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return public.has_role(auth.uid(), 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;
revoke execute on function public.claim_admin() from anon, public;
grant execute on function public.claim_admin() to authenticated;

create or replace function public.admin_exists()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where role = 'admin') $$;
grant execute on function public.admin_exists() to anon, authenticated;

-- Content sections stored as JSON documents (settings, founder, contact, services, portfolio, clients)
create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "public read content" on public.site_content for select to anon, authenticated using (true);
create policy "admin write content" on public.site_content for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  company text not null default '' check (char_length(company) <= 150),
  rating int not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 1 and 1000),
  full_story text not null default '' check (char_length(full_story) <= 4000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select, insert on public.reviews to anon;
grant select, insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "public read approved" on public.reviews for select to anon, authenticated using (status = 'approved' or public.has_role(auth.uid(), 'admin'));
create policy "public submit pending" on public.reviews for insert to anon, authenticated with check (status = 'pending' and full_story = '');
create policy "admin insert reviews" on public.reviews for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "admin update reviews" on public.reviews for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "admin delete reviews" on public.reviews for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  category text not null default 'Announcement',
  image text not null default '',
  published_at timestamptz not null default now()
);
grant select on public.news to anon, authenticated;
grant insert, update, delete on public.news to authenticated;
grant all on public.news to service_role;
alter table public.news enable row level security;
create policy "public read news" on public.news for select to anon, authenticated using (true);
create policy "admin write news" on public.news for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('Contact form','Chatbot')),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 255),
  phone text not null default '' check (char_length(phone) <= 30),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);
grant insert on public.leads to anon;
grant select, insert, delete on public.leads to authenticated;
grant all on public.leads to service_role;
alter table public.leads enable row level security;
create policy "anyone submits lead" on public.leads for insert to anon, authenticated with check (true);
create policy "admin reads leads" on public.leads for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin deletes leads" on public.leads for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
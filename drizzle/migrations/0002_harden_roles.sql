create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and _user_id = auth.uid()
      and role = _role
  );
$$;
--> statement-breakpoint
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
--> statement-breakpoint
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
--> statement-breakpoint
grant insert, update, delete on public.user_roles to authenticated;
--> statement-breakpoint
create policy "admins manage user roles" on public.user_roles
for all to authenticated
using (public.has_role(auth.uid(), 'admin'::public.app_role))
with check (public.has_role(auth.uid(), 'admin'::public.app_role));
--> statement-breakpoint
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  created_at timestamptz not null default now()
);
--> statement-breakpoint
grant select on public.profiles to authenticated;
--> statement-breakpoint
alter table public.profiles enable row level security;
--> statement-breakpoint
create policy "users and admins read profiles" on public.profiles
for select to authenticated
using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'::public.app_role));
--> statement-breakpoint
create or replace function public.claim_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(auth.uid(), 'admin'::public.app_role);
$$;
--> statement-breakpoint
revoke execute on function public.claim_admin() from public, anon;
--> statement-breakpoint
grant execute on function public.claim_admin() to authenticated;
--> statement-breakpoint
alter table public.reviews
  add column if not exists avatar_url text not null default '',
  add column if not exists company_logo_url text not null default '';
--> statement-breakpoint
drop policy if exists "public read approved" on public.reviews;
--> statement-breakpoint
create policy "public read approved" on public.reviews
for select to anon using (status = 'approved');
--> statement-breakpoint
create policy "authenticated read reviews" on public.reviews
for select to authenticated using (
  status = 'approved' or public.has_role(auth.uid(), 'admin'::public.app_role)
);
--> statement-breakpoint
insert into public.user_roles (user_id, role)
select id, 'user'::public.app_role
from auth.users
on conflict (user_id, role) do nothing;
--> statement-breakpoint
insert into public.profiles (user_id, email)
select id, coalesce(email, '')
from auth.users
on conflict (user_id) do update set email = excluded.email;
--> statement-breakpoint
create or replace function public.assign_default_user_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role)
  values (new.id, 'user'::public.app_role)
  on conflict (user_id, role) do nothing;
  insert into public.profiles (user_id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (user_id) do update set email = excluded.email;
  return new;
end;
$$;
--> statement-breakpoint
drop trigger if exists assign_default_user_role on auth.users;
--> statement-breakpoint
create trigger assign_default_user_role
after insert on auth.users
for each row execute function public.assign_default_user_role();
--> statement-breakpoint
create or replace function public.prevent_last_admin_removal()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  removing_admin boolean;
begin
  if tg_op = 'DELETE' then
    removing_admin := old.role = 'admin'::public.app_role;
  else
    removing_admin := old.role = 'admin'::public.app_role and new.role <> 'admin'::public.app_role;
  end if;

  if removing_admin and not exists (
    select 1 from public.user_roles
    where role = 'admin'::public.app_role and user_id <> old.user_id
  ) then
    raise exception 'Cannot remove the last administrator';
  end if;

  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
--> statement-breakpoint
revoke execute on function public.prevent_last_admin_removal() from public, anon, authenticated;
--> statement-breakpoint
drop trigger if exists prevent_last_admin_removal on public.user_roles;
--> statement-breakpoint
create trigger prevent_last_admin_removal
before delete or update on public.user_roles
for each row execute function public.prevent_last_admin_removal();
--> statement-breakpoint
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
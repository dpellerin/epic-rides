create extension if not exists "pgcrypto";

create type ride_status as enum ('draft', 'published');
create type photo_display_size as enum ('standard', 'wide', 'hero', 'feature');
create type photo_text_placement as enum ('caption', 'side-note', 'story-block', 'none');

create table public.rides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  status ride_status not null default 'draft',
  summary text not null default '',
  intro_title text not null default '',
  intro_text text not null default '',
  story text not null default '',
  region text,
  miles integer,
  days integer,
  start_date date,
  end_date date,
  bike text,
  tags text[] not null default '{}',
  cover_photo_id uuid,
  route_title text,
  route_image_url text,
  route_caption text,
  route_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.ride_photos (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  image_url text not null,
  caption text,
  story_text text,
  alt_text text,
  display_size photo_display_size not null default 'standard',
  text_placement photo_text_placement not null default 'caption',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.rides
  add constraint rides_cover_photo_id_fkey
  foreign key (cover_photo_id)
  references public.ride_photos(id)
  on delete set null
  deferrable initially deferred;

create index ride_photos_ride_id_sort_order_idx
  on public.ride_photos (ride_id, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger rides_set_updated_at
before update on public.rides
for each row execute function public.set_updated_at();

create trigger ride_photos_set_updated_at
before update on public.ride_photos
for each row execute function public.set_updated_at();

alter table public.rides enable row level security;
alter table public.ride_photos enable row level security;

create policy "Published rides are publicly readable"
on public.rides
for select
using (status = 'published');

create policy "Published ride photos are publicly readable"
on public.ride_photos
for select
using (
  exists (
    select 1
    from public.rides
    where rides.id = ride_photos.ride_id
      and rides.status = 'published'
  )
);

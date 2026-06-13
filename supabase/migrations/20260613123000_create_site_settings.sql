create table public.site_settings (
  id boolean primary key default true,
  site_title text not null default 'Epic Rides',
  tagline text not null default 'Road stories from the miles that stay with you.',
  hero_photo_id uuid references public.ride_photos(id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id)
);

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

create policy "Homepage settings are publicly readable"
on public.site_settings
for select
using (true);

grant select on public.site_settings to anon, authenticated;
grant all privileges on public.site_settings to service_role;

insert into public.site_settings (id, site_title, tagline)
values (
  true,
  'Epic Rides',
  'Road stories from the miles that stay with you.'
)
on conflict (id) do nothing;

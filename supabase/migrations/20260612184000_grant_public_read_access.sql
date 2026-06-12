grant usage on schema public to anon, authenticated, service_role;

grant select on public.rides to anon, authenticated;
grant select on public.ride_photos to anon, authenticated;

grant all privileges on public.rides to service_role;
grant all privileges on public.ride_photos to service_role;

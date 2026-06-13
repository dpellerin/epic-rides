insert into public.rides (
  id,
  title,
  slug,
  status,
  summary,
  intro_title,
  intro_text,
  story,
  region,
  miles,
  days,
  start_date,
  end_date,
  bike,
  tags,
  route_title,
  route_image_url,
  route_caption,
  route_notes,
  created_at,
  published_at
) values (
  '00000000-0000-4000-8000-000000000001',
  'Cascade Loop',
  'cascade-loop',
  'published',
  'A long golden-hour loop through mountain passes, lake stops, forest roads, and the quiet pullouts that make a ride feel bigger than the map.',
  'A route that changes its mood every thirty miles.',
  'This prototype ride is built to exercise the layout: a wide hero, a static route panel, editorial photo pacing, and photo-specific notes that can sit beside the images instead of disappearing into a generic gallery.',
  'The best rides have a rhythm. This one starts with open pavement and a horizon line, then tightens into forest curves before opening again near the lake.',
  'North Cascades',
  184,
  1,
  '2026-08-22',
  '2026-08-22',
  'Touring bike',
  array['mountains', 'forest', 'lake', 'golden hour'],
  'A mountain loop with forest curves and lakeside pullouts.',
  '/rides/cascade-loop/route.png',
  'Static route concept for the Cascade Loop.',
  'For the MVP, this is an uploaded image rather than an interactive map. It keeps the public page polished while leaving GPX and drawing tools for later.',
  '2026-06-01T09:00:00.000Z',
  now()
);

insert into public.ride_photos (
  id,
  ride_id,
  image_url,
  caption,
  story_text,
  alt_text,
  display_size,
  text_placement,
  sort_order
) values
(
  '00000000-0000-4000-8000-000000000101',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/hero.png',
  'The overlook where the route starts to feel wide open.',
  'This is the kind of image that should anchor a ride story: big sky, road line, and a sense that the next section could go anywhere.',
  'Motorcycle at a mountain overlook on a winding road at golden hour.',
  'hero',
  'side-note',
  1
),
(
  '00000000-0000-4000-8000-000000000102',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/lake-stop.png',
  'A quiet stop by the water before the road climbs again.',
  'Photo notes like this can be longer than a caption and still feel stylish when the layout gives them room.',
  'Loaded motorcycle parked near a mountain lake and pine trees.',
  'feature',
  'side-note',
  2
),
(
  '00000000-0000-4000-8000-000000000103',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/forest-road.png',
  'Forest shade, clean pavement, and a curve that keeps pulling you in.',
  'This wide shot shows how the page can change pace between big scenic moments and immersive road texture.',
  'Rider perspective on a winding forest road with sunlight through trees.',
  'wide',
  'story-block',
  3
),
(
  '00000000-0000-4000-8000-000000000104',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/hero.png',
  null,
  null,
  'Wide mountain road pullout during a motorcycle ride.',
  'wide',
  'none',
  4
),
(
  '00000000-0000-4000-8000-000000000105',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/lake-stop.png',
  null,
  null,
  'Motorcycle stopped near a mountain lake.',
  'standard',
  'none',
  5
),
(
  '00000000-0000-4000-8000-000000000106',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/forest-road.png',
  null,
  null,
  'Forest road curve seen from the rider perspective.',
  'feature',
  'none',
  6
),
(
  '00000000-0000-4000-8000-000000000107',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/lake-stop.png',
  null,
  null,
  'Loaded motorcycle parked at a scenic stop.',
  'standard',
  'none',
  7
),
(
  '00000000-0000-4000-8000-000000000108',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/hero.png',
  null,
  null,
  'Open road and mountain overlook on the Cascade Loop.',
  'hero',
  'none',
  8
),
(
  '00000000-0000-4000-8000-000000000109',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/forest-road.png',
  null,
  null,
  'Sunlit pavement winding through trees.',
  'standard',
  'none',
  9
),
(
  '00000000-0000-4000-8000-000000000110',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/lake-stop.png',
  null,
  null,
  'Quiet lakeside break during a long ride.',
  'wide',
  'none',
  10
),
(
  '00000000-0000-4000-8000-000000000111',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/hero.png',
  null,
  null,
  'Motorcycle at a high overlook with a road beyond it.',
  'standard',
  'none',
  11
),
(
  '00000000-0000-4000-8000-000000000112',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/forest-road.png',
  null,
  null,
  'Tree-lined road section with filtered sunlight.',
  'feature',
  'none',
  12
),
(
  '00000000-0000-4000-8000-000000000113',
  '00000000-0000-4000-8000-000000000001',
  '/rides/cascade-loop/lake-stop.png',
  null,
  null,
  'Motorcycle luggage and lake view during a route stop.',
  'standard',
  'none',
  13
);

insert into public.rides (
  id,
  title,
  slug,
  status,
  summary,
  intro_title,
  intro_text,
  story,
  region,
  miles,
  days,
  start_date,
  end_date,
  bike,
  tags,
  route_title,
  route_image_url,
  route_caption,
  route_notes,
  created_at,
  published_at
) values
(
  '00000000-0000-4000-8000-000000000002',
  'Coastal Range Run',
  'coastal-range-run',
  'published',
  'A fast-changing coastal ride with foggy ridgelines, open sweepers, roadside espresso, and a final descent toward salt air.',
  'Fog, forest, and the road back to the water.',
  'This sample ride gives the archive another kind of story: shorter, moodier, and more coastal than the Cascade Loop.',
  'The route starts inland where the air is still warm, then climbs into a cooler band of trees and low cloud.

By the time the road begins to fall toward the coast, the whole ride has changed character. The pavement gets faster, the light gets softer, and every stop feels like it belongs to a different hour of the day.',
  'Northern Coast Range',
  126,
  1,
  '2026-04-18',
  '2026-04-18',
  'Sport tourer',
  array['coast', 'forest', 'fog', 'sweepers'],
  'A ridge-to-coast route built around curves and changing weather.',
  '/rides/cascade-loop/route.png',
  'Static route concept for the Coastal Range Run.',
  'A compact day ride with enough contrast to make photo pacing feel important.',
  '2026-06-07T09:00:00.000Z',
  now()
),
(
  '00000000-0000-4000-8000-000000000003',
  'High Desert Overnighter',
  'high-desert-overnighter',
  'published',
  'Two days of long horizons, dry heat, lonely fuel stops, and a quiet overnight that makes the return leg feel earned.',
  'The kind of distance that changes how the road sounds.',
  'This ride tests longer-duration browsing, desert tags, and the way multi-day trips show up in the public archive.',
  'The first day is all space: straight sections, exposed hills, and enough distance between towns that every stop matters.

The second morning is softer. The road is the same, but the ride feels different after a night away from home. That is the shape this story should capture.',
  'High Desert',
  412,
  2,
  '2026-09-12',
  '2026-09-13',
  'Adventure bike',
  array['desert', 'overnight', 'solo', 'open road'],
  'A two-day out-and-back through open country and sparse services.',
  '/rides/cascade-loop/route.png',
  'Static route concept for the High Desert Overnighter.',
  'This is the ride that makes sorting by miles and days useful in the archive mockup.',
  '2026-06-10T09:00:00.000Z',
  now()
);

insert into public.ride_photos (
  id,
  ride_id,
  image_url,
  caption,
  story_text,
  alt_text,
  display_size,
  text_placement,
  sort_order
) values
(
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000002',
  '/rides/cascade-loop/lake-stop.png',
  'The stop where the road starts smelling like the coast.',
  'The best part of this kind of ride is the temperature shift as the road crosses from inland valleys toward ocean air.',
  'Motorcycle parked beside water and pine trees.',
  'hero',
  'side-note',
  1
),
(
  '00000000-0000-4000-8000-000000000202',
  '00000000-0000-4000-8000-000000000002',
  '/rides/cascade-loop/forest-road.png',
  'A shaded stretch before the ridge opens up.',
  'Tighter corners and filtered light make this section feel slower than the mileage suggests.',
  'Winding forest road with sunlight through trees.',
  'feature',
  'side-note',
  2
),
(
  '00000000-0000-4000-8000-000000000203',
  '00000000-0000-4000-8000-000000000002',
  '/rides/cascade-loop/hero.png',
  null,
  null,
  'Motorcycle at an overlook during a coastal ride.',
  'wide',
  'none',
  3
),
(
  '00000000-0000-4000-8000-000000000301',
  '00000000-0000-4000-8000-000000000003',
  '/rides/cascade-loop/forest-road.png',
  'A long section where the horizon keeps moving away.',
  'Multi-day rides need room for rhythm: first the push outward, then the quieter ride home.',
  'Rider perspective on a long road section.',
  'hero',
  'side-note',
  1
),
(
  '00000000-0000-4000-8000-000000000302',
  '00000000-0000-4000-8000-000000000003',
  '/rides/cascade-loop/hero.png',
  'The stop that turns a route into a trip.',
  'An overnight ride is partly about logistics, but the public page should still make it feel personal.',
  'Motorcycle at an open overlook with a distant road.',
  'feature',
  'story-block',
  2
),
(
  '00000000-0000-4000-8000-000000000303',
  '00000000-0000-4000-8000-000000000003',
  '/rides/cascade-loop/lake-stop.png',
  null,
  null,
  'Motorcycle stopped near water on a long route.',
  'standard',
  'none',
  3
);

update public.rides
set cover_photo_id = '00000000-0000-4000-8000-000000000101'
where id = '00000000-0000-4000-8000-000000000001';

update public.rides
set cover_photo_id = '00000000-0000-4000-8000-000000000201'
where id = '00000000-0000-4000-8000-000000000002';

update public.rides
set cover_photo_id = '00000000-0000-4000-8000-000000000301'
where id = '00000000-0000-4000-8000-000000000003';

update public.site_settings
set hero_photo_id = '00000000-0000-4000-8000-000000000301'
where id = true;

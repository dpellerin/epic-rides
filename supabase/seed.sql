insert into public.rides (
  id,
  title,
  slug,
  status,
  summary,
  intro_title,
  intro_text,
  story,
  trip_notes,
  region,
  start_location,
  end_location,
  ride_date,
  distance,
  duration,
  bike,
  tags,
  route_image_url,
  route_caption,
  route_notes,
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
  'Good weather, dry roads, and plenty of scenic stops. The route image is a placeholder for the first non-interactive map approach.',
  'North Cascades',
  'River Road',
  'Valley Overlook',
  'Late summer',
  '184 mi',
  '1 long day',
  'Touring bike',
  array['mountains', 'forest', 'lake', 'golden hour'],
  '/rides/cascade-loop/route.png',
  'Static route concept for the Cascade Loop.',
  'For the MVP, this is an uploaded image rather than an interactive map. It keeps the public page polished while leaving GPX and drawing tools for later.',
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
  sort_order,
  is_featured
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
  1,
  true
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
  2,
  false
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
  3,
  false
);

update public.rides
set cover_photo_id = '00000000-0000-4000-8000-000000000101'
where id = '00000000-0000-4000-8000-000000000001';

import { createServerSupabaseClient } from "@/lib/supabase";
import {
  rides as sampleRides,
  type PhotoDisplaySize,
  type PhotoTextPlacement,
  type Ride,
  type RidePhoto,
  type RideStatus,
} from "@/lib/rides";

type RidePhotoRow = {
  id: string;
  ride_id: string;
  image_url: string;
  caption: string | null;
  story_text: string | null;
  alt_text: string | null;
  display_size: PhotoDisplaySize;
  text_placement: PhotoTextPlacement;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type RideRow = {
  id: string;
  title: string;
  slug: string;
  status: RideStatus;
  summary: string | null;
  intro_title: string | null;
  intro_text: string | null;
  story: string | null;
  region: string | null;
  miles: number | null;
  days: number | null;
  start_date: string | null;
  end_date: string | null;
  bike: string | null;
  tags: string[] | null;
  cover_photo_id: string | null;
  route_title: string | null;
  route_image_url: string | null;
  route_caption: string | null;
  route_notes: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  ride_photos?: RidePhotoRow[] | null;
};

const rideSelect = `
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
  cover_photo_id,
  route_title,
  route_image_url,
  route_caption,
  route_notes,
  created_at,
  updated_at,
  published_at,
  ride_photos!ride_photos_ride_id_fkey (
    id,
    ride_id,
    image_url,
    caption,
    story_text,
    alt_text,
    display_size,
    text_placement,
    sort_order,
    created_at,
    updated_at
  )
`;

function toOptionalString(value: string | null) {
  return value ?? undefined;
}

function mapPhoto(row: RidePhotoRow): RidePhoto {
  return {
    id: row.id,
    rideId: row.ride_id,
    imageUrl: row.image_url,
    caption: toOptionalString(row.caption),
    storyText: toOptionalString(row.story_text),
    altText: toOptionalString(row.alt_text),
    displaySize: row.display_size,
    textPlacement: row.text_placement,
    sortOrder: row.sort_order,
  };
}

function mapRide(row: RideRow): Ride {
  const photos = [...(row.ride_photos ?? [])]
    .sort((firstPhoto, secondPhoto) => firstPhoto.sort_order - secondPhoto.sort_order)
    .map(mapPhoto);
  const coverPhoto =
    photos.find((photo) => photo.id === row.cover_photo_id) ?? photos[0];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    createdAt: row.created_at,
    summary: row.summary ?? "",
    introTitle: row.intro_title ?? "",
    introText: row.intro_text ?? "",
    story: row.story ?? "",
    region: toOptionalString(row.region),
    miles: row.miles ?? undefined,
    days: row.days ?? undefined,
    startDate: toOptionalString(row.start_date),
    endDate: toOptionalString(row.end_date),
    bike: toOptionalString(row.bike),
    tags: row.tags ?? [],
    coverPhotoId: row.cover_photo_id ?? undefined,
    coverImageUrl: coverPhoto?.imageUrl ?? "",
    routeTitle: toOptionalString(row.route_title),
    routeImageUrl: toOptionalString(row.route_image_url),
    routeCaption: toOptionalString(row.route_caption),
    routeNotes: toOptionalString(row.route_notes),
    photos,
  };
}

function getSamplePublishedRides() {
  return sampleRides.filter((ride) => ride.status === "published");
}

function warnAndUseSampleData(error: unknown) {
  console.warn("Using sample ride data because Supabase read failed.", error);
}

export async function getPublishedRides() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return getSamplePublishedRides();
  }

  const { data, error } = await supabase
    .from("rides")
    .select(rideSelect)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    warnAndUseSampleData(error);
    return getSamplePublishedRides();
  }

  return (data ?? []).map((ride) => mapRide(ride as RideRow));
}

export async function getPublishedRideBySlug(slug: string) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return getSamplePublishedRides().find((ride) => ride.slug === slug);
  }

  const { data, error } = await supabase
    .from("rides")
    .select(rideSelect)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    warnAndUseSampleData(error);
    return getSamplePublishedRides().find((ride) => ride.slug === slug);
  }

  return data ? mapRide(data as RideRow) : undefined;
}

export async function getPublishedRideSlugs() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return getSamplePublishedRides().map((ride) => ride.slug);
  }

  const { data, error } = await supabase
    .from("rides")
    .select("slug")
    .eq("status", "published");

  if (error) {
    warnAndUseSampleData(error);
    return getSamplePublishedRides().map((ride) => ride.slug);
  }

  return (data ?? []).map((ride) => ride.slug);
}

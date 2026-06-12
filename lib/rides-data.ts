import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase";
import type {
  PhotoDisplaySize,
  PhotoTextPlacement,
  Ride,
  RidePhoto,
  RideStatus,
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

export type RideEditorPayload = {
  title: string;
  status: RideStatus;
  summary: string;
  introTitle: string;
  introText: string;
  story: string;
  region?: string;
  miles?: number | null;
  days?: number | null;
  startDate?: string;
  endDate?: string;
  bike?: string;
  tags: string[];
  coverPhotoId?: string;
  routeTitle?: string;
  routeImageUrl?: string;
  routeCaption?: string;
  routeNotes?: string;
  photos: Array<{
    id: string;
    caption?: string;
    storyText?: string;
    altText?: string;
    displaySize: PhotoDisplaySize;
    textPlacement: PhotoTextPlacement;
    sortOrder: number;
  }>;
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

function toNullableString(value?: string) {
  const trimmedValue = value?.trim();

  return trimmedValue ? trimmedValue : null;
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

function getPublicSupabaseOrThrow() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return supabase;
}

function getAdminSupabaseOrThrow() {
  const supabase = createAdminSupabaseClient();

  if (!supabase) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return supabase;
}

function mapRideRows(data: unknown[] | null) {
  return (data ?? []).map((ride) => mapRide(ride as RideRow));
}

export async function getPublishedRides() {
  const { data, error } = await getPublicSupabaseOrThrow()
    .from("rides")
    .select(rideSelect)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Could not load published rides: ${error.message}`);
  }

  return mapRideRows(data);
}

export async function getPublishedRideBySlug(slug: string) {
  const { data, error } = await getPublicSupabaseOrThrow()
    .from("rides")
    .select(rideSelect)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load published ride '${slug}': ${error.message}`);
  }

  return data ? mapRide(data as RideRow) : undefined;
}

export async function getPublishedRideSlugs() {
  const { data, error } = await getPublicSupabaseOrThrow()
    .from("rides")
    .select("slug")
    .eq("status", "published");

  if (error) {
    throw new Error(`Could not load published ride slugs: ${error.message}`);
  }

  return (data ?? []).map((ride) => ride.slug as string);
}

export async function getAdminRides() {
  const { data, error } = await getAdminSupabaseOrThrow()
    .from("rides")
    .select(rideSelect)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Could not load admin rides: ${error.message}`);
  }

  return mapRideRows(data);
}

export async function getAdminRideBySlug(slug: string) {
  const { data, error } = await getAdminSupabaseOrThrow()
    .from("rides")
    .select(rideSelect)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load admin ride '${slug}': ${error.message}`);
  }

  return data ? mapRide(data as RideRow) : undefined;
}

export async function updateAdminRide(slug: string, payload: RideEditorPayload) {
  const supabase = getAdminSupabaseOrThrow();
  const publishedAt = payload.status === "published" ? new Date().toISOString() : null;

  const { data: rideData, error: rideError } = await supabase
    .from("rides")
    .update({
      title: payload.title.trim(),
      status: payload.status,
      summary: payload.summary.trim(),
      intro_title: payload.introTitle.trim(),
      intro_text: payload.introText.trim(),
      story: payload.story.trim(),
      region: toNullableString(payload.region),
      miles: payload.miles ?? null,
      days: payload.days ?? null,
      start_date: toNullableString(payload.startDate),
      end_date: toNullableString(payload.endDate),
      bike: toNullableString(payload.bike),
      tags: payload.tags,
      cover_photo_id: payload.coverPhotoId ?? null,
      route_title: toNullableString(payload.routeTitle),
      route_image_url: toNullableString(payload.routeImageUrl),
      route_caption: toNullableString(payload.routeCaption),
      route_notes: toNullableString(payload.routeNotes),
      published_at: publishedAt,
    })
    .eq("slug", slug)
    .select("id, slug")
    .single();

  if (rideError) {
    throw new Error(`Could not update ride '${slug}': ${rideError.message}`);
  }

  for (const photo of payload.photos) {
    const { error: photoError } = await supabase
      .from("ride_photos")
      .update({
        caption: toNullableString(photo.caption),
        story_text: toNullableString(photo.storyText),
        alt_text: toNullableString(photo.altText),
        display_size: photo.displaySize,
        text_placement: photo.textPlacement,
        sort_order: photo.sortOrder,
      })
      .eq("id", photo.id)
      .eq("ride_id", rideData.id);

    if (photoError) {
      throw new Error(`Could not update photo '${photo.id}': ${photoError.message}`);
    }
  }

  const updatedRide = await getAdminRideBySlug(rideData.slug);

  if (!updatedRide) {
    throw new Error(`Ride '${slug}' was updated but could not be reloaded.`);
  }

  return updatedRide;
}

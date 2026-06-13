import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase";

export type HomepageSettings = {
  siteTitle: string;
  tagline: string;
  heroPhotoId?: string;
};

type SiteSettingsRow = {
  site_title: string;
  tagline: string;
  hero_photo_id: string | null;
};

const defaultHomepageSettings: HomepageSettings = {
  siteTitle: "Epic Rides",
  tagline: "Road stories from the miles that stay with you.",
};

function mapSettings(row?: SiteSettingsRow | null): HomepageSettings {
  if (!row) {
    return defaultHomepageSettings;
  }

  return {
    siteTitle: row.site_title,
    tagline: row.tagline,
    heroPhotoId: row.hero_photo_id ?? undefined,
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

export async function getHomepageSettings() {
  const { data, error } = await getPublicSupabaseOrThrow()
    .from("site_settings")
    .select("site_title, tagline, hero_photo_id")
    .eq("id", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load homepage settings: ${error.message}`);
  }

  return mapSettings(data as SiteSettingsRow | null);
}

export async function getAdminHomepageSettings() {
  const { data, error } = await getAdminSupabaseOrThrow()
    .from("site_settings")
    .select("site_title, tagline, hero_photo_id")
    .eq("id", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load admin homepage settings: ${error.message}`);
  }

  return mapSettings(data as SiteSettingsRow | null);
}

export async function updateHomepageSettings(settings: HomepageSettings) {
  const { data, error } = await getAdminSupabaseOrThrow()
    .from("site_settings")
    .upsert({
      id: true,
      site_title: settings.siteTitle.trim() || defaultHomepageSettings.siteTitle,
      tagline: settings.tagline.trim() || defaultHomepageSettings.tagline,
      hero_photo_id: settings.heroPhotoId || null,
    })
    .select("site_title, tagline, hero_photo_id")
    .single();

  if (error) {
    throw new Error(`Could not update homepage settings: ${error.message}`);
  }

  return mapSettings(data as SiteSettingsRow);
}

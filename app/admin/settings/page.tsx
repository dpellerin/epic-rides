import { AdminSettingsEditor } from "@/components/AdminSettingsEditor";
import { requireAdminUser } from "@/lib/auth";
import { getAdminRides } from "@/lib/rides-data";
import { getAdminHomepageSettings } from "@/lib/settings-data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdminUser();
  const [rides, settings] = await Promise.all([
    getAdminRides(),
    getAdminHomepageSettings(),
  ]);

  return <AdminSettingsEditor rides={rides} initialSettings={settings} />;
}

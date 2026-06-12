import { AdminSettingsEditor } from "@/components/AdminSettingsEditor";
import { getAdminRides } from "@/lib/rides-data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const rides = await getAdminRides();

  return <AdminSettingsEditor rides={rides} />;
}

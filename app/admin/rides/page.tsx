import { AdminRidesList } from "@/components/AdminRidesList";
import { requireAdminUser } from "@/lib/auth";
import { getAdminRides } from "@/lib/rides-data";

export const dynamic = "force-dynamic";

export default async function AdminRidesPage() {
  await requireAdminUser();
  const rides = await getAdminRides();

  return <AdminRidesList rides={rides} />;
}

import { AdminRidesList } from "@/components/AdminRidesList";
import { getAdminRides } from "@/lib/rides-data";

export const dynamic = "force-dynamic";

export default async function AdminRidesPage() {
  const rides = await getAdminRides();

  return <AdminRidesList rides={rides} />;
}

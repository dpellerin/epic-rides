import { AdminRidesList } from "@/components/AdminRidesList";
import { rides } from "@/lib/rides";

export default function AdminRidesPage() {
  return <AdminRidesList rides={rides} />;
}

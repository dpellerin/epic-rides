import { AdminRideEditor } from "@/components/AdminRideEditor";
import { rides } from "@/lib/rides";

type AdminRideEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminRideEditPage({ params }: AdminRideEditPageProps) {
  const { id } = await params;
  const ride = rides.find((item) => item.slug === id) ?? rides[0];

  return <AdminRideEditor ride={ride} />;
}

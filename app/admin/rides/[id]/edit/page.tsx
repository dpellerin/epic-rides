import { AdminRideEditor } from "@/components/AdminRideEditor";
import { getAdminRideBySlug } from "@/lib/rides-data";
import { notFound } from "next/navigation";

type AdminRideEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminRideEditPage({ params }: AdminRideEditPageProps) {
  const { id } = await params;
  const ride = await getAdminRideBySlug(id);

  if (!ride) {
    notFound();
  }

  return <AdminRideEditor ride={ride} />;
}

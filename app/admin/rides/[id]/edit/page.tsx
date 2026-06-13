import { AdminRideEditor } from "@/components/AdminRideEditor";
import { requireAdminUser } from "@/lib/auth";
import { getAdminRideBySlug } from "@/lib/rides-data";
import { notFound } from "next/navigation";

type AdminRideEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminRideEditPage({ params }: AdminRideEditPageProps) {
  await requireAdminUser();
  const { id } = await params;
  const ride = await getAdminRideBySlug(id);

  if (!ride) {
    notFound();
  }

  return <AdminRideEditor ride={ride} />;
}

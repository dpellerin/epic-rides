import Link from "next/link";
import { requireAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  await requireAdminUser();

  return (
    <main className="admin-shell">
      <section className="admin-empty">
        <p className="eyebrow">Epic Rides Admin</p>
        <h1>Maintenance UI</h1>
        <p>The ride library and editor workspace are connected to Supabase.</p>
        <Link href="/admin/rides" className="admin-primary-link">
          Open rides
        </Link>
      </section>
    </main>
  );
}

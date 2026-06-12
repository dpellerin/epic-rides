import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main className="admin-shell">
      <section className="admin-empty">
        <p className="eyebrow">Epic Rides Admin</p>
        <h1>Maintenance UI</h1>
        <p>The ride library and editor workspace are ready as a mock-data prototype.</p>
        <Link href="/admin/rides" className="admin-primary-link">
          Open rides
        </Link>
      </section>
    </main>
  );
}

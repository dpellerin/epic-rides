import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main className="admin-shell">
      <section className="admin-empty">
        <p className="eyebrow">Epic Rides Admin</p>
        <h1>Maintenance UI</h1>
        <p>
          The first editable ride workspace is ready as a mock-data prototype.
        </p>
        <Link href="/admin/rides/cascade-loop/edit" className="admin-primary-link">
          Open ride editor
        </Link>
      </section>
    </main>
  );
}

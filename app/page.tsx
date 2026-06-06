import Link from "next/link";
import { rides } from "@/lib/rides";

export default function HomePage() {
  const featuredRide = rides[0];

  return (
    <main className="public-shell">
      <section className="home-hero">
        <img src={featuredRide.coverImageUrl} alt="" />
        <div className="home-hero__shade" />
        <nav className="public-nav public-nav--overlay" aria-label="Primary">
          <Link href="/" className="brand-mark">
            Epic Rides
          </Link>
          <div className="public-nav__links">
            <Link href="/rides/cascade-loop">Rides</Link>
            <Link href="/admin/rides/cascade-loop/edit">Admin</Link>
          </div>
        </nav>
        <div className="home-hero__content">
          <p className="eyebrow">Motorcycle roads worth remembering</p>
          <h1>Ride stories built from routes, photos, and the miles between.</h1>
          <p>
            A photo-forward journal for epic motorcycle trips, scenic passes,
            quiet stops, and road notes from the rides that stay with you.
          </p>
          <Link href={`/rides/${featuredRide.slug}`} className="story-link">
            Read the featured ride
          </Link>
        </div>
      </section>

      <section className="ride-index">
        <div className="section-kicker">Featured Ride</div>
        <Link href={`/rides/${featuredRide.slug}`} className="ride-card">
          <img src={featuredRide.coverImageUrl} alt="" />
          <div>
            <p>{featuredRide.region}</p>
            <h2>{featuredRide.title}</h2>
            <span>{featuredRide.summary}</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

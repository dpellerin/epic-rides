import Link from "next/link";
import { RideBrowser } from "@/components/RideBrowser";
import { rides } from "@/lib/rides";

export default function RidesPage() {
  const publishedRides = rides.filter((ride) => ride.status === "published");
  const featuredRide = publishedRides[0] ?? rides[0];

  return (
    <main className="public-shell">
      <section className="rides-page-hero">
        <nav className="public-nav" aria-label="Primary">
          <Link href="/" className="brand-mark">
            Epic Rides
          </Link>
          <div className="public-nav__links">
            <Link href="/">Home</Link>
            <Link href="/admin/rides">Admin</Link>
          </div>
        </nav>

        <div className="rides-page-hero__content">
          <div>
            <p className="eyebrow">Ride archive</p>
            <h1>Find the road story that fits the next mood.</h1>
          </div>
          <p>
            Browse memorable routes by place, miles, days, and the small details
            that make each ride worth saving.
          </p>
        </div>

        {featuredRide ? (
          <div className="rides-page-feature">
            <img src={featuredRide.coverImageUrl} alt="" />
            <div>
              <span>Featured</span>
              <strong>{featuredRide.title}</strong>
            </div>
          </div>
        ) : null}
      </section>

      <RideBrowser rides={publishedRides} />
    </main>
  );
}

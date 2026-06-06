import Link from "next/link";
import type { Ride } from "@/lib/rides";

type RideHeroProps = {
  ride: Ride;
};

export function RideHero({ ride }: RideHeroProps) {
  return (
    <section className="ride-hero">
      <img src={ride.coverImageUrl} alt="" />
      <div className="ride-hero__shade" />
      <nav className="public-nav public-nav--overlay" aria-label="Primary">
        <Link href="/" className="brand-mark">
          Epic Rides
        </Link>
        <div className="public-nav__links">
          <Link href="/">Home</Link>
          <Link href="/admin/rides/cascade-loop/edit">Admin</Link>
        </div>
      </nav>
      <div className="ride-hero__content">
        <p className="eyebrow">{ride.region}</p>
        <h1>{ride.title}</h1>
        <p>{ride.summary}</p>
        <div className="ride-hero__meta">
          <span>{ride.rideDate}</span>
          <span>{ride.distance}</span>
          <span>{ride.duration}</span>
        </div>
      </div>
    </section>
  );
}

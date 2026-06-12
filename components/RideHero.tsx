import Link from "next/link";
import {
  getRideDateLabel,
  getRideDaysLabel,
  getRideMilesLabel,
  type Ride,
} from "@/lib/rides";

type RideHeroProps = {
  ride: Ride;
};

export function RideHero({ ride }: RideHeroProps) {
  const dateLabel = getRideDateLabel(ride);
  const milesLabel = getRideMilesLabel(ride);
  const daysLabel = getRideDaysLabel(ride);

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
          <Link href="/rides">Rides</Link>
          <Link href="/admin/rides">Admin</Link>
        </div>
      </nav>
      <div className="ride-hero__content">
        <p className="eyebrow">{ride.region}</p>
        <h1>{ride.title}</h1>
        <p>{ride.summary}</p>
        <div className="ride-hero__meta">
          <span>{dateLabel}</span>
          <span>{milesLabel}</span>
          <span>{daysLabel}</span>
        </div>
      </div>
    </section>
  );
}

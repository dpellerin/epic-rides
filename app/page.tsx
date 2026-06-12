import Link from "next/link";
import {
  getHomepageFeaturedRide,
  getHomepageHeroPhoto,
  getPhotoImageUrl,
  homepageSettings,
} from "@/lib/homepage";

export default function HomePage() {
  const featuredRide = getHomepageFeaturedRide();
  const heroPhoto = getHomepageHeroPhoto(homepageSettings, featuredRide);
  const heroImageUrl = getPhotoImageUrl(heroPhoto, featuredRide);

  return (
    <main className="public-shell">
      <section className="home-hero">
        <img src={heroImageUrl} alt="" />
        <div className="home-hero__shade" />
        <nav className="public-nav public-nav--overlay" aria-label="Primary">
          <Link href="/" className="brand-mark">
            Epic Rides
          </Link>
          <div className="public-nav__links">
            <Link href="/rides">Rides</Link>
            <Link href="/admin/rides">Admin</Link>
          </div>
        </nav>
        <div className="home-hero__content">
          <p className="eyebrow">Motorcycle roads worth remembering</p>
          <h1>Road stories from the miles that stay with you.</h1>
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

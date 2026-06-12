"use client";

import { CalendarDays, FilePenLine, MapPin, Plus, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getRideDateLabel,
  getRideDaysLabel,
  getRideMilesLabel,
  type Ride,
} from "@/lib/rides";

type AdminRidesListProps = {
  rides: Ride[];
};

type AdminRideSort = "updated" | "title" | "status" | "region";

function rideMatchesQuery(ride: Ride, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    ride.title,
    ride.summary,
    ride.status,
    ride.region,
    ride.bike,
    ride.routeTitle,
    ...ride.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

function sortRides(rides: Ride[], sortKey: AdminRideSort) {
  return [...rides].sort((firstRide, secondRide) => {
    if (sortKey === "title") {
      return firstRide.title.localeCompare(secondRide.title);
    }

    if (sortKey === "status") {
      return firstRide.status.localeCompare(secondRide.status);
    }

    if (sortKey === "region") {
      return (firstRide.region ?? "").localeCompare(secondRide.region ?? "");
    }

    return (
      new Date(secondRide.createdAt).getTime() - new Date(firstRide.createdAt).getTime()
    );
  });
}

export function AdminRidesList({ rides }: AdminRidesListProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<AdminRideSort>("updated");
  const publishedCount = rides.filter((ride) => ride.status === "published").length;
  const draftCount = rides.filter((ride) => ride.status === "draft").length;

  const visibleRides = useMemo(
    () => sortRides(rides.filter((ride) => rideMatchesQuery(ride, query)), sortKey),
    [query, rides, sortKey],
  );

  return (
    <main className="admin-app">
      <header className="admin-sidebar">
        <a href="/" className="admin-brand">
          Epic Rides
        </a>
        <nav aria-label="Admin">
          <a className="is-active" href="/admin/rides">
            <MapPin size={18} />
            Rides
          </a>
          <a href="/admin/settings">
            <SlidersHorizontal size={18} />
            Settings
          </a>
        </nav>
      </header>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Ride library</p>
            <h1>Rides</h1>
          </div>
          <div className="admin-actions">
            <button type="button" className="primary-button">
              <Plus size={17} />
              New ride
            </button>
          </div>
        </header>

        <section className="admin-rides-shell">
          <div className="admin-rides-summary" aria-label="Ride totals">
            <div>
              <strong>{rides.length}</strong>
              <span>Total rides</span>
            </div>
            <div>
              <strong>{publishedCount}</strong>
              <span>Published</span>
            </div>
            <div>
              <strong>{draftCount}</strong>
              <span>Drafts</span>
            </div>
          </div>

          <div className="admin-rides-toolbar">
            <label className="admin-rides-search">
              <Search size={18} />
              <span>Search</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, region, tag, bike, or status"
              />
            </label>

            <label className="admin-rides-sort">
              <SlidersHorizontal size={18} />
              <span>Sort</span>
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as AdminRideSort)}
              >
                <option value="updated">Recently added</option>
                <option value="title">Title</option>
                <option value="status">Status</option>
                <option value="region">Region</option>
              </select>
            </label>
          </div>

          <div className="admin-rides-count" aria-live="polite">
            <strong>{visibleRides.length}</strong>
            <span>{visibleRides.length === 1 ? "ride" : "rides"} shown</span>
          </div>

          {visibleRides.length > 0 ? (
            <div className="admin-rides-list">
              {visibleRides.map((ride) => (
                <article className="admin-ride-row" key={ride.id}>
                  <img src={ride.coverImageUrl} alt="" />
                  <div className="admin-ride-row__main">
                    <div className="admin-ride-row__title">
                      <h2>{ride.title}</h2>
                      <span className={`status-badge status-badge--${ride.status}`}>
                        {ride.status}
                      </span>
                    </div>
                    <p>{ride.summary}</p>
                    <div className="admin-ride-row__meta">
                      <span>
                        <MapPin size={14} />
                        {ride.region || "Region"}
                      </span>
                      <span>
                        <CalendarDays size={14} />
                        {getRideDateLabel(ride)}
                      </span>
                      <span>{getRideMilesLabel(ride)}</span>
                      <span>{getRideDaysLabel(ride)}</span>
                      <span>{ride.photos.length} photos</span>
                    </div>
                    <div className="admin-ride-row__tags">
                      {ride.tags.slice(0, 5).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="admin-ride-row__actions">
                    <Link href={`/admin/rides/${ride.slug}/edit`} className="ghost-button">
                      <FilePenLine size={17} />
                      Edit
                    </Link>
                    <Link href={`/rides/${ride.slug}`} className="ghost-button">
                      Preview
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-rides-empty">
              <p className="section-kicker">No rides found</p>
              <h2>Try a different title, region, tag, bike, or status.</h2>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

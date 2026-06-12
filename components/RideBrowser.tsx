"use client";

import Link from "next/link";
import { ArrowDownUp, CalendarDays, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  getRideDateLabel,
  getRideDaysLabel,
  getRideMilesLabel,
  type Ride,
} from "@/lib/rides";

type SortKey = "newest" | "title" | "miles" | "days";

type RideBrowserProps = {
  rides: Ride[];
};

function getRideTime(ride: Ride) {
  const dateValue = ride.startDate ?? ride.endDate;

  return dateValue ? new Date(`${dateValue}T00:00:00`).getTime() : 0;
}

function rideMatchesQuery(ride: Ride, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    ride.title,
    ride.summary,
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

export function RideBrowser({ rides }: RideBrowserProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("newest");

  const visibleRides = useMemo(() => {
    return rides
      .filter((ride) => rideMatchesQuery(ride, query))
      .sort((firstRide, secondRide) => {
        if (sortKey === "title") {
          return firstRide.title.localeCompare(secondRide.title);
        }

        if (sortKey === "miles") {
          return (secondRide.miles ?? 0) - (firstRide.miles ?? 0);
        }

        if (sortKey === "days") {
          return (secondRide.days ?? 0) - (firstRide.days ?? 0);
        }

        return getRideTime(secondRide) - getRideTime(firstRide);
      });
  }, [query, rides, sortKey]);

  return (
    <section className="rides-browse" aria-label="Browse rides">
      <div className="rides-toolbar">
        <label className="rides-search">
          <Search size={18} />
          <span>Search rides</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by region, tag, road, or bike"
          />
        </label>

        <label className="rides-sort">
          <ArrowDownUp size={18} />
          <span>Sort</span>
          <select value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
            <option value="newest">Newest ride</option>
            <option value="title">Title</option>
            <option value="miles">Most miles</option>
            <option value="days">Most days</option>
          </select>
        </label>
      </div>

      <div className="rides-results-heading" aria-live="polite">
        <span>
          {visibleRides.length} {visibleRides.length === 1 ? "ride" : "rides"}
        </span>
        {query ? <strong>matching "{query}"</strong> : <strong>ready to explore</strong>}
      </div>

      {visibleRides.length > 0 ? (
        <div className="rides-grid">
          {visibleRides.map((ride, index) => {
            const dateLabel = getRideDateLabel(ride);
            const milesLabel = getRideMilesLabel(ride);
            const daysLabel = getRideDaysLabel(ride);

            return (
              <Link
                href={`/rides/${ride.slug}`}
                className={`ride-browse-card ${
                  index === 0 ? "ride-browse-card--featured" : ""
                }`}
                key={ride.id}
              >
                <div className="ride-browse-card__media">
                  <img src={ride.coverImageUrl} alt="" />
                  <div className="ride-browse-card__meta">
                    <span>{milesLabel}</span>
                    <span>{daysLabel}</span>
                  </div>
                </div>
                <div className="ride-browse-card__body">
                  <div className="ride-browse-card__location">
                    <MapPin size={15} />
                    <span>{ride.region}</span>
                  </div>
                  <h2>{ride.title}</h2>
                  <p>{ride.summary}</p>
                  <div className="ride-browse-card__date">
                    <CalendarDays size={15} />
                    <span>{dateLabel}</span>
                  </div>
                  <div className="ride-tags">
                    {ride.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rides-empty">
          <p className="section-kicker">No rides found</p>
          <h2>Try a different region, tag, or road note.</h2>
        </div>
      )}
    </section>
  );
}

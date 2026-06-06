import type { Ride } from "@/lib/rides";

type RouteOverviewProps = {
  ride: Ride;
};

export function RouteOverview({ ride }: RouteOverviewProps) {
  return (
    <section className="route-overview">
      <div className="route-overview__copy">
        <p className="section-kicker">Route</p>
        <h2>{ride.startLocation} to {ride.endLocation}</h2>
        <p>{ride.routeNotes}</p>
      </div>
      {ride.routeImageUrl ? (
        <figure className="route-map">
          <img src={ride.routeImageUrl} alt="" />
          <figcaption>{ride.routeCaption}</figcaption>
        </figure>
      ) : null}
    </section>
  );
}

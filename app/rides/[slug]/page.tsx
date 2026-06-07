import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { PhotoStory } from "@/components/PhotoStory";
import { RideHero } from "@/components/RideHero";
import { RouteOverview } from "@/components/RouteOverview";
import { getRideDateLabel, getRideDaysLabel, getRideMilesLabel, rides } from "@/lib/rides";

type RidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return rides.map((ride) => ({ slug: ride.slug }));
}

export default async function RidePage({ params }: RidePageProps) {
  const { slug } = await params;
  const ride = rides.find((item) => item.slug === slug);

  if (!ride) {
    notFound();
  }

  const milesLabel = getRideMilesLabel(ride);
  const daysLabel = getRideDaysLabel(ride);
  const dateLabel = getRideDateLabel(ride);

  return (
    <main className="public-shell">
      <RideHero ride={ride} />

      <section className="story-section story-section--intro">
        <div className="story-prose">
          <p className="section-kicker">The Ride</p>
          <h2>{ride.introTitle}</h2>
          <p>{ride.introText}</p>
        </div>
        <aside className="ride-stats" aria-label="Ride stats">
          <div>
            <span>Miles</span>
            <strong>{milesLabel}</strong>
          </div>
          <div>
            <span>Days</span>
            <strong>{daysLabel}</strong>
          </div>
          <div>
            <span>Date</span>
            <strong>{dateLabel}</strong>
          </div>
        </aside>
      </section>

      <RouteOverview ride={ride} />

      <PhotoStory photos={ride.photos} />

      <section className="story-section">
        <div className="story-prose story-prose--wide markdown-body">
          <p className="section-kicker">Road Notes</p>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {ride.story}
          </ReactMarkdown>
        </div>
      </section>
    </main>
  );
}

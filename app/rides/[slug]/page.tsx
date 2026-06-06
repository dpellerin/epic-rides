import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { PhotoStory } from "@/components/PhotoStory";
import { RideHero } from "@/components/RideHero";
import { RouteOverview } from "@/components/RouteOverview";
import { rides } from "@/lib/rides";

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
            <span>Distance</span>
            <strong>{ride.distance}</strong>
          </div>
          <div>
            <span>Duration</span>
            <strong>{ride.duration}</strong>
          </div>
          <div>
            <span>Bike</span>
            <strong>{ride.bike}</strong>
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

export type RideStatus = "draft" | "published";

export type PhotoDisplaySize = "standard" | "wide" | "hero" | "feature";

export type PhotoTextPlacement = "caption" | "side-note" | "story-block" | "none";

export type RidePhoto = {
  id: string;
  rideId: string;
  imageUrl: string;
  caption?: string;
  storyText?: string;
  altText?: string;
  displaySize: PhotoDisplaySize;
  textPlacement: PhotoTextPlacement;
  sortOrder: number;
  isFeatured?: boolean;
};

export type Ride = {
  id: string;
  title: string;
  slug: string;
  status: RideStatus;
  summary: string;
  introTitle: string;
  introText: string;
  story: string;
  region?: string;
  rideDate?: string;
  distance?: string;
  duration?: string;
  miles?: number;
  days?: number;
  startDate?: string;
  endDate?: string;
  bike?: string;
  tags: string[];
  coverPhotoId?: string;
  coverImageUrl: string;
  routeTitle?: string;
  routeImageUrl?: string;
  routeCaption?: string;
  routeNotes?: string;
  photos: RidePhoto[];
};

export function formatRideDateLabel(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getRideDateLabel(ride: Pick<Ride, "startDate" | "endDate" | "rideDate">) {
  if (!ride.startDate && !ride.endDate) {
    return ride.rideDate ?? "Date";
  }

  if (ride.startDate && ride.endDate && ride.startDate !== ride.endDate) {
    return `${formatRideDateLabel(ride.startDate)} to ${formatRideDateLabel(ride.endDate)}`;
  }

  return formatRideDateLabel(ride.startDate || ride.endDate || "");
}

export function getRideMilesLabel(ride: Pick<Ride, "miles" | "distance">) {
  return ride.miles ? `${ride.miles} mi` : ride.distance ?? "Miles";
}

export function getRideDaysLabel(ride: Pick<Ride, "days" | "duration">) {
  if (!ride.days) {
    return ride.duration ?? "Days";
  }

  return `${ride.days} ${ride.days === 1 ? "day" : "days"}`;
}

export const rides: Ride[] = [
  {
    id: "ride-cascade-loop",
    title: "Cascade Loop",
    slug: "cascade-loop",
    status: "published",
    summary:
      "A long golden-hour loop through mountain passes, lake stops, forest roads, and the quiet pullouts that make a ride feel bigger than the map.",
    introTitle: "A route that changes its mood every thirty miles.",
    introText:
      "This prototype ride is built to exercise the layout: a wide hero, a static route panel, editorial photo pacing, and photo-specific notes that can sit beside the images instead of disappearing into a generic gallery.",
    story: `The best rides have a rhythm. This one starts with open pavement and a horizon line, then tightens into forest curves before opening again near the lake.

The public page should make that rhythm visible. A route image gives visitors context, but the photos carry the feeling: the climb, the stop, the texture of the road, and the little details that explain why the trip stayed with you.

### What the first version should prove

- A ride can feel like a story, not a database record.
- Photos can have their own narrative weight.
- The admin editor can shape the public layout without becoming complicated.
- Static route images are enough for an early version.`,
    region: "North Cascades",
    rideDate: "Late summer",
    distance: "184 mi",
    duration: "1 long day",
    miles: 184,
    days: 1,
    startDate: "2026-08-22",
    endDate: "2026-08-22",
    bike: "Touring bike",
    tags: ["mountains", "forest", "lake", "golden hour"],
    coverPhotoId: "photo-hero",
    coverImageUrl: "/rides/cascade-loop/hero.png",
    routeTitle: "A mountain loop with forest curves and lakeside pullouts.",
    routeImageUrl: "/rides/cascade-loop/route.png",
    routeCaption: "Static route concept for the Cascade Loop.",
    routeNotes:
      "For the MVP, this is an uploaded image rather than an interactive map. It keeps the public page polished while leaving GPX and drawing tools for later.",
    photos: [
      {
        id: "photo-hero",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/hero.png",
        caption: "The overlook where the route starts to feel wide open.",
        storyText:
          "This is the kind of image that should anchor a ride story: big sky, road line, and a sense that the next section could go anywhere.",
        altText: "Motorcycle at a mountain overlook on a winding road at golden hour.",
        displaySize: "hero",
        textPlacement: "side-note",
        sortOrder: 1,
        isFeatured: true,
      },
      {
        id: "photo-lake",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        caption: "A quiet stop by the water before the road climbs again.",
        storyText:
          "Photo notes like this can be longer than a caption and still feel stylish when the layout gives them room.",
        altText: "Loaded motorcycle parked near a mountain lake and pine trees.",
        displaySize: "feature",
        textPlacement: "side-note",
        sortOrder: 2,
      },
      {
        id: "photo-forest",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        caption: "Forest shade, clean pavement, and a curve that keeps pulling you in.",
        storyText:
          "This wide shot shows how the page can change pace between big scenic moments and immersive road texture.",
        altText: "Rider perspective on a winding forest road with sunlight through trees.",
        displaySize: "wide",
        textPlacement: "story-block",
        sortOrder: 3,
      },
      {
        id: "photo-album-01",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/hero.png",
        altText: "Wide mountain road pullout during a motorcycle ride.",
        displaySize: "wide",
        textPlacement: "none",
        sortOrder: 4,
      },
      {
        id: "photo-album-02",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Motorcycle stopped near a mountain lake.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 5,
      },
      {
        id: "photo-album-03",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        altText: "Forest road curve seen from the rider perspective.",
        displaySize: "feature",
        textPlacement: "none",
        sortOrder: 6,
      },
      {
        id: "photo-album-04",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Loaded motorcycle parked at a scenic stop.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 7,
      },
      {
        id: "photo-album-05",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/hero.png",
        altText: "Open road and mountain overlook on the Cascade Loop.",
        displaySize: "hero",
        textPlacement: "none",
        sortOrder: 8,
      },
      {
        id: "photo-album-06",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        altText: "Sunlit pavement winding through trees.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 9,
      },
      {
        id: "photo-album-07",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Quiet lakeside break during a long ride.",
        displaySize: "wide",
        textPlacement: "none",
        sortOrder: 10,
      },
      {
        id: "photo-album-08",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/hero.png",
        altText: "Motorcycle at a high overlook with a road beyond it.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 11,
      },
      {
        id: "photo-album-09",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        altText: "Tree-lined road section with filtered sunlight.",
        displaySize: "feature",
        textPlacement: "none",
        sortOrder: 12,
      },
      {
        id: "photo-album-10",
        rideId: "ride-cascade-loop",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Motorcycle luggage and lake view during a route stop.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 13,
      },
    ],
  },
];

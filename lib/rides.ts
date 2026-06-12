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
};

export type Ride = {
  id: string;
  title: string;
  slug: string;
  status: RideStatus;
  createdAt: string;
  summary: string;
  introTitle: string;
  introText: string;
  story: string;
  region?: string;
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

export function getRideDateLabel(ride: Pick<Ride, "startDate" | "endDate">) {
  if (!ride.startDate && !ride.endDate) {
    return "Date";
  }

  if (ride.startDate && ride.endDate && ride.startDate !== ride.endDate) {
    return `${formatRideDateLabel(ride.startDate)} to ${formatRideDateLabel(ride.endDate)}`;
  }

  return formatRideDateLabel(ride.startDate || ride.endDate || "");
}

export function getRideMilesLabel(ride: Pick<Ride, "miles">) {
  return ride.miles ? `${ride.miles} mi` : "Miles";
}

export function getRideDaysLabel(ride: Pick<Ride, "days">) {
  if (!ride.days) {
    return "Days";
  }

  return `${ride.days} ${ride.days === 1 ? "day" : "days"}`;
}

export const rides: Ride[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    title: "Cascade Loop",
    slug: "cascade-loop",
    status: "published",
    createdAt: "2026-06-01T09:00:00.000Z",
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
    miles: 184,
    days: 1,
    startDate: "2026-08-22",
    endDate: "2026-08-22",
    bike: "Touring bike",
    tags: ["mountains", "forest", "lake", "golden hour"],
    coverPhotoId: "00000000-0000-4000-8000-000000000101",
    coverImageUrl: "/rides/cascade-loop/hero.png",
    routeTitle: "A mountain loop with forest curves and lakeside pullouts.",
    routeImageUrl: "/rides/cascade-loop/route.png",
    routeCaption: "Static route concept for the Cascade Loop.",
    routeNotes:
      "For the MVP, this is an uploaded image rather than an interactive map. It keeps the public page polished while leaving GPX and drawing tools for later.",
    photos: [
      {
        id: "00000000-0000-4000-8000-000000000101",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/hero.png",
        caption: "The overlook where the route starts to feel wide open.",
        storyText:
          "This is the kind of image that should anchor a ride story: big sky, road line, and a sense that the next section could go anywhere.",
        altText: "Motorcycle at a mountain overlook on a winding road at golden hour.",
        displaySize: "hero",
        textPlacement: "side-note",
        sortOrder: 1,
      },
      {
        id: "00000000-0000-4000-8000-000000000102",
        rideId: "00000000-0000-4000-8000-000000000001",
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
        id: "00000000-0000-4000-8000-000000000103",
        rideId: "00000000-0000-4000-8000-000000000001",
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
        id: "00000000-0000-4000-8000-000000000104",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/hero.png",
        altText: "Wide mountain road pullout during a motorcycle ride.",
        displaySize: "wide",
        textPlacement: "none",
        sortOrder: 4,
      },
      {
        id: "00000000-0000-4000-8000-000000000105",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Motorcycle stopped near a mountain lake.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 5,
      },
      {
        id: "00000000-0000-4000-8000-000000000106",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        altText: "Forest road curve seen from the rider perspective.",
        displaySize: "feature",
        textPlacement: "none",
        sortOrder: 6,
      },
      {
        id: "00000000-0000-4000-8000-000000000107",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Loaded motorcycle parked at a scenic stop.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 7,
      },
      {
        id: "00000000-0000-4000-8000-000000000108",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/hero.png",
        altText: "Open road and mountain overlook on the Cascade Loop.",
        displaySize: "hero",
        textPlacement: "none",
        sortOrder: 8,
      },
      {
        id: "00000000-0000-4000-8000-000000000109",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        altText: "Sunlit pavement winding through trees.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 9,
      },
      {
        id: "00000000-0000-4000-8000-000000000110",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Quiet lakeside break during a long ride.",
        displaySize: "wide",
        textPlacement: "none",
        sortOrder: 10,
      },
      {
        id: "00000000-0000-4000-8000-000000000111",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/hero.png",
        altText: "Motorcycle at a high overlook with a road beyond it.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 11,
      },
      {
        id: "00000000-0000-4000-8000-000000000112",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        altText: "Tree-lined road section with filtered sunlight.",
        displaySize: "feature",
        textPlacement: "none",
        sortOrder: 12,
      },
      {
        id: "00000000-0000-4000-8000-000000000113",
        rideId: "00000000-0000-4000-8000-000000000001",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Motorcycle luggage and lake view during a route stop.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 13,
      },
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    title: "Coastal Range Run",
    slug: "coastal-range-run",
    status: "published",
    createdAt: "2026-06-07T09:00:00.000Z",
    summary:
      "A fast-changing coastal ride with foggy ridgelines, open sweepers, roadside espresso, and a final descent toward salt air.",
    introTitle: "Fog, forest, and the road back to the water.",
    introText:
      "This sample ride gives the archive another kind of story: shorter, moodier, and more coastal than the Cascade Loop.",
    story: `The route starts inland where the air is still warm, then climbs into a cooler band of trees and low cloud.

By the time the road begins to fall toward the coast, the whole ride has changed character. The pavement gets faster, the light gets softer, and every stop feels like it belongs to a different hour of the day.`,
    region: "Northern Coast Range",
    miles: 126,
    days: 1,
    startDate: "2026-04-18",
    endDate: "2026-04-18",
    bike: "Sport tourer",
    tags: ["coast", "forest", "fog", "sweepers"],
    coverPhotoId: "00000000-0000-4000-8000-000000000201",
    coverImageUrl: "/rides/cascade-loop/lake-stop.png",
    routeTitle: "A ridge-to-coast route built around curves and changing weather.",
    routeImageUrl: "/rides/cascade-loop/route.png",
    routeCaption: "Static route concept for the Coastal Range Run.",
    routeNotes:
      "A compact day ride with enough contrast to make photo pacing feel important.",
    photos: [
      {
        id: "00000000-0000-4000-8000-000000000201",
        rideId: "00000000-0000-4000-8000-000000000002",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        caption: "The stop where the road starts smelling like the coast.",
        storyText:
          "The best part of this kind of ride is the temperature shift as the road crosses from inland valleys toward ocean air.",
        altText: "Motorcycle parked beside water and pine trees.",
        displaySize: "hero",
        textPlacement: "side-note",
        sortOrder: 1,
      },
      {
        id: "00000000-0000-4000-8000-000000000202",
        rideId: "00000000-0000-4000-8000-000000000002",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        caption: "A shaded stretch before the ridge opens up.",
        storyText:
          "Tighter corners and filtered light make this section feel slower than the mileage suggests.",
        altText: "Winding forest road with sunlight through trees.",
        displaySize: "feature",
        textPlacement: "side-note",
        sortOrder: 2,
      },
      {
        id: "00000000-0000-4000-8000-000000000203",
        rideId: "00000000-0000-4000-8000-000000000002",
        imageUrl: "/rides/cascade-loop/hero.png",
        altText: "Motorcycle at an overlook during a coastal ride.",
        displaySize: "wide",
        textPlacement: "none",
        sortOrder: 3,
      },
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    title: "High Desert Overnighter",
    slug: "high-desert-overnighter",
    status: "published",
    createdAt: "2026-06-10T09:00:00.000Z",
    summary:
      "Two days of long horizons, dry heat, lonely fuel stops, and a quiet overnight that makes the return leg feel earned.",
    introTitle: "The kind of distance that changes how the road sounds.",
    introText:
      "This ride tests longer-duration browsing, desert tags, and the way multi-day trips show up in the public archive.",
    story: `The first day is all space: straight sections, exposed hills, and enough distance between towns that every stop matters.

The second morning is softer. The road is the same, but the ride feels different after a night away from home. That is the shape this story should capture.`,
    region: "High Desert",
    miles: 412,
    days: 2,
    startDate: "2026-09-12",
    endDate: "2026-09-13",
    bike: "Adventure bike",
    tags: ["desert", "overnight", "solo", "open road"],
    coverPhotoId: "00000000-0000-4000-8000-000000000301",
    coverImageUrl: "/rides/cascade-loop/forest-road.png",
    routeTitle: "A two-day out-and-back through open country and sparse services.",
    routeImageUrl: "/rides/cascade-loop/route.png",
    routeCaption: "Static route concept for the High Desert Overnighter.",
    routeNotes:
      "This is the ride that makes sorting by miles and days useful in the archive mockup.",
    photos: [
      {
        id: "00000000-0000-4000-8000-000000000301",
        rideId: "00000000-0000-4000-8000-000000000003",
        imageUrl: "/rides/cascade-loop/forest-road.png",
        caption: "A long section where the horizon keeps moving away.",
        storyText:
          "Multi-day rides need room for rhythm: first the push outward, then the quieter ride home.",
        altText: "Rider perspective on a long road section.",
        displaySize: "hero",
        textPlacement: "side-note",
        sortOrder: 1,
      },
      {
        id: "00000000-0000-4000-8000-000000000302",
        rideId: "00000000-0000-4000-8000-000000000003",
        imageUrl: "/rides/cascade-loop/hero.png",
        caption: "The stop that turns a route into a trip.",
        storyText:
          "An overnight ride is partly about logistics, but the public page should still make it feel personal.",
        altText: "Motorcycle at an open overlook with a distant road.",
        displaySize: "feature",
        textPlacement: "story-block",
        sortOrder: 2,
      },
      {
        id: "00000000-0000-4000-8000-000000000303",
        rideId: "00000000-0000-4000-8000-000000000003",
        imageUrl: "/rides/cascade-loop/lake-stop.png",
        altText: "Motorcycle stopped near water on a long route.",
        displaySize: "standard",
        textPlacement: "none",
        sortOrder: 3,
      },
    ],
  },
];

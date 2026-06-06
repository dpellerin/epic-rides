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
  tripNotes?: string;
  region?: string;
  startLocation?: string;
  endLocation?: string;
  rideDate?: string;
  distance?: string;
  duration?: string;
  bike?: string;
  tags: string[];
  coverPhotoId?: string;
  coverImageUrl: string;
  routeImageUrl?: string;
  routeCaption?: string;
  routeNotes?: string;
  photos: RidePhoto[];
};

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
    tripNotes:
      "Good weather, dry roads, and plenty of scenic stops. The route image is a placeholder for the first non-interactive map approach.",
    region: "North Cascades",
    startLocation: "River Road",
    endLocation: "Valley Overlook",
    rideDate: "Late summer",
    distance: "184 mi",
    duration: "1 long day",
    bike: "Touring bike",
    tags: ["mountains", "forest", "lake", "golden hour"],
    coverPhotoId: "photo-hero",
    coverImageUrl: "/rides/cascade-loop/hero.png",
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
    ],
  },
];

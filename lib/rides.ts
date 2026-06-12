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

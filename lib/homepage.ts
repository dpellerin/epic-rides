import { rides, type Ride, type RidePhoto } from "@/lib/rides";

export type HomepageSettings = {
  heroPhotoId?: string;
};

export const homepageSettings: HomepageSettings = {
  heroPhotoId: "00000000-0000-4000-8000-000000000301",
};

export function getPublishedRides() {
  return rides.filter((ride) => ride.status === "published");
}

export function getMostRecentlyAddedRide(rideList: Ride[]) {
  return [...rideList].sort(
    (firstRide, secondRide) =>
      new Date(secondRide.createdAt).getTime() - new Date(firstRide.createdAt).getTime(),
  )[0];
}

export function getHomepageFeaturedRide(rideList = getPublishedRides()) {
  return getMostRecentlyAddedRide(rideList);
}

export function getAllRidePhotos(rideList = rides) {
  return rideList.flatMap((ride) => ride.photos);
}

export function getRidePhotoById(photoId?: string, rideList = rides) {
  if (!photoId) {
    return undefined;
  }

  return getAllRidePhotos(rideList).find((photo) => photo.id === photoId);
}

export function getRideCoverPhoto(ride: Ride) {
  return ride.photos.find((photo) => photo.id === ride.coverPhotoId) ?? ride.photos[0];
}

export function getHomepageHeroPhoto(settings: HomepageSettings, featuredRide: Ride) {
  return getRidePhotoById(settings.heroPhotoId) ?? getRideCoverPhoto(featuredRide);
}

export function getPhotoImageUrl(photo: RidePhoto | undefined, fallbackRide: Ride) {
  return photo?.imageUrl ?? fallbackRide.coverImageUrl;
}

import type { Ride, RidePhoto } from "@/lib/rides";
import type { HomepageSettings } from "@/lib/settings-data";

export function getMostRecentlyAddedRide(rideList: Ride[]) {
  return [...rideList].sort(
    (firstRide, secondRide) =>
      new Date(secondRide.createdAt).getTime() - new Date(firstRide.createdAt).getTime(),
  )[0];
}

export function getHomepageFeaturedRide(rideList: Ride[]) {
  return getMostRecentlyAddedRide(rideList);
}

export function getAllRidePhotos(rideList: Ride[]) {
  return rideList.flatMap((ride) => ride.photos);
}

export function getRidePhotoById(photoId: string | undefined, rideList: Ride[]) {
  if (!photoId) {
    return undefined;
  }

  return getAllRidePhotos(rideList).find((photo) => photo.id === photoId);
}

export function getRideCoverPhoto(ride: Ride) {
  return ride.photos.find((photo) => photo.id === ride.coverPhotoId) ?? ride.photos[0];
}

export function getHomepageHeroPhoto(
  settings: Pick<HomepageSettings, "heroPhotoId">,
  featuredRide: Ride,
  rideList: Ride[],
) {
  return getRidePhotoById(settings.heroPhotoId, rideList) ?? getRideCoverPhoto(featuredRide);
}

export function getPhotoImageUrl(photo: RidePhoto | undefined, fallbackRide: Ride) {
  return photo?.imageUrl ?? fallbackRide.coverImageUrl;
}

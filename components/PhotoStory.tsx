"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { RidePhoto } from "@/lib/rides";

type PhotoStoryProps = {
  photos: RidePhoto[];
};

export function PhotoStory({ photos }: PhotoStoryProps) {
  const sortedPhotos = useMemo(
    () => [...photos].sort((a, b) => a.sortOrder - b.sortOrder),
    [photos],
  );
  const storyPhotos = useMemo(
    () =>
      sortedPhotos.filter(
        (photo) => photo.caption || photo.storyText || photo.textPlacement !== "none",
      ),
    [sortedPhotos],
  );
  const albumPhotos = useMemo(
    () =>
      sortedPhotos.filter(
        (photo) => !photo.caption && !photo.storyText && photo.textPlacement === "none",
      ),
    [sortedPhotos],
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : sortedPhotos[activeIndex];

  function openPhoto(photoId: string) {
    const nextIndex = sortedPhotos.findIndex((photo) => photo.id === photoId);

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  }

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? sortedPhotos.length - 1 : current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === sortedPhotos.length - 1 ? 0 : current + 1;
    });
  }

  return (
    <section className="photo-story">
      <div className="photo-story__heading">
        <p className="section-kicker">Photo Story</p>
        <h2>Images with their own piece of the ride.</h2>
      </div>

      {storyPhotos.length > 0 ? (
        <div className="photo-story__grid">
          {storyPhotos.map((photo) => {
            const hasPhotoText = Boolean(photo.caption || photo.storyText);

            return (
              <article
                className={`photo-card photo-card--${photo.displaySize} photo-card--text-${photo.textPlacement}`}
                key={photo.id}
              >
                <button
                  type="button"
                  className="photo-card__image"
                  onClick={() => openPhoto(photo.id)}
                  aria-label={`Open ${photo.caption ?? "ride photo"} full screen`}
                >
                  <img src={photo.imageUrl} alt={photo.altText ?? ""} />
                  <span>
                    <Maximize2 size={16} />
                    View
                  </span>
                </button>

                {hasPhotoText ? (
                  <div className="photo-card__text">
                    {photo.caption ? <h3>{photo.caption}</h3> : null}
                    {photo.storyText ? <p>{photo.storyText}</p> : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : null}

      {albumPhotos.length > 0 ? (
        <div className="photo-album" aria-label="Ride album">
          {albumPhotos.map((photo, index) => (
            <article
              className={`photo-album__tile photo-album__tile--${photo.displaySize} photo-album__tile--pattern-${
                (index % 10) + 1
              }`}
              key={photo.id}
            >
              <button
                type="button"
                onClick={() => openPhoto(photo.id)}
                aria-label={`Open ride photo ${
                  sortedPhotos.findIndex((item) => item.id === photo.id) + 1
                } full screen`}
              >
                <img src={photo.imageUrl} alt={photo.altText ?? ""} />
                <span>
                  <Maximize2 size={16} />
                  View
                </span>
              </button>
            </article>
          ))}
        </div>
      ) : null}

      {activePhoto ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button
            type="button"
            className="lightbox__close"
            onClick={() => setActiveIndex(null)}
            aria-label="Close photo viewer"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--previous"
            onClick={showPrevious}
            aria-label="Previous photo"
          >
            <ChevronLeft size={30} />
          </button>
          <figure>
            <img src={activePhoto.imageUrl} alt={activePhoto.altText ?? ""} />
            <figcaption>
              <span>
                Photo {(activeIndex ?? 0) + 1} of {sortedPhotos.length}
              </span>
              {activePhoto.caption ? <strong>{activePhoto.caption}</strong> : null}
              {activePhoto.storyText ? <p>{activePhoto.storyText}</p> : null}
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={showNext}
            aria-label="Next photo"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      ) : null}
    </section>
  );
}

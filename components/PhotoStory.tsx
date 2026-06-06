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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : sortedPhotos[activeIndex];

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

      <div className="photo-story__grid">
        {sortedPhotos.map((photo, index) => (
          <article
            className={`photo-card photo-card--${photo.displaySize} photo-card--text-${photo.textPlacement}`}
            key={photo.id}
          >
            <button
              type="button"
              className="photo-card__image"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${photo.caption ?? "ride photo"} full screen`}
            >
              <img src={photo.imageUrl} alt={photo.altText ?? ""} />
              <span>
                <Maximize2 size={16} />
                View
              </span>
            </button>

            {photo.textPlacement !== "none" ? (
              <div className="photo-card__text">
                {photo.caption ? <h3>{photo.caption}</h3> : null}
                {photo.storyText ? <p>{photo.storyText}</p> : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>

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

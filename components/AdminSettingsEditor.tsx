"use client";

import { Eye, Route, Settings } from "lucide-react";
import { useMemo, useState } from "react";
import {
  getHomepageFeaturedRide,
  getHomepageHeroPhoto,
  getPhotoImageUrl,
  getRideCoverPhoto,
  homepageSettings,
} from "@/lib/homepage";
import { rides } from "@/lib/rides";

type PhotoOption = {
  id: string;
  imageUrl: string;
  rideTitle: string;
};

const photosPerPage = 3;

export function AdminSettingsEditor() {
  const publishedRides = rides.filter((ride) => ride.status === "published");
  const photoOptions = rides
    .map((ride) => {
      const coverPhoto = getRideCoverPhoto(ride);

      return {
        id: coverPhoto?.id ?? ride.coverPhotoId ?? ride.id,
        imageUrl: coverPhoto?.imageUrl ?? ride.coverImageUrl,
        rideTitle: ride.title,
      };
    })
    .filter((photo) => Boolean(photo.imageUrl));
  const initialHeroPhotoId = photoOptions.some(
    (photo) => photo.id === homepageSettings.heroPhotoId,
  )
    ? homepageSettings.heroPhotoId
    : photoOptions[0]?.id ?? "";
  const [photoPage, setPhotoPage] = useState(0);
  const photoPageCount = Math.max(1, Math.ceil(photoOptions.length / photosPerPage));
  const visiblePhotoOptions = photoOptions.slice(
    photoPage * photosPerPage,
    photoPage * photosPerPage + photosPerPage,
  );
  const firstVisiblePhotoNumber =
    photoOptions.length === 0 ? 0 : photoPage * photosPerPage + 1;
  const lastVisiblePhotoNumber = Math.min(
    photoOptions.length,
    photoPage * photosPerPage + visiblePhotoOptions.length,
  );
  const [settings, setSettings] = useState({
    siteTitle: "Epic Rides",
    tagline: "Road stories from the miles that stay with you.",
    heroPhotoId: initialHeroPhotoId,
  });
  const selectedHomepageSettings = {
    heroPhotoId: settings.heroPhotoId,
  };
  const featuredRide = getHomepageFeaturedRide(publishedRides);
  const heroPhoto = getHomepageHeroPhoto(selectedHomepageSettings, featuredRide);
  const heroImageUrl = getPhotoImageUrl(heroPhoto, featuredRide);
  const selectedPhoto = useMemo(
    () => photoOptions.find((photo) => photo.id === settings.heroPhotoId),
    [photoOptions, settings.heroPhotoId],
  );

  return (
    <main className="admin-app">
      <header className="admin-sidebar">
        <a href="/" className="admin-brand">
          Epic Rides
        </a>
        <nav aria-label="Admin">
          <a href="/admin/rides">
            <Route size={18} />
            Rides
          </a>
          <a className="is-active" href="/admin/settings">
            <Settings size={18} />
            Settings
          </a>
        </nav>
      </header>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Site settings</p>
            <h1>Homepage controls</h1>
          </div>
          <div className="admin-actions">
            <a href="/" className="ghost-button">
              <Eye size={17} />
              View homepage
            </a>
          </div>
        </header>

        <section className="admin-settings-editor">
          <div className="admin-settings-panel">
            <label>
              Site title
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    siteTitle: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Homepage tagline
              <textarea
                value={settings.tagline}
                rows={3}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    tagline: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Homepage hero photo
              <select
                value={settings.heroPhotoId}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    heroPhotoId: event.target.value,
                  }))
                }
              >
                {photoOptions.map((photo) => (
                  <option value={photo.id} key={photo.id}>
                    {photo.rideTitle}
                  </option>
                ))}
              </select>
            </label>

            <div className="settings-photo-picker__header">
              <span>Hero photos</span>
              <strong>
                {firstVisiblePhotoNumber}-{lastVisiblePhotoNumber} of {photoOptions.length}
              </strong>
            </div>
            <div className="settings-photo-picker" aria-label="Homepage hero photo choices">
              {visiblePhotoOptions.map((photo) => (
                <button
                  type="button"
                  className={photo.id === settings.heroPhotoId ? "is-selected" : ""}
                  aria-label={`Use ${photo.rideTitle} cover photo as homepage hero`}
                  key={photo.id}
                  onClick={() =>
                    setSettings((current) => ({
                      ...current,
                      heroPhotoId: photo.id,
                    }))
                  }
                >
                  <img src={photo.imageUrl} alt="" />
                </button>
              ))}
            </div>
            {photoPageCount > 1 ? (
              <div className="settings-photo-pager" aria-label="Hero photo pages">
                <button
                  type="button"
                  className="ghost-button"
                  disabled={photoPage === 0}
                  onClick={() => setPhotoPage((current) => Math.max(0, current - 1))}
                >
                  Previous
                </button>
                <span>
                  Page {photoPage + 1} of {photoPageCount}
                </span>
                <button
                  type="button"
                  className="ghost-button"
                  disabled={photoPage >= photoPageCount - 1}
                  onClick={() =>
                    setPhotoPage((current) => Math.min(photoPageCount - 1, current + 1))
                  }
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>

          <aside className="admin-settings-preview">
            <p className="section-kicker">Homepage preview</p>
            <figure className="settings-hero-preview">
              <img src={heroImageUrl} alt="" />
              <figcaption>
                <span>{selectedPhoto?.rideTitle ?? "Selected image"}</span>
                <strong>{settings.siteTitle || "Site title"}</strong>
                <p>{settings.tagline || "Homepage tagline"}</p>
              </figcaption>
            </figure>

            <div className="settings-featured-preview">
              <span>Automatic: most recently added ride</span>
              <h2>{featuredRide.title}</h2>
              <p>{featuredRide.summary}</p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

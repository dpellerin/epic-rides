"use client";

import {
  Eye,
  FileText,
  ImagePlus,
  Images,
  Map,
  PanelRight,
  Route,
  Save,
  Settings,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import type {
  PhotoDisplaySize,
  PhotoTextPlacement,
  Ride,
  RidePhoto,
} from "@/lib/rides";

type AdminRideEditorProps = {
  ride: Ride;
};

const displaySizes: PhotoDisplaySize[] = ["standard", "wide", "hero", "feature"];
const textPlacements: PhotoTextPlacement[] = ["caption", "side-note", "story-block", "none"];

export function AdminRideEditor({ ride }: AdminRideEditorProps) {
  const [activeTab, setActiveTab] = useState("photos");
  const [photos, setPhotos] = useState<RidePhoto[]>(
    [...ride.photos].sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [selectedPhotoId, setSelectedPhotoId] = useState(photos[0]?.id);
  const selectedPhoto = useMemo(
    () => photos.find((photo) => photo.id === selectedPhotoId) ?? photos[0],
    [photos, selectedPhotoId],
  );

  function updateSelectedPhoto(updates: Partial<RidePhoto>) {
    if (!selectedPhoto) {
      return;
    }

    setPhotos((currentPhotos) =>
      currentPhotos.map((photo) =>
        photo.id === selectedPhoto.id ? { ...photo, ...updates } : photo,
      ),
    );
  }

  return (
    <main className="admin-app">
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand">
          Epic Rides
        </a>
        <nav aria-label="Admin">
          <a className="is-active" href="/admin/rides/cascade-loop/edit">
            <Route size={18} />
            Rides
          </a>
          <a href="/admin">
            <Images size={18} />
            Media
          </a>
          <a href="/admin">
            <Settings size={18} />
            Settings
          </a>
        </nav>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Editing ride</p>
            <h1>{ride.title}</h1>
          </div>
          <div className="admin-actions">
            <a href={`/rides/${ride.slug}`} className="ghost-button">
              <Eye size={17} />
              Preview
            </a>
            <button type="button" className="ghost-button">
              <Save size={17} />
              Save draft
            </button>
            <button type="button" className="primary-button">
              Publish
            </button>
          </div>
        </header>

        <div className="editor-tabs" role="tablist" aria-label="Ride editor sections">
          {[
            ["story", FileText, "Story"],
            ["photos", Images, "Photos"],
            ["route", Map, "Route"],
            ["settings", Settings, "Settings"],
          ].map(([id, Icon, label]) => (
            <button
              key={id as string}
              type="button"
              className={activeTab === id ? "is-active" : ""}
              onClick={() => setActiveTab(id as string)}
            >
              <Icon size={17} />
              {label as string}
            </button>
          ))}
        </div>

        {activeTab === "photos" ? (
          <section className="photo-editor">
            <div className="photo-editor__main">
              <div className="upload-panel">
                <div>
                  <ImagePlus size={24} />
                  <strong>Drop ride photos here</strong>
                  <span>Upload support will connect to Supabase Storage later.</span>
                </div>
                <button type="button" className="ghost-button">
                  <Upload size={17} />
                  Add photos
                </button>
              </div>

              <div className="admin-photo-grid">
                {photos.map((photo) => (
                  <button
                    type="button"
                    key={photo.id}
                    className={photo.id === selectedPhoto?.id ? "is-selected" : ""}
                    onClick={() => setSelectedPhotoId(photo.id)}
                  >
                    <img src={photo.imageUrl} alt="" />
                    <span>{photo.displaySize}</span>
                  </button>
                ))}
              </div>

              <div className="public-preview-strip">
                <div className="preview-strip__header">
                  <PanelRight size={18} />
                  Public layout preview
                </div>
                <div className="preview-strip__layout">
                  {photos.map((photo) => (
                    <div className={`preview-photo preview-photo--${photo.displaySize}`} key={photo.id}>
                      <img src={photo.imageUrl} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedPhoto ? (
              <aside className="photo-settings">
                <p className="section-kicker">Selected photo</p>
                <img src={selectedPhoto.imageUrl} alt="" />

                <label>
                  Caption
                  <textarea
                    value={selectedPhoto.caption ?? ""}
                    onChange={(event) =>
                      updateSelectedPhoto({ caption: event.target.value })
                    }
                    rows={3}
                  />
                </label>

                <label>
                  Story note
                  <textarea
                    value={selectedPhoto.storyText ?? ""}
                    onChange={(event) =>
                      updateSelectedPhoto({ storyText: event.target.value })
                    }
                    rows={5}
                  />
                </label>

                <fieldset>
                  <legend>Display</legend>
                  <div className="segmented-control">
                    {displaySizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={selectedPhoto.displaySize === size ? "is-active" : ""}
                        onClick={() => updateSelectedPhoto({ displaySize: size })}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Placement</legend>
                  <div className="segmented-control segmented-control--stack">
                    {textPlacements.map((placement) => (
                      <button
                        type="button"
                        key={placement}
                        className={
                          selectedPhoto.textPlacement === placement ? "is-active" : ""
                        }
                        onClick={() => updateSelectedPhoto({ textPlacement: placement })}
                      >
                        {placement}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </aside>
            ) : null}
          </section>
        ) : (
          <section className="admin-placeholder">
            <p className="section-kicker">{activeTab}</p>
            <h2>{activeTab[0].toUpperCase() + activeTab.slice(1)} tools are scaffolded.</h2>
            <p>
              This first pass concentrates on the photo layout editor because it
              drives the public storytelling experience.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}

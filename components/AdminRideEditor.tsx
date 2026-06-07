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
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { useMemo, useState } from "react";
import type {
  PhotoDisplaySize,
  PhotoTextPlacement,
  Ride,
  RidePhoto,
} from "@/lib/rides";
import { getRideDateLabel, getRideDaysLabel, getRideMilesLabel } from "@/lib/rides";

type AdminRideEditorProps = {
  ride: Ride;
};

const displaySizes: PhotoDisplaySize[] = ["standard", "wide", "hero", "feature"];
const textPlacements: PhotoTextPlacement[] = ["caption", "side-note", "story-block", "none"];

function parseDateInput(dateValue: string) {
  if (!dateValue) {
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getPositiveDayCount(daysValue: string) {
  const dayCount = Number.parseInt(daysValue, 10);

  return Number.isFinite(dayCount) && dayCount >= 1 ? dayCount : null;
}

function getEndDateFromStartAndDays(startDate: string, dayCount: number) {
  const date = parseDateInput(startDate);

  if (!date) {
    return "";
  }

  date.setDate(date.getDate() + dayCount - 1);

  return formatDateInput(date);
}

function getInclusiveDayCount(startDate: string, endDate: string) {
  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);

  if (!start || !end) {
    return "";
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const dayCount = Math.round((end.getTime() - start.getTime()) / millisecondsPerDay) + 1;

  return `${Math.max(1, dayCount)}`;
}

export function AdminRideEditor({ ride }: AdminRideEditorProps) {
  const [activeTab, setActiveTab] = useState("photos");
  const [rideSettings, setRideSettings] = useState({
    title: ride.title,
    description: ride.summary,
    miles: ride.miles?.toString() ?? "",
    days: ride.days?.toString() ?? "",
    startDate: ride.startDate ?? "",
    endDate: ride.endDate ?? "",
  });
  const [rideStory, setRideStory] = useState({
    introTitle: ride.introTitle,
    introText: ride.introText,
    story: ride.story,
  });
  const [photos, setPhotos] = useState<RidePhoto[]>(
    [...ride.photos].sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [selectedPhotoId, setSelectedPhotoId] = useState(photos[0]?.id);
  const selectedPhoto = useMemo(
    () => photos.find((photo) => photo.id === selectedPhotoId) ?? photos[0],
    [photos, selectedPhotoId],
  );
  const storyPhotos = useMemo(
    () =>
      photos.filter(
        (photo) => photo.caption || photo.storyText || photo.textPlacement !== "none",
      ),
    [photos],
  );
  const albumPhotos = useMemo(
    () =>
      photos.filter(
        (photo) => !photo.caption && !photo.storyText && photo.textPlacement === "none",
      ),
    [photos],
  );
  const settingsPreviewRide = {
    miles: Number(rideSettings.miles) || undefined,
    distance: undefined,
    days: Number(rideSettings.days) || undefined,
    duration: undefined,
    startDate: rideSettings.startDate,
    endDate: rideSettings.endDate,
    rideDate: undefined,
  };
  const milesLabel = getRideMilesLabel(settingsPreviewRide);
  const daysLabel = getRideDaysLabel(settingsPreviewRide);
  const dateLabel = getRideDateLabel(settingsPreviewRide);

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

  function updateDays(daysValue: string) {
    const dayCount = getPositiveDayCount(daysValue);
    const normalizedDayCount = daysValue === "" ? null : dayCount ?? 1;
    const normalizedDays = daysValue === "" ? "" : `${dayCount ?? 1}`;

    setRideSettings((current) => ({
      ...current,
      days: normalizedDays,
      endDate:
        current.startDate && normalizedDayCount
          ? getEndDateFromStartAndDays(current.startDate, normalizedDayCount)
          : current.endDate,
    }));
  }

  function updateStartDate(startDate: string) {
    setRideSettings((current) => {
      const dayCount = getPositiveDayCount(current.days);
      let nextEndDate = current.endDate;

      if (startDate && dayCount) {
        nextEndDate = getEndDateFromStartAndDays(startDate, dayCount);
      } else if (startDate && current.endDate && current.endDate < startDate) {
        nextEndDate = startDate;
      }

      return {
        ...current,
        startDate,
        endDate: nextEndDate,
      };
    });
  }

  function updateEndDate(endDate: string) {
    setRideSettings((current) => {
      if (!current.startDate) {
        return {
          ...current,
          endDate,
        };
      }

      if (!endDate) {
        return {
          ...current,
          days: "",
          endDate: "",
        };
      }

      const nextEndDate = endDate < current.startDate ? current.startDate : endDate;

      return {
        ...current,
        days: getInclusiveDayCount(current.startDate, nextEndDate),
        endDate: nextEndDate,
      };
    });
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
            <h1>{rideSettings.title}</h1>
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

        {activeTab === "story" ? (
          <section className="story-editor">
            <div className="story-editor-panel">
              <label>
                Intro title
                <input
                  type="text"
                  value={rideStory.introTitle}
                  onChange={(event) =>
                    setRideStory((current) => ({
                      ...current,
                      introTitle: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Intro text
                <textarea
                  value={rideStory.introText}
                  onChange={(event) =>
                    setRideStory((current) => ({
                      ...current,
                      introText: event.target.value,
                    }))
                  }
                  rows={4}
                />
              </label>

              <label>
                Main story
                <textarea
                  value={rideStory.story}
                  onChange={(event) =>
                    setRideStory((current) => ({
                      ...current,
                      story: event.target.value,
                    }))
                  }
                  rows={16}
                />
              </label>
            </div>

            <aside className="story-editor-preview">
              <p className="section-kicker">Public story preview</p>
              <div className="story-preview-block">
                <span>The Ride</span>
                <h2>{rideStory.introTitle || "Intro title"}</h2>
                <p>{rideStory.introText || "Intro text"}</p>
              </div>
              <div className="story-preview-block story-preview-block--body">
                <span>Road Notes</span>
                <div className="markdown-body story-preview-markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                    {rideStory.story || "Main story"}
                  </ReactMarkdown>
                </div>
              </div>
            </aside>
          </section>
        ) : activeTab === "photos" ? (
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

                <div className="preview-summary">
                  <div>
                    <strong>{storyPhotos.length}</strong>
                    <span>Story photos</span>
                  </div>
                  <div>
                    <strong>{albumPhotos.length}</strong>
                    <span>Album photos</span>
                  </div>
                </div>

                <div className="preview-block">
                  <div className="preview-block__label">
                    <span>Story sequence</span>
                    <small>Captioned or noted photos</small>
                  </div>
                  <div className="preview-strip__layout">
                    {storyPhotos.map((photo) => (
                      <button
                        type="button"
                        className={`preview-photo preview-photo--${photo.displaySize} ${
                          photo.id === selectedPhoto?.id ? "is-selected" : ""
                        }`}
                        key={photo.id}
                        onClick={() => setSelectedPhotoId(photo.id)}
                      >
                        <img src={photo.imageUrl} alt="" />
                        <span>{photo.displaySize}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {albumPhotos.length > 0 ? (
                  <div className="preview-block">
                    <div className="preview-block__label">
                      <span>Album mosaic</span>
                      <small>Image-only photos</small>
                    </div>
                    <div className="preview-album">
                      {albumPhotos.map((photo, index) => (
                        <button
                          type="button"
                          className={`preview-album__tile preview-album__tile--pattern-${
                            (index % 10) + 1
                          } ${photo.id === selectedPhoto?.id ? "is-selected" : ""}`}
                          key={photo.id}
                          onClick={() => setSelectedPhotoId(photo.id)}
                        >
                          <img src={photo.imageUrl} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="preview-note">
                  <strong>{selectedPhoto?.textPlacement === "none" ? "Album" : "Story"}</strong>
                  <span>
                    {selectedPhoto?.textPlacement === "none"
                      ? "This selected photo is image-only and appears in the mosaic."
                      : "This selected photo appears in the story sequence."}
                  </span>
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
        ) : activeTab === "settings" ? (
          <section className="ride-settings-editor">
            <div className="ride-settings-panel">
              <label>
                Ride title
                <input
                  type="text"
                  value={rideSettings.title}
                  onChange={(event) =>
                    setRideSettings((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Ride description
                <textarea
                  value={rideSettings.description}
                  onChange={(event) =>
                    setRideSettings((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  rows={3}
                />
              </label>

              <div className="ride-settings-grid">
                <label>
                  Miles
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={rideSettings.miles}
                    onChange={(event) =>
                      setRideSettings((current) => ({
                        ...current,
                        miles: event.target.value,
                      }))
                    }
                  />
                </label>

                <label>
                  Days
                  <input
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={rideSettings.days}
                    onChange={(event) => updateDays(event.target.value)}
                  />
                </label>

                <label>
                  Start date
                  <input
                    type="date"
                    value={rideSettings.startDate}
                    onChange={(event) => updateStartDate(event.target.value)}
                  />
                </label>

                <label>
                  End date
                  <input
                    type="date"
                    min={rideSettings.startDate || undefined}
                    value={rideSettings.endDate}
                    onChange={(event) => updateEndDate(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <aside className="ride-settings-preview">
              <p className="section-kicker">Ride metadata</p>
              <h2>{rideSettings.title || "Untitled ride"}</h2>
              <p>{rideSettings.description || "Ride description"}</p>
              <div className="ride-settings-preview__stats">
                <div>
                  <span>Miles</span>
                  <strong>{milesLabel}</strong>
                </div>
                <div>
                  <span>Days</span>
                  <strong>{daysLabel}</strong>
                </div>
                <div>
                  <span>Date</span>
                  <strong>{dateLabel}</strong>
                </div>
              </div>
            </aside>
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

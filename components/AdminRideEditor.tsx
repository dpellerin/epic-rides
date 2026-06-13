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
import { useRouter } from "next/navigation";
import { AdminSignOutButton } from "@/components/AdminSignOutButton";
import type {
  PhotoDisplaySize,
  PhotoTextPlacement,
  Ride,
  RidePhoto,
  RideStatus,
} from "@/lib/rides";
import { getRideDateLabel, getRideDaysLabel, getRideMilesLabel } from "@/lib/rides";

type AdminRideEditorProps = {
  ride: Ride;
};

type PhotoStoryStyle = {
  id: string;
  label: string;
  description: string;
  displaySize: PhotoDisplaySize;
  textPlacement: PhotoTextPlacement;
  usesText: boolean;
};

const photoStoryStyles: PhotoStoryStyle[] = [
  {
    id: "album-mosaic",
    label: "Album mosaic",
    description: "Image-only photo in the album grid.",
    displaySize: "standard",
    textPlacement: "none",
    usesText: false,
  },
  {
    id: "hero-image",
    label: "Full-width image only",
    description: "Large story image with no caption or note.",
    displaySize: "hero",
    textPlacement: "caption",
    usesText: false,
  },
  {
    id: "inline-caption",
    label: "Inline image with caption",
    description: "Standard story image with short caption text.",
    displaySize: "standard",
    textPlacement: "caption",
    usesText: true,
  },
  {
    id: "wide-caption",
    label: "Wide image with caption",
    description: "Wide story image with short caption text.",
    displaySize: "wide",
    textPlacement: "caption",
    usesText: true,
  },
  {
    id: "feature-side-note",
    label: "Feature image with side note",
    description: "Prominent image paired with supporting note text.",
    displaySize: "feature",
    textPlacement: "side-note",
    usesText: true,
  },
  {
    id: "hero-side-note",
    label: "Section hero with side note",
    description: "Large anchor image paired with supporting note text.",
    displaySize: "hero",
    textPlacement: "side-note",
    usesText: true,
  },
  {
    id: "wide-story-block",
    label: "Wide image with story block",
    description: "Wide image followed by a more editorial text block.",
    displaySize: "wide",
    textPlacement: "story-block",
    usesText: true,
  },
];

function getPhotoStoryStyle(photo: RidePhoto) {
  if (photo.textPlacement === "none") {
    return photoStoryStyles[0];
  }

  if (!photo.caption && !photo.storyText && photo.displaySize === "hero") {
    return photoStoryStyles[1];
  }

  return (
    photoStoryStyles.find(
      (style) =>
        style.displaySize === photo.displaySize &&
        style.textPlacement === photo.textPlacement &&
        style.usesText,
    ) ?? photoStoryStyles[2]
  );
}

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

function getOptionalNumber(value: string) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : null;
}

export function AdminRideEditor({ ride }: AdminRideEditorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("story");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [rideSettings, setRideSettings] = useState({
    title: ride.title,
    status: ride.status,
    description: ride.summary,
    miles: ride.miles?.toString() ?? "",
    days: ride.days?.toString() ?? "",
    startDate: ride.startDate ?? "",
    endDate: ride.endDate ?? "",
    region: ride.region ?? "",
    bike: ride.bike ?? "",
    tags: ride.tags.join(", "),
    coverPhotoId: ride.coverPhotoId ?? ride.photos[0]?.id ?? "",
  });
  const [rideStory, setRideStory] = useState({
    introTitle: ride.introTitle,
    introText: ride.introText,
    story: ride.story,
  });
  const [rideRoute, setRideRoute] = useState({
    routeTitle: ride.routeTitle ?? "",
    routeNotes: ride.routeNotes ?? "",
    routeCaption: ride.routeCaption ?? "",
    routeImageUrl: ride.routeImageUrl ?? "",
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
    days: Number(rideSettings.days) || undefined,
    startDate: rideSettings.startDate,
    endDate: rideSettings.endDate,
  };
  const milesLabel = getRideMilesLabel(settingsPreviewRide);
  const daysLabel = getRideDaysLabel(settingsPreviewRide);
  const dateLabel = getRideDateLabel(settingsPreviewRide);
  const tagList = rideSettings.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const coverPhoto =
    photos.find((photo) => photo.id === rideSettings.coverPhotoId) ?? photos[0];
  const selectedPhotoIsCover = selectedPhoto?.id === rideSettings.coverPhotoId;
  const selectedPhotoStyle = selectedPhoto ? getPhotoStoryStyle(selectedPhoto) : undefined;

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

  function updateSelectedPhotoStyle(style: PhotoStoryStyle) {
    const updates: Partial<RidePhoto> = {
      displaySize: style.displaySize,
      textPlacement: style.textPlacement,
    };

    if (!style.usesText) {
      updates.caption = "";
      updates.storyText = "";
    }

    updateSelectedPhoto(updates);
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

  async function saveRide(status: RideStatus) {
    setIsSaving(true);
    setSaveError("");
    setSaveMessage("");

    const nextRideSettings = {
      ...rideSettings,
      status,
    };

    const payload = {
      title: nextRideSettings.title,
      status,
      summary: nextRideSettings.description,
      introTitle: rideStory.introTitle,
      introText: rideStory.introText,
      story: rideStory.story,
      region: nextRideSettings.region,
      miles: getOptionalNumber(nextRideSettings.miles),
      days: getOptionalNumber(nextRideSettings.days),
      startDate: nextRideSettings.startDate,
      endDate: nextRideSettings.endDate,
      bike: nextRideSettings.bike,
      tags: tagList,
      coverPhotoId: nextRideSettings.coverPhotoId,
      routeTitle: rideRoute.routeTitle,
      routeNotes: rideRoute.routeNotes,
      routeCaption: rideRoute.routeCaption,
      routeImageUrl: rideRoute.routeImageUrl,
      photos: photos.map((photo) => ({
        id: photo.id,
        caption: photo.caption ?? "",
        storyText: photo.storyText ?? "",
        altText: photo.altText ?? "",
        displaySize: photo.displaySize,
        textPlacement: photo.textPlacement,
        sortOrder: photo.sortOrder,
      })),
    };

    try {
      const response = await fetch(`/api/admin/rides/${ride.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Could not save ride.");
      }

      setRideSettings(nextRideSettings);
      setSaveMessage(status === "published" ? "Published to Supabase." : "Saved to Supabase.");
      router.refresh();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save ride.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="admin-app">
      <header className="admin-sidebar">
        <a href="/" className="admin-brand">
          Epic Rides
        </a>
        <nav aria-label="Admin">
          <a className="is-active" href="/admin/rides">
            <Route size={18} />
            Rides
          </a>
          <a href="/admin/settings">
            <Settings size={18} />
            Settings
          </a>
        </nav>
      </header>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Editing ride</p>
            <div className="admin-title-row">
              <h1>{rideSettings.title}</h1>
              <span className={`status-badge status-badge--${rideSettings.status}`}>
                {rideSettings.status}
              </span>
            </div>
          </div>
          <div className="admin-actions">
            <AdminSignOutButton />
            {saveMessage ? (
              <span className="admin-save-status" role="status">
                {saveMessage}
              </span>
            ) : null}
            {saveError ? (
              <span className="admin-save-status admin-save-status--error" role="alert">
                {saveError}
              </span>
            ) : null}
            <a href={`/rides/${ride.slug}`} className="ghost-button">
              <Eye size={17} />
              Preview
            </a>
            <button
              type="button"
              className="ghost-button"
              disabled={isSaving}
              onClick={() => saveRide("draft")}
            >
              <Save size={17} />
              {isSaving ? "Saving" : "Save draft"}
            </button>
            <button
              type="button"
              className="primary-button"
              disabled={isSaving}
              onClick={() => saveRide("published")}
            >
              {isSaving ? "Saving" : "Publish"}
            </button>
          </div>
        </header>

        <div className="editor-tabs" role="tablist" aria-label="Ride editor sections">
          {[
            ["story", FileText, "Story"],
            ["route", Map, "Route"],
            ["photos", Images, "Photos"],
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
                  <span>New uploads start in the album until they are placed in the story.</span>
                </div>
                <button type="button" className="ghost-button">
                  <Upload size={17} />
                  Add photos
                </button>
              </div>

              <div className="public-preview-strip">
                <div className="preview-strip__header">
                  <PanelRight size={18} />
                  Public layout
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

                {coverPhoto ? (
                  <div className="preview-block preview-block--cover">
                    <div className="preview-block__label">
                      <span>Cover photo</span>
                      <small>Main ride image</small>
                    </div>
                    <button
                      type="button"
                      className={`preview-cover-photo ${
                        coverPhoto.id === selectedPhoto?.id ? "is-selected" : ""
                      }`}
                      onClick={() => setSelectedPhotoId(coverPhoto.id)}
                    >
                      <img src={coverPhoto.imageUrl} alt="" />
                      <span>Cover</span>
                    </button>
                  </div>
                ) : null}

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
                        <span className="preview-photo__layout">
                          {getPhotoStoryStyle(photo).label}
                        </span>
                        {photo.id === rideSettings.coverPhotoId ? (
                          <span className="preview-photo__cover">Cover</span>
                        ) : null}
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
                  <strong>
                    {selectedPhotoStyle?.label ?? "Selected photo"}
                  </strong>
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
                <div className="photo-settings__image">
                  <img src={selectedPhoto.imageUrl} alt="" />
                  {selectedPhotoIsCover ? <span>Cover photo</span> : null}
                </div>

                <button
                  type="button"
                  className="ghost-button"
                  disabled={selectedPhotoIsCover}
                  onClick={() =>
                    setRideSettings((current) => ({
                      ...current,
                      coverPhotoId: selectedPhoto.id,
                    }))
                  }
                >
                  {selectedPhotoIsCover ? "Current cover" : "Set as cover"}
                </button>

                <label>
                  Alt text
                  <textarea
                    value={selectedPhoto.altText ?? ""}
                    onChange={(event) =>
                      updateSelectedPhoto({ altText: event.target.value })
                    }
                    rows={3}
                  />
                </label>

                <fieldset>
                  <legend>Story style</legend>
                  <div className="photo-style-list">
                    {photoStoryStyles.map((style) => (
                      <button
                        type="button"
                        key={style.id}
                        className={selectedPhotoStyle?.id === style.id ? "is-active" : ""}
                        onClick={() => updateSelectedPhotoStyle(style)}
                      >
                        <span>{style.label}</span>
                        <small>{style.description}</small>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {selectedPhotoStyle?.usesText ? (
                  <>
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
                  </>
                ) : (
                  <div className="photo-album-note">
                    This style is image-only. Choose a caption, side-note, or story-block
                    style to add text to this photo.
                  </div>
                )}
              </aside>
            ) : null}
          </section>
        ) : activeTab === "route" ? (
          <section className="route-editor">
            <div className="route-editor-panel">
              <label>
                Route title
                <input
                  type="text"
                  value={rideRoute.routeTitle}
                  onChange={(event) =>
                    setRideRoute((current) => ({
                      ...current,
                      routeTitle: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Route notes
                <textarea
                  value={rideRoute.routeNotes}
                  onChange={(event) =>
                    setRideRoute((current) => ({
                      ...current,
                      routeNotes: event.target.value,
                    }))
                  }
                  rows={5}
                />
              </label>

              <label>
                Route caption
                <input
                  type="text"
                  value={rideRoute.routeCaption}
                  onChange={(event) =>
                    setRideRoute((current) => ({
                      ...current,
                      routeCaption: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Route image URL
                <input
                  type="text"
                  value={rideRoute.routeImageUrl}
                  onChange={(event) =>
                    setRideRoute((current) => ({
                      ...current,
                      routeImageUrl: event.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <aside className="route-editor-preview">
              <p className="section-kicker">Public route preview</p>
              <div className="route-preview-copy">
                <h2>{rideRoute.routeTitle || "Route title"}</h2>
                <p>{rideRoute.routeNotes || "Route notes"}</p>
              </div>
              {rideRoute.routeImageUrl ? (
                <figure className="route-preview-map">
                  <img src={rideRoute.routeImageUrl} alt="" />
                  {rideRoute.routeCaption ? (
                    <figcaption>{rideRoute.routeCaption}</figcaption>
                  ) : null}
                </figure>
              ) : (
                <div className="route-preview-empty">Route image</div>
              )}
            </aside>
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
                  Region
                  <input
                    type="text"
                    value={rideSettings.region}
                    onChange={(event) =>
                      setRideSettings((current) => ({
                        ...current,
                        region: event.target.value,
                      }))
                    }
                  />
                </label>

                <label>
                  Bike
                  <input
                    type="text"
                    value={rideSettings.bike}
                    onChange={(event) =>
                      setRideSettings((current) => ({
                        ...current,
                        bike: event.target.value,
                      }))
                    }
                  />
                </label>

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

              <label>
                Tags
                <input
                  type="text"
                  value={rideSettings.tags}
                  onChange={(event) =>
                    setRideSettings((current) => ({
                      ...current,
                      tags: event.target.value,
                    }))
                  }
                  placeholder="mountains, forest, lake"
                />
              </label>
            </div>

            <aside className="ride-settings-preview">
              <p className="section-kicker">Ride metadata</p>
              <h2>{rideSettings.title || "Untitled ride"}</h2>
              <p>{rideSettings.description || "Ride description"}</p>
              <div className="ride-settings-preview__stats">
                <div>
                  <span>Status</span>
                  <strong>{rideSettings.status}</strong>
                </div>
                <div>
                  <span>Cover</span>
                  <strong>
                    {photos.find((photo) => photo.id === rideSettings.coverPhotoId)?.caption ??
                      "Selected photo"}
                  </strong>
                </div>
                <div>
                  <span>Region</span>
                  <strong>{rideSettings.region || "Region"}</strong>
                </div>
                <div>
                  <span>Bike</span>
                  <strong>{rideSettings.bike || "Bike"}</strong>
                </div>
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
              <div className="ride-settings-preview__tags">
                {tagList.length > 0 ? (
                  tagList.map((tag) => <span key={tag}>{tag}</span>)
                ) : (
                  <span>Tags</span>
                )}
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

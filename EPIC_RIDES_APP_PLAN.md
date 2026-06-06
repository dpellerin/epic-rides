# Epic Motorcycle Rides App Plan

## Vision

Create a stylish storytelling site for sharing memorable motorcycle rides, with a private authoring area for building each ride story. The public experience should feel more like a travel feature, photo essay, or adventure journal than a conventional productivity app.

The app should let visitors browse rides, open a ride, follow the route visually, view trip photos, and read narrative notes about the experience. The private area should make it easy to create and maintain those ride stories without needing to edit code.

## Core Audiences

### Public Visitors

People who want to explore the rides, enjoy the photos, read the story, and maybe get inspired to ride similar roads.

### Site Owner

The person creating and editing ride entries, uploading photos, writing trip notes, and defining or illustrating each route.

## Experience Principles

- The public site should feel cinematic, visual, and travel-oriented.
- Ride pages should prioritize imagery, pacing, route context, and story.
- The private area can feel more like an app, but should still be clean and enjoyable.
- Route presentation should start simple and avoid paid or complex map integrations until the product direction is clearer.
- Content creation should be practical: a ride can begin as a draft with only a title and a few notes, then become richer over time.

## Public Section

### Public Home Page

Purpose: introduce the collection and invite visitors into the rides.

Suggested elements:

- Large visual opening using a featured ride image.
- Short site intro, for example: "Epic motorcycle rides, road stories, route notes, and photos from the miles that stayed with me."
- Featured ride highlight.
- Ride list or grid with strong photo thumbnails.
- Simple filters, such as region, state, distance, season, or ride type.

### Ride Listing Page

Purpose: let visitors scan and choose rides.

Each ride card could show:

- Cover photo.
- Ride title.
- Location or region.
- Date or season.
- Distance, if available.
- Short summary.
- Tags like `mountains`, `coast`, `desert`, `twisties`, `overnight`, or `solo`.

### Ride Detail Page

Purpose: tell one ride as an engaging story.

Suggested sections:

- Hero image with ride title, location, and short summary.
- Route overview.
- Photo story section with different-sized images, editorial layouts, and optional text attached to specific photos.
- Narrative story section.
- Trip notes, such as weather, road conditions, favorite stops, food, lodging, and lessons learned.
- Optional ride stats, such as distance, duration, elevation, difficulty, or bike used.
- Related rides.

### Public Photo Story Experience

Photos should be a major part of the public ride experience, not just thumbnails at the bottom of a page. The ride detail page can use a hero-style photo layout with varied image sizes so the page feels like a travel story or magazine feature.

Suggested display patterns:

- Full-width hero photos for major moments.
- Mixed-size photo grids where one image is dominant and supporting images sit nearby.
- Alternating image and text sections for story pacing.
- Photo pairs or triptychs for related moments.
- Wide panoramic route or landscape photos.
- Small detail shots, such as signs, food stops, dashboards, bikes, or road texture.

Each photo should be clickable to open a full-screen viewing experience.

Full-screen photo viewer features:

- Large image display.
- Next and previous controls.
- Caption or story text.
- Photo count.
- Close control.
- Keyboard navigation later, if useful.

Photo-specific text should be supported. A photo might have a short caption, but it might also have a longer note that becomes part of the story. For example, a mountain overlook photo could display a small styled text block beside it explaining what made that stretch memorable.

Suggested photo text display styles:

- Small caption below the image.
- Side note next to a large image.
- Pull quote over or near the photo when readability is strong.
- Story block between photos.
- Location or moment label, such as "Beartooth Pass, late afternoon."

Recommended first version: build a reusable photo story component that supports image size, caption, longer photo note, and click-to-full-screen behavior.

### Public Route Presentation Options

The route does not need to be an interactive Google-style map at first. Good early options:

1. Static Map Image

   Use a manually created image or exported map screenshot. This is the simplest and most visually reliable approach.

   Pros:

   - Easy to implement.
   - No API keys or billing.
   - Can be styled like an editorial graphic.

   Cons:

   - Not editable inside the app unless image replacement is supported.
   - Less flexible if route details change.

2. Uploaded Route Illustration

   The private section lets the owner upload a route image, such as a screenshot, hand-drawn route, or stylized map.

   Pros:

   - Keeps the public design flexible.
   - Supports beautiful custom visuals.
   - Avoids map-provider dependency.

   Cons:

   - Route creation happens outside the app.

3. Simple SVG Route Over Background

   The app stores a lightweight SVG path over a background map image or region illustration.

   Pros:

   - More custom and ownable.
   - Could support route labels and simple animations.
   - Still avoids full map integration.

   Cons:

   - More implementation work.
   - Drawing/editing tools need careful design.

4. GPX File to Static Render

   The private section accepts a GPX file and renders a static route image.

   Pros:

   - Useful if rides are tracked with GPS.
   - More accurate than hand-drawn routes.
   - Future-friendly.

   Cons:

   - Requires rendering logic.
   - Still needs a map tile/background strategy if using geographic context.

Recommended first version: support an uploaded route image and optional route notes. This gets the storytelling site working quickly while keeping future map options open.

## Private Section

### Private Dashboard

Purpose: manage ride content.

Suggested features:

- List of rides.
- Draft/published status.
- Create new ride.
- Edit existing ride.
- Preview ride.
- Publish/unpublish controls.

### Ride Editor

Purpose: create the content for one ride.

Suggested fields:

- Title.
- Slug.
- Status: draft or published.
- Ride date or date range.
- Location or region.
- Short summary.
- Main story text.
- Trip notes.
- Distance.
- Duration.
- Bike used.
- Tags.
- Cover photo.
- Photo gallery.
- Photo story layout settings.
- Route image.
- Route notes.

### Photo Management

Purpose: upload, arrange, caption, and add story context to photos.

Suggested features:

- Upload multiple photos.
- Choose cover photo.
- Reorder gallery photos.
- Add captions.
- Add longer photo notes.
- Add alt text.
- Choose display size, such as standard, wide, hero, or feature.
- Choose whether photo text appears as a caption, side note, or story block.
- Mark featured photos.
- Preview how photos will appear on the public ride page.
- Remove photos from a ride.

### Text Editing

Purpose: make writing pleasant without overbuilding the editor.

Suggested options:

- Start with a simple textarea for the main story.
- Support Markdown for headings, links, lists, and emphasis.
- Later, add a richer block editor if needed.

Recommended first version: Markdown textarea with preview.

### Route Editing

Purpose: define how the route appears on the public ride page.

First-version features:

- Upload route image.
- Add route caption.
- Add route notes.
- Optionally add start and end labels.

Future features:

- Upload GPX file.
- Render static route preview.
- Draw simple route line over an image.
- Add labeled stops.
- Add route segments.

## Suggested Data Model

### Ride

- `id`
- `title`
- `slug`
- `status`
- `summary`
- `story`
- `trip_notes`
- `region`
- `start_location`
- `end_location`
- `ride_date`
- `distance`
- `duration`
- `bike`
- `cover_photo_id`
- `route_image_id`
- `route_caption`
- `route_notes`
- `tags`
- `created_at`
- `updated_at`
- `published_at`

### Photo

- `id`
- `ride_id`
- `file_url`
- `caption`
- `story_text`
- `alt_text`
- `display_size`
- `text_placement`
- `sort_order`
- `is_featured`
- `created_at`

### Optional Future Route Entities

If route features become more advanced:

- `RoutePoint`
- `RouteStop`
- `RouteSegment`
- `GpxFile`

## Visual Direction

The public section should feel immersive and editorial.

Possible style qualities:

- Large photography.
- Mixed-size image compositions that feel curated rather than uniform.
- Full-screen photo viewing for immersive browsing.
- Stylish photo text treatments, such as captions, side notes, and story callouts.
- Strong typography.
- Spacious ride detail pages.
- Subtle motion, such as image fades or route reveal animations.
- Warm, natural contrast rather than a generic dashboard palette.
- Page sections that feel like story chapters.

Avoid:

- Generic SaaS dashboard styling on public pages.
- Too many boxed cards on ride detail pages.
- Overly technical map UI unless the route feature becomes central.

The private section can be more utilitarian:

- Clear forms.
- Organized tabs or sections.
- Photo upload grid.
- Draft and publish controls.
- Preview button.

## Information Architecture

Suggested public routes:

- `/`
- `/rides`
- `/rides/:slug`
- `/tags/:tag`

Suggested private routes:

- `/admin`
- `/admin/rides`
- `/admin/rides/new`
- `/admin/rides/:id/edit`
- `/admin/media`

## MVP Scope

The first build should focus on making the core story loop real.

### Public MVP

- Public home page.
- Ride listing page.
- Ride detail page.
- Static route image display.
- Photo story section with mixed-size images.
- Click-to-full-screen photo viewer.
- Captions and longer text for individual photos.
- Markdown-rendered story text.

### Private MVP

- Login-protected admin area.
- Create, edit, delete rides.
- Draft and published status.
- Upload cover photo.
- Upload gallery photos.
- Add captions and story notes to photos.
- Set basic photo display size and placement.
- Upload route image.
- Markdown story editor.
- Preview ride before publishing.

## Future Enhancements

- GPX upload and route rendering.
- Simple route drawing tool.
- Animated route line on public ride pages.
- Timeline-style story sections.
- Favorite stops with photos.
- Gear notes.
- Bike profile pages.
- Ride difficulty ratings.
- Search.
- Public comments or guestbook.
- Newsletter or ride updates.
- Social sharing image generation.

## Technical Considerations

### Frontend

A modern web app framework would work well, especially one that supports both public pages and authenticated admin routes.

Good candidates:

- Next.js
- Remix
- SvelteKit

### Storage

The app needs storage for images and route files.

Good candidates:

- Supabase Storage
- Cloudflare R2
- AWS S3

### Database

Good candidates:

- Supabase Postgres
- Neon Postgres
- SQLite for a local-first early version

### Authentication

Since the private section is only for the site owner, keep authentication simple.

Good candidates:

- Supabase Auth
- Auth.js
- A single admin login if self-hosted

### Content Rendering

Markdown is a good first step for the story body because it is simple, portable, and easy to preview.

Potential libraries:

- `react-markdown`
- `remark-gfm`
- `rehype-sanitize`

## Recommended Implementation Direction

The first implementation should focus on the two strongest mockup directions:

- Public UI: an immersive editorial ride story page with a cinematic hero, route panel, mixed-size photo story layouts, and full-screen photo viewing.
- Maintenance UI: a practical creator interface for building rides, managing photos, adding photo-specific text, choosing layouts, and previewing the public story.

The app should be built mock-data-first. That means the first working version uses local sample ride data before database, authentication, and file upload are added. This keeps the early work focused on the product experience: how a ride story feels to read, and how comfortable it feels to create one.

### Recommended Stack

Recommended first stack:

- `Next.js` for the app framework.
- `React` for the UI.
- `TypeScript` for safer data modeling.
- `Tailwind CSS` for styling and responsive layout.
- `Radix UI` or a similar headless component library for accessible dialogs, tabs, menus, and form controls.
- `lucide-react` for admin icons.
- `react-markdown` for ride story rendering.
- `remark-gfm` for GitHub-flavored Markdown support.
- `rehype-sanitize` for safer Markdown output.
- `dnd-kit` for drag-and-drop photo ordering in the maintenance UI.
- `Supabase` for the eventual database, authentication, and image storage.

This stack supports both sides of the product cleanly: polished public pages and authenticated admin routes. It also avoids needing a large custom backend during the early version.

### Public UI Implementation Plan

The public ride page should be built from structured ride data.

Primary public components:

- `RideHero`: cinematic cover image, title, location, date, and short summary.
- `RouteOverview`: uploaded route image, route caption, and route notes.
- `PhotoStory`: ordered editorial photo layout driven by each photo's display settings.
- `PhotoLightbox`: full-screen photo viewer opened by clicking any photo.
- `MarkdownStory`: rendered main trip story.
- `TripNotes`: practical notes such as road conditions, weather, stops, lodging, distance, and bike.
- `RelatedRides`: optional links to other ride stories.

The `PhotoStory` component is the most important public UI mechanic. It should translate photo metadata into a curated visual rhythm instead of a uniform thumbnail grid.

Photo display sizes:

- `standard`: normal image within the story flow.
- `wide`: wider image that spans more of the content area.
- `hero`: full-bleed or near-full-bleed image used for major moments.
- `feature`: dominant image paired with supporting text or smaller images.

Photo text placements:

- `caption`: small text below the image.
- `side-note`: text beside the image.
- `story-block`: text displayed as a styled story section between images.
- `none`: image appears without visible text.

Clicking any public photo should open the full-screen viewer.

Full-screen viewer mechanics:

- Open from any photo in the story.
- Show the selected image large.
- Preserve the full photo set order.
- Provide previous and next controls.
- Show caption and longer photo story text when available.
- Show photo count.
- Provide an obvious close control.
- Add keyboard navigation later if useful.

### Maintenance UI Implementation Plan

The private editor should feel like a creator workspace. It can be more app-like than the public site, but it should still feel connected to travel photography and editorial composition.

Recommended admin sections:

- `Story`: title, slug, region, summary, main Markdown story, and trip notes.
- `Photos`: upload, reorder, caption, write photo notes, choose display size, choose text placement, and preview the layout.
- `Route`: upload static route image, add route caption, add route notes, and optional start/end labels.
- `Settings`: publish status, ride date, tags, distance, duration, bike, and SEO/share settings later.

The `Photos` tab should be the centerpiece of the maintenance UI.

Photo editor mechanics:

- Upload multiple photos.
- Show a sortable grid or layout preview.
- Select a photo to edit its details.
- Edit caption.
- Edit longer story note.
- Choose display size: standard, wide, hero, or feature.
- Choose text placement: caption, side note, story block, or none.
- Choose cover photo.
- Mark featured photos.
- Preview how the public page will render the photo sequence.

Recommended admin layout:

- Left navigation for major admin areas.
- Top bar with ride title, save status, preview button, and publish button.
- Main workspace with tabbed editing.
- Right-side selected-photo panel when editing photos.
- Public preview pane or preview route for checking the final story.

### First Data Shape

The first implementation can begin with TypeScript types backed by mock data. These types can later map directly to database tables.

```ts
type RideStatus = "draft" | "published";

type PhotoDisplaySize = "standard" | "wide" | "hero" | "feature";

type PhotoTextPlacement = "caption" | "side-note" | "story-block" | "none";

type Ride = {
  id: string;
  title: string;
  slug: string;
  status: RideStatus;
  summary: string;
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
  routeImageUrl?: string;
  routeCaption?: string;
  routeNotes?: string;
  photos: RidePhoto[];
};

type RidePhoto = {
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
```

### Mock-Data-First Mechanics

The first working version should not require login, database setup, or storage setup.

Initial mechanics:

- Store one or two sample rides in local TypeScript files.
- Use local placeholder images or generated/sample images for the ride content.
- Build the public ride page from that data.
- Build the admin editor against a local editable state.
- Add save behavior later when the database exists.

This gives fast feedback on the actual product experience. Once the public story page and maintenance editor feel right, the app can be connected to Supabase with much less risk.

## Recommended Build Phases

### Phase 1: Mock-Data Product Skeleton

- Set up app framework.
- Create shared visual foundation.
- Create public layout based on the first public mockup.
- Create admin layout based on the third maintenance mockup.
- Add local sample ride data.
- Build ride listing and ride detail pages from mock data.
- Build static admin editor screens from mock data.

### Phase 2: Public Ride Story Experience

- Build cinematic ride hero.
- Build static route image section.
- Build `PhotoStory` component with mixed-size photo layouts.
- Build `PhotoLightbox` full-screen viewer.
- Render Markdown story text.
- Add responsive public page behavior.

### Phase 3: Maintenance Editor Mechanics

- Build tabbed ride editor.
- Build photo upload placeholder UI.
- Build sortable photo grid or photo sequence.
- Build selected-photo settings panel.
- Add caption, story note, display size, and text placement controls.
- Add preview behavior using local state.
- Add draft/publish controls visually.

### Phase 4: Real Ride Content

- Add database.
- Create ride data model.
- Build admin ride editor.
- Add draft and published states.
- Render real rides publicly.

### Phase 5: Media and Storage

- Add image upload storage.
- Add cover photo support.
- Add gallery photo support.
- Add route image upload.
- Add photo captions, story notes, display sizes, text placements, and ordering.

### Phase 6: Authentication and Publishing

- Add owner login.
- Protect admin routes.
- Add save draft behavior.
- Add publish and unpublish behavior.
- Add public preview for drafts.

### Phase 7: Polish

- Improve public visual design.
- Add responsive layouts.
- Add motion and transitions.
- Refine typography and photo presentation.
- Add preview workflow.

### Phase 8: Route Upgrade

- Decide whether route images are enough.
- If needed, add GPX upload or route drawing.
- Add route labels, stops, or animated route display.

## Open Questions

- Should the site be only a personal ride journal, or should it eventually support multiple riders?
- Should rides be organized by geography, year, bike, or trip series?
- Do you already track routes with GPX files from a GPS app or motorcycle app?
- Should the public site include practical route details for other riders, or stay more narrative and personal?
- Should the private area be desktop-first, mobile-friendly, or equally strong on both?
- Should photos be lightly edited and curated before upload, or should the app help with selection and presentation?

## Initial Recommendation

Build the first version as a personal storytelling site with a simple owner-only admin. Start with a mock-data implementation of the public ride story page and the private maintenance editor. Use static uploaded route images for now, Markdown for story text, and a strong photo-forward public design with mixed-size editorial layouts and full-screen photo viewing. This keeps the first version achievable while preserving the option to add richer route tools later.

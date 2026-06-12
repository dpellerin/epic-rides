# Epic Rides

A Next.js app for publishing photo-forward motorcycle ride stories, with a Supabase-backed database and authentication planned for the admin area.

## Local Setup

Install dependencies:

```sh
npm install
```

Start the local Supabase stack:

```sh
npx supabase start
```

Reset and seed the local database:

```sh
npx supabase db reset
```

Create `.env.local` from the local Supabase status output:

```sh
npx supabase status -o env
```

The app expects these variables:

```sh
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Supabase is the source for both the application database and admin authentication. Public ride pages use the anon key and RLS policies; admin writes will use authenticated Supabase sessions.

Start the Next.js dev server:

```sh
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

```sh
npm run build
```

Builds the production app.

```sh
npx supabase status
```

Shows local Supabase URLs, keys, and Studio access.

## Current Data Flow

- Public ride archive and ride detail pages read published rides and photos from Supabase when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are configured.
- If those variables are missing, the public pages fall back to the checked-in sample data in `lib/rides.ts` so the mockup remains easy to run.
- Admin screens still use the sample data until auth and persisted save flows are wired.

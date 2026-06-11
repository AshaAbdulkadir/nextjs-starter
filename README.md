# Cloud Command Center 🚀

A game-inspired mission-control dashboard for tracking cloud projects from
idea to deployment. Each project is a mission with a difficulty, an XP value,
and a status — launch them all to defeat the Final Boss.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript + Tailwind CSS v4
- **Neon Serverless Postgres** (via `@neondatabase/serverless`)
- Deployed on Vercel (production from `main`, previews from feature branches)

## Features

- 👑 Final Boss Edition hero with animated typing terminal
- Live dashboard counters straight from the database: Total / Active /
  Launched / Preview Missions, Total XP, Launch Crew size
- Final Boss Progress bar — launched missions ÷ total missions
- Add Mission form → saves to Neon, persists across refreshes
- Launch Crew email signup → unique emails only (duplicates are welcomed
  back, never double-counted)
- Achievements: the Database Connected badge unlocks automatically when
  Neon is wired up
- Friendly success / error messages on every form

## Database setup

The app reads one environment variable: `DATABASE_URL`. No secrets are
committed to the repo.

### On Vercel (production + previews)

1. In your Vercel project: **Storage → Create Database → Neon**.
2. Vercel automatically adds `DATABASE_URL` to the project's environment
   variables for Production, Preview, and Development.
3. Redeploy. Done — tables are created automatically on first use.

### Running locally

1. Copy the env template:

   ```bash
   cp .env.example .env.local
   ```

2. Paste your real connection string into `.env.local`. Get it from
   **Vercel → Project → Storage → your Neon DB → `.env.local` tab**
   (or the Neon console → Connection Details). Alternatively, if you have
   the Vercel CLI linked: `npx vercel env pull .env.local`.

3. Start the app:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

No migration step is needed — the two tables are created with
`CREATE TABLE IF NOT EXISTS` on first request:

| Table         | Columns                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| `missions`    | id, name, platform, status, difficulty, xp, notes, deployment_url, created_at |
| `launch_crew` | id, email (unique), created_at                                            |

> **No `.env.local`?** The app still runs — it shows sample data with a
> warning banner, and the forms explain that the database isn't connected.

## How data flows

```
Add Mission form ──POST /api/missions──▶ Neon missions table
Crew signup      ──POST /api/crew─────▶ Neon launch_crew table (unique email)
Homepage (server component) ──SELECT──▶ live counters + mission log
```

The homepage uses `export const dynamic = "force-dynamic"` so every request
re-reads the database — counters are always live.

## Screenshots

<!-- Replace the placeholders below with real captures for submission. -->

| What                                            | Screenshot                          |
| ----------------------------------------------- | ----------------------------------- |
| Homepage with live database counters            | ![Homepage](docs/screenshot-home.png) |
| Mission saved and appearing in the mission log  | ![Add Mission](docs/screenshot-add-mission.png) |
| Launch Crew signup success + duplicate message  | ![Crew Signup](docs/screenshot-crew.png) |
| Neon tables in the Vercel/Neon dashboard        | ![Neon Tables](docs/screenshot-neon.png) |
| Vercel production + preview deployments         | ![Vercel Deploys](docs/screenshot-vercel.png) |

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Project layout

```
src/
  app/
    page.tsx              # homepage (server component, reads Neon)
    api/missions/route.ts # POST: save a mission
    api/crew/route.ts     # POST: enlist a crew email
  lib/
    db.ts                 # Neon connection, tables, queries, validation
    missions.ts           # types, option lists, sample data, dashboard math
  components/             # Hero, StatsGrid, RecentMissions, forms, etc.
```

---

Built by Asha for AI in Engineering.

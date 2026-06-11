# Cloud Command Center

A mission-control dashboard for tracking cloud projects from idea to deployment.

> Phase 1: front-end only. No database, no secrets, no API calls.
> Phase 2 will add persistence (Neon) and a real `POST /api/missions` route.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (dark mission-control theme)
- ESLint
- Deployable to Vercel out of the box

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's on the page

- **Hero** — title, subtitle, status badges
- **Stats grid** — Total / Building or Testing / Deployed / Planned (computed from sample data)
- **Recent Cloud Missions** — sample missions sorted by `updatedAt`
- **Add Mission form** — Name, Platform, Status, Description, Deployment URL (logs to console, no backend)
- **Deployment Workflow** — GitHub → Vercel (prod) → Vercel (previews) → Neon
- **Launch Crew signup** — email input, demo only
- **Footer** — "Built by Asha for AI in Engineering."

## Sample data

Sample missions and types live in [src/lib/missions.ts](src/lib/missions.ts). Edit that file to change what shows on the dashboard.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Deploying to Vercel

This app has no env vars or secrets in phase 1, so:

```bash
# either: connect the GitHub repo to Vercel in the dashboard
# or, from this directory:
npx vercel
```

`main` will deploy to production; feature branches automatically get preview URLs.

# 🎬 Video Presentation Script — Cloud Command Center + Road Trip Rush

**Target length:** 4–5 minutes · **Format:** screen recording with voice-over
**Recording tool (macOS):** press `Shift + Cmd + 5` → "Record Entire Screen" →
Options → Built-in Microphone → Record. Stop from the menu bar icon.

---

## Before you hit record (2-minute checklist)

- [ ] Close extra tabs/apps; hide bookmarks bar (`Shift+Cmd+B` in Chrome)
- [ ] Open these tabs in order, so you can just Cmd+Tab through them:
  1. https://nextjs-starter-kohl.vercel.app (production app)
  2. https://github.com/AshaAbdulkadir/nextjs-starter (repo, main branch)
  3. https://github.com/AshaAbdulkadir/nextjs-starter/pull/1 (the PR with the Vercel preview comment)
  4. Vercel dashboard → nextjs-starter → Deployments tab
  5. Neon console → Tables → `missions` table (via Vercel → Storage → Open in Neon)
  6. Road Trip Rush (the deployed Vercel URL, or local if not deployed yet)
- [ ] Have one test mission ready to type (e.g. "Record Demo Video / GitHub / Launched / Easy / 100 XP")
- [ ] Set browser zoom to 100%, full screen the window
- [ ] Do one silent dry run of the click path

---

## Scene 1 — Cold open on the live app (0:00–0:40)

**Screen:** Production homepage. Scroll slowly as you talk. Let the hero
terminal finish typing "🚀 Production is LIVE" on camera.

**Say:**
> "This is Cloud Command Center — a mission-control dashboard I built and
> deployed for AI in Engineering. It's live on Vercel right now. The idea:
> every cloud project is a mission with a difficulty and an XP value, and the
> dashboard tracks each one from idea to deployment. The numbers you see —
> total missions, XP, the Final Boss progress bar — are live queries against
> a Postgres database, not hardcoded values."

---

## Scene 2 — The stack and the repo (0:40–1:20)

**Screen:** GitHub repo. Show the file tree, click into `src/lib/db.ts`
briefly, then the commit history page.

**Say:**
> "The stack is Next.js 16 with the App Router, TypeScript, Tailwind, and
> Neon serverless Postgres. The repo started as a clean Next.js starter —
> you can see the whole story in the commit history: scaffold, the dashboard
> UI, the game theme, then database persistence. Each phase is one detailed
> commit. No secrets are committed anywhere — the database connection string
> only lives in an environment variable that Vercel injects."

---

## Scene 3 — The deployment workflow, proven (1:20–2:20)

**Screen:** Start on the homepage "Deployment Workflow" section (the flow
diagram), then Cmd+Tab to PR #1 showing the Vercel bot comment, then the
Vercel Deployments tab showing Production + Preview rows.

**Say:**
> "The app documents its own deployment pipeline — GitHub stores the code,
> feature branches get preview deployments, main deploys to production, and
> Neon stores the data. And here's that pipeline actually happening: I built
> the database feature on a branch called feature/final-boss-preview. When I
> pushed it, Vercel automatically built this preview deployment — you can see
> the bot comment right on the pull request with its own URL. Production
> stayed untouched until I merged. That's the exact workflow teams use to
> ship safely."

---

## Scene 4 — Live database demo (2:20–3:20)

**Screen:** Production app. Fill the Add Mission form on camera, submit,
show the success message, scroll up to show counters increment. Then
**hard-refresh the page** (Cmd+Shift+R) to prove persistence. Then Cmd+Tab
to the Neon console and show the new row in the `missions` table.

**Say:**
> "Now the database, live. I'll add a mission for this video... submit —
> there's the confirmation, and the counters update instantly. If I hard
> refresh, it's still here, because this isn't browser state — it's a row in
> Postgres. Here's the Neon console: there's the row I just created, with its
> timestamp. The crew signup works the same way, with one extra rule: emails
> are unique. If you sign up twice, the app welcomes you back instead of
> double-counting you — that's an ON CONFLICT clause in the insert."

*(Optional, if time: sign up an email twice and show both messages.)*

---

## Scene 5 — The Final Boss: Road Trip Rush (3:20–4:20)

**Screen:** Scroll to the "Featured Final Boss Mission" panel, click through
to Road Trip Rush (deployed URL). Play for ~20 seconds: title screen → pick
difficulty → drive, jump one obstacle, grab a pickup.

**Say:**
> "Every game needs a final boss. Mine is Road Trip Rush — a browser game I
> built with AI assistance, tracked as a 500-XP Final Boss mission inside the
> dashboard. It has unlockable cars, difficulty modes, a daily challenge,
> achievements, and touch and gamepad support. It deploys on the same
> pipeline — GitHub to Vercel. When this mission's status flips to Launched,
> the Final Boss progress bar moves."

---

## Scene 6 — Close (4:20–4:50)

**Screen:** Back on the Command Center homepage, slow scroll to the footer.

**Say:**
> "So that's the project: a clean starter that grew into a full-stack app —
> front end, preview deployments, a production database, and a game — all
> tracked by the dashboard itself. The footer says it best: built by Asha
> for AI in Engineering. Thanks for watching."

---

## Delivery tips

- Talk ~10% slower than feels natural; pause after each scene transition.
- If you flub a line, pause two seconds and restart the sentence — it's easy
  to cut later (iMovie or QuickTime → Edit → Trim).
- Keep the cursor still while talking; move it only to point at things.
- Record audio in a quiet room; do a 10-second test recording first and
  listen back for volume.
- Export target: 1080p MP4 (QuickTime default is fine for submission).

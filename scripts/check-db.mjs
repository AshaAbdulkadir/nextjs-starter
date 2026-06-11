// Neon database health check.
// Run with:  npm run check-db
// (requires DATABASE_URL in .env.local)
//
// Verifies, in order:
//   1. DATABASE_URL is set
//   2. The database answers a query
//   3. Both tables exist (creates them if missing, same as the app)
//   4. Inserts are working (writes + removes a canary crew email)
//   5. The unique-email guard blocks duplicates
//   6. Prints current row counts

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

function fail(msg) {
  console.error(`\n✗ FAIL: ${msg}`);
  process.exit(1);
}

if (!url) {
  fail("DATABASE_URL is not set. Put it in .env.local (see README).");
}
if (url.includes("USER:") || url.includes("@HOST")) {
  fail("DATABASE_URL still contains placeholder text — paste the real connection string.");
}

const sql = neon(url);
const host = new URL(url.replace(/^postgres(ql)?:/, "https:")).hostname;
console.log(`Checking Neon database at ${host} ...\n`);

// 2. Basic connectivity
const [{ now }] = await sql`SELECT now()`;
console.log(`✓ Connected — server time: ${now}`);

// 3. Tables (idempotent, mirrors src/lib/db.ts)
await sql`
  CREATE TABLE IF NOT EXISTS missions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    platform TEXT NOT NULL,
    status TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    xp INTEGER NOT NULL DEFAULT 0,
    notes TEXT NOT NULL DEFAULT '',
    deployment_url TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
await sql`
  CREATE TABLE IF NOT EXISTS launch_crew (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
console.log("✓ Tables exist: missions, launch_crew");

// 4. Write check with a canary row (cleaned up afterwards)
const canary = "healthcheck-canary@example.com";
const inserted = await sql`
  INSERT INTO launch_crew (email) VALUES (${canary})
  ON CONFLICT (email) DO NOTHING RETURNING id`;
if (inserted.length === 0) {
  // Leftover from an aborted earlier run — clean and retry once.
  await sql`DELETE FROM launch_crew WHERE email = ${canary}`;
  const retry = await sql`
    INSERT INTO launch_crew (email) VALUES (${canary})
    ON CONFLICT (email) DO NOTHING RETURNING id`;
  if (retry.length === 0) fail("Could not insert canary row.");
}
console.log("✓ Inserts working (canary row written)");

// 5. Duplicate guard
const dup = await sql`
  INSERT INTO launch_crew (email) VALUES (${canary})
  ON CONFLICT (email) DO NOTHING RETURNING id`;
if (dup.length > 0) fail("Duplicate email was inserted — unique constraint missing!");
console.log("✓ Duplicate-email guard working (second insert blocked)");

await sql`DELETE FROM launch_crew WHERE email = ${canary}`;
console.log("✓ Canary row cleaned up");

// 6. Row counts
const [m] = await sql`SELECT COUNT(*)::int AS count FROM missions`;
const [c] = await sql`SELECT COUNT(*)::int AS count FROM launch_crew`;
console.log(`\nCurrent data: ${m.count} mission(s), ${c.count} crew member(s)`);
console.log("\n✅ All checks passed — Neon is working correctly.");

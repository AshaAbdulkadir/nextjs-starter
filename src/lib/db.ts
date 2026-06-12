import { neon } from "@neondatabase/serverless";
import {
  DIFFICULTIES,
  NEXT_STATUS,
  PLATFORMS,
  SAMPLE_MISSIONS,
  STATUSES,
  type Difficulty,
  type Mission,
  type Platform,
  type Status,
} from "@/lib/missions";

// The connection string comes from the environment — never hardcoded.
// Vercel injects DATABASE_URL automatically via the Neon integration.
// Locally, put it in .env.local (see README).
export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function sql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(process.env.DATABASE_URL);
}

// Create both tables on first use. "IF NOT EXISTS" makes this safe to
// run on every request — Postgres just skips it when they exist.
async function ensureTables() {
  const q = sql();
  await q`
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
    )
  `;
  await q`
    CREATE TABLE IF NOT EXISTS launch_crew (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

// Shape of a row coming back from the missions table.
type MissionRow = {
  id: number;
  name: string;
  platform: string;
  status: string;
  difficulty: string;
  xp: number;
  notes: string;
  deployment_url: string;
  created_at: string;
};

function rowToMission(row: MissionRow): Mission {
  return {
    id: String(row.id),
    name: row.name,
    platform: row.platform as Platform,
    status: row.status as Status,
    difficulty: row.difficulty as Difficulty,
    xp: row.xp,
    notes: row.notes,
    deploymentUrl: row.deployment_url || undefined,
    // yyyy-MM-dd, e.g. 2026-06-11
    updatedAt: new Date(row.created_at).toISOString().slice(0, 10),
  };
}

// Everything the homepage needs in one call.
// Falls back to sample data when no database is configured, so the
// app still runs locally before .env.local is set up.
export async function getDashboardData(): Promise<{
  missions: Mission[];
  crewCount: number;
  dbConfigured: boolean;
}> {
  if (!isDbConfigured()) {
    return { missions: SAMPLE_MISSIONS, crewCount: 0, dbConfigured: false };
  }
  await ensureTables();
  const q = sql();
  const rows = (await q`
    SELECT * FROM missions ORDER BY created_at DESC
  `) as MissionRow[];
  const crew = (await q`
    SELECT COUNT(*)::int AS count FROM launch_crew
  `) as { count: number }[];
  return {
    missions: rows.map(rowToMission),
    crewCount: crew[0]?.count ?? 0,
    dbConfigured: true,
  };
}

export type NewMission = {
  name: string;
  platform: string;
  status: string;
  difficulty: string;
  xp: number;
  notes: string;
  deploymentUrl: string;
};

// Validate user input against the known option lists before inserting.
export function validateMission(input: NewMission): string | null {
  if (!input.name.trim()) return "Mission Name is required.";
  if (!(PLATFORMS as readonly string[]).includes(input.platform))
    return "Pick a platform from the list.";
  if (!(STATUSES as readonly string[]).includes(input.status))
    return "Pick a status from the list.";
  if (!(DIFFICULTIES as readonly string[]).includes(input.difficulty))
    return "Pick a difficulty from the list.";
  if (!Number.isFinite(input.xp) || input.xp < 0)
    return "XP Value must be zero or a positive number.";
  return null;
}

export async function insertMission(input: NewMission) {
  await ensureTables();
  const q = sql();
  await q`
    INSERT INTO missions (name, platform, status, difficulty, xp, notes, deployment_url)
    VALUES (${input.name.trim()}, ${input.platform}, ${input.status},
            ${input.difficulty}, ${input.xp}, ${input.notes.trim()},
            ${input.deploymentUrl.trim()})
  `;
}

// The game move: promote a mission to its next status.
// Returns the new status, or null if the mission is already Launched
// (or doesn't exist).
export async function advanceMission(id: number): Promise<string | null> {
  await ensureTables();
  const q = sql();
  const rows = (await q`
    SELECT status FROM missions WHERE id = ${id}
  `) as { status: string }[];
  const next = rows[0] && NEXT_STATUS[rows[0].status];
  if (!next) return null;
  await q`UPDATE missions SET status = ${next} WHERE id = ${id}`;
  return next;
}

export async function deleteMission(id: number) {
  await ensureTables();
  const q = sql();
  await q`DELETE FROM missions WHERE id = ${id}`;
}

// Returns true if the email was new, false if it was already enlisted.
// ON CONFLICT DO NOTHING means duplicates never raise an error and
// never inflate the crew count.
export async function insertCrewEmail(email: string): Promise<boolean> {
  await ensureTables();
  const q = sql();
  const rows = (await q`
    INSERT INTO launch_crew (email)
    VALUES (${email.trim().toLowerCase()})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `) as { id: number }[];
  return rows.length > 0;
}

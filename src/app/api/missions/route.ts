import { NextResponse } from "next/server";
import {
  advanceMission,
  deleteMission,
  insertMission,
  isDbConfigured,
  validateMission,
} from "@/lib/db";

const NO_DB = NextResponse.json(
  { ok: false, message: "No database connected — add DATABASE_URL first." },
  { status: 503 },
);

// PATCH /api/missions — advance a mission to its next status.
export async function PATCH(request: Request) {
  if (!isDbConfigured()) return NO_DB;
  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { ok: false, message: "Invalid mission id." },
        { status: 400 },
      );
    }
    const next = await advanceMission(id);
    if (!next) {
      return NextResponse.json(
        { ok: false, message: "Mission is already launched." },
        { status: 400 },
      );
    }
    return NextResponse.json({
      ok: true,
      status: next,
      message: next === "Launched" ? "Mission launched — XP banked." : `Advanced to ${next}.`,
    });
  } catch (err) {
    console.error("PATCH /api/missions failed:", err);
    return NextResponse.json(
      { ok: false, message: "Could not advance the mission. Try again." },
      { status: 500 },
    );
  }
}

// DELETE /api/missions — remove a mission.
export async function DELETE(request: Request) {
  if (!isDbConfigured()) return NO_DB;
  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { ok: false, message: "Invalid mission id." },
        { status: 400 },
      );
    }
    await deleteMission(id);
    return NextResponse.json({ ok: true, message: "Mission removed." });
  } catch (err) {
    console.error("DELETE /api/missions failed:", err);
    return NextResponse.json(
      { ok: false, message: "Could not remove the mission. Try again." },
      { status: 500 },
    );
  }
}

// POST /api/missions — save a new mission to Neon.
export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, message: "No database connected yet — add DATABASE_URL to enable saving." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const mission = {
      name: String(body.name ?? ""),
      platform: String(body.platform ?? ""),
      status: String(body.status ?? ""),
      difficulty: String(body.difficulty ?? ""),
      xp: Number(body.xp ?? 0),
      notes: String(body.notes ?? ""),
      deploymentUrl: String(body.deploymentUrl ?? ""),
    };

    const problem = validateMission(mission);
    if (problem) {
      return NextResponse.json({ ok: false, message: problem }, { status: 400 });
    }

    await insertMission(mission);
    return NextResponse.json({
      ok: true,
      message: `Mission "${mission.name.trim()}" logged to the flight computer! 🚀`,
    });
  } catch (err) {
    console.error("POST /api/missions failed:", err);
    return NextResponse.json(
      { ok: false, message: "Houston, we had a problem saving that mission. Try again." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { insertMission, isDbConfigured, validateMission } from "@/lib/db";

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

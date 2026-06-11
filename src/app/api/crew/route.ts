import { NextResponse } from "next/server";
import { insertCrewEmail, isDbConfigured } from "@/lib/db";

// POST /api/crew — enlist a launch crew email (unique per address).
export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, message: "No database connected yet — add DATABASE_URL to enable signups." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();

    // Light validation — the input field already enforces type="email".
    if (!email || !email.includes("@") || email.length > 254) {
      return NextResponse.json(
        { ok: false, message: "That email doesn't look right — double-check it." },
        { status: 400 },
      );
    }

    const isNew = await insertCrewEmail(email);
    return NextResponse.json({
      ok: true,
      isNew,
      message: isNew
        ? "Welcome aboard, crew member! 🧑‍🚀 +50 XP"
        : "You're already on the crew roster — see you at launch! 🚀",
    });
  } catch (err) {
    console.error("POST /api/crew failed:", err);
    return NextResponse.json(
      { ok: false, message: "Houston, we had a problem with signup. Try again." },
      { status: 500 },
    );
  }
}

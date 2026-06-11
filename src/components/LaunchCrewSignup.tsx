"use client";

import { useState } from "react";

export default function LaunchCrewSignup() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // Front-end only — no email is actually sent or stored.
    console.log("Launch crew signup (front-end only):", email);
    setJoined(true);
    setEmail("");
    setTimeout(() => setJoined(false), 5000);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--panel)] to-[color:var(--panel-2)] p-8 sm:p-10">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-400 pulse-dot" />
              <span>CREW CHANNEL // T-MINUS</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
              Join the Launch Crew
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Get mission updates, build notes, and deployment recaps in your inbox.
              No spam — just signal.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@orbit.dev"
              className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2.5 text-sm placeholder:text-[color:var(--muted)]/70 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
            <button
              type="submit"
              className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-300"
            >
              Join Crew
            </button>
          </form>
        </div>

        {joined && (
          <p className="relative mt-4 text-xs mono text-emerald-300">
            ✓ You&apos;re on the launch crew (demo only — no email stored).
          </p>
        )}
      </div>
    </section>
  );
}

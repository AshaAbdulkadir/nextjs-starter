"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// The in-app game manual. Opens as a modal from the header.
// Closes on the X button, a click on the backdrop, or the Escape key.
// The modal is rendered into <body> with a portal — the header's
// backdrop-blur would otherwise trap position:fixed inside it.
export default function HowToPlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full px-3 py-1.5 text-xs mono text-[color:var(--muted)] transition-colors hover:bg-white/5 hover:text-cyan-200"
      >
        ❓ How to Play
      </button>

      {open &&
        createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="How to play Cloud Command Center"
            onClick={(e) => e.stopPropagation()}
            className="glow-card max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 pulse-dot" />
                  <span>FLIGHT MANUAL // RTFM-01</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold">
                  How to Play the Cloud Deployment Game 🎮
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)] transition-colors hover:border-rose-400/50 hover:text-rose-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm leading-6 text-[color:var(--muted)]">
              <section>
                <h3 className="mb-1 text-sm font-semibold text-cyan-200">
                  🛰️ 1 · Brief a mission
                </h3>
                <p>
                  Every real cloud project becomes a mission. Use the{" "}
                  <strong className="text-[color:var(--foreground)]">Add Mission</strong>{" "}
                  form: pick the platform, set a difficulty (Easy → 👑 Final
                  Boss), and price the bounty in XP — easy quests ~100 XP,
                  boss fights 500. Missions are saved to the database and
                  persist forever.
                </p>
              </section>

              <section>
                <h3 className="mb-1 text-sm font-semibold text-amber-200">
                  ⚙️ 2 · Do the real engineering
                </h3>
                <p>
                  The controller is your terminal: branch on GitHub, push
                  code, test the Vercel preview. The game tracks reality —
                  no shipping, no XP.
                </p>
              </section>

              <section>
                <h3 className="mb-1 text-sm font-semibold text-sky-200">
                  📡 3 · Advance the status
                </h3>
                <p className="mono text-xs">
                  Queued → In Progress → Testing → Launched
                </p>
                <p className="mt-1">
                  Missions in <em>Testing</em> count as Preview Missions
                  (they&apos;re on a preview URL). Only{" "}
                  <strong className="text-emerald-300">Launched</strong>{" "}
                  missions bank their XP.
                </p>
              </section>

              <section>
                <h3 className="mb-1 text-sm font-semibold text-rose-200">
                  👑 4 · Defeat the Final Boss
                </h3>
                <p>
                  The boss bar fills as launched missions ÷ total missions.
                  Launch everything — including the 500 XP Final Boss — to
                  hit 100% and win. Achievements unlock along the way, and
                  the Launch Crew counter grows as people enlist (duplicate
                  emails never double-count).
                </p>
              </section>

              <p className="border-t border-[color:var(--border)] pt-4 text-xs mono">
                TIP: toggle 🎧 Focus Beats in the header for energetic lo-fi
                generated live in your browser — head-nod drums, warm chords,
                engineered for high-productivity deployment sessions.
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

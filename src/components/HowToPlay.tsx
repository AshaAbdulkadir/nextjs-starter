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
        className="rounded-md px-3 py-1.5 text-xs mono text-[color:var(--muted)] transition-colors hover:bg-white/5 hover:text-cyan-300"
      >
        How to Play
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
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-white/10 bg-[#0b0d10] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold">How to Play</h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-md border border-white/10 px-2 py-0.5 text-sm text-[color:var(--muted)] transition-colors hover:text-rose-300"
                >
                  ✕
                </button>
              </div>

              <ol className="mt-4 space-y-4 text-sm leading-6 text-[color:var(--muted)]">
                <li>
                  <strong className="text-[color:var(--foreground)]">
                    1 · Add a mission.
                  </strong>{" "}
                  Every real cloud project is a mission. Give it a platform, a
                  difficulty, and an XP value — easy ~100 XP, Final Boss 500.
                </li>
                <li>
                  <strong className="text-[color:var(--foreground)]">
                    2 · Do the work, then press Advance.
                  </strong>{" "}
                  Each click moves a mission one stage:{" "}
                  <span className="mono text-xs">
                    Queued → In Progress → Testing → Launched
                  </span>
                  . Every move is saved to the database.
                </li>
                <li>
                  <strong className="text-[color:var(--foreground)]">
                    3 · Bank XP.
                  </strong>{" "}
                  Launched missions add their XP to your total and fill the
                  Final Boss Progress bar (launched ÷ total missions).
                </li>
                <li>
                  <strong className="text-[color:var(--foreground)]">
                    4 · Win.
                  </strong>{" "}
                  Launch everything — including the Final Boss mission — to
                  reach 100%. The bar turns green: boss defeated.
                </li>
              </ol>

              <p className="mt-5 border-t border-white/10 pt-4 text-xs mono text-[color:var(--muted)]">
                Tip: Focus Beats in the header plays lo-fi generated live in
                your browser — built for deep-work deployment sessions.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

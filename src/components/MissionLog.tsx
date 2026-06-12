"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Mission } from "@/lib/missions";

// Status dot colors — the only color the cards use.
const DOT: Record<string, string> = {
  Queued: "bg-zinc-500",
  "In Progress": "bg-amber-400",
  Testing: "bg-sky-400",
  Launched: "bg-emerald-400",
};

// The playable part of the game: every mission can be advanced one
// stage per click (Queued -> In Progress -> Testing -> Launched).
// Each click is a real database update.
export default function MissionLog({
  missions,
  dbConfigured,
}: {
  missions: Mission[];
  dbConfigured: boolean;
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function call(method: "PATCH" | "DELETE", id: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/missions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id) }),
      });
      const data = await res.json();
      if (!data.ok) setError(data.message);
      router.refresh();
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section id="missions" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Mission Log</h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            Advance each mission to Launched to fill the boss bar.
            {!dbConfigured && " Connect the database to play."}
          </p>
        </div>
        {error && <p className="text-xs mono text-rose-400">{error}</p>}
      </div>

      <p className="mt-3 text-xs mono text-[color:var(--muted)]">
        Final Boss · Road Trip Rush — the game project being prepared for
        Vercel deployment as the final stage of this assignment.{" "}
        <a
          href="https://github.com/AshaAbdulkadir/road-trip-rush"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300"
        >
          View code ↗
        </a>
      </p>

      {missions.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-white/10 p-10 text-center text-sm text-[color:var(--muted)]">
          No missions yet. Add your first one below.
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-white/[0.06] rounded-lg border border-white/[0.08] bg-[#0b0d10]">
          {missions.map((m) => {
            const launched = m.status === "Launched";
            const boss = m.difficulty === "Final Boss";
            return (
              <li key={m.id} className="flex flex-wrap items-center gap-3 p-4">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${DOT[m.status]}`}
                  title={m.status}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {m.name}
                    {boss && (
                      <span className="ml-2 rounded border border-rose-400/30 px-1.5 py-0.5 text-[10px] mono uppercase tracking-wider text-rose-300">
                        Final Boss
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[color:var(--muted)]">
                    {m.platform} · {m.difficulty} · {m.xp} XP
                    {m.notes && ` — ${m.notes}`}
                  </p>
                </div>

                <span className="text-xs mono text-[color:var(--muted)]">
                  {m.status}
                </span>

                {m.deploymentUrl && (
                  <a
                    href={m.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs mono text-cyan-400 hover:text-cyan-300"
                  >
                    Link ↗
                  </a>
                )}

                {launched ? (
                  <span className="rounded-md border border-emerald-400/30 px-3 py-1.5 text-xs mono text-emerald-400">
                    +{m.xp} XP
                  </span>
                ) : (
                  <button
                    onClick={() => call("PATCH", m.id)}
                    disabled={!dbConfigured || busyId === m.id}
                    title={dbConfigured ? "Advance to next stage" : "Connect the database to play"}
                    className="rounded-md bg-cyan-400 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {busyId === m.id ? "…" : "Advance"}
                  </button>
                )}

                <button
                  onClick={() => call("DELETE", m.id)}
                  disabled={!dbConfigured || busyId === m.id}
                  aria-label={`Remove ${m.name}`}
                  title="Remove mission"
                  className="rounded-md border border-white/10 px-2 py-1.5 text-xs text-[color:var(--muted)] transition-colors hover:border-rose-400/40 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

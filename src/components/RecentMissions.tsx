import type { Mission } from "@/lib/missions";
import { DIFFICULTY_STYLES, PLATFORM_BADGE, STATUS_STYLES } from "@/lib/missions";

export default function RecentMissions({ missions }: { missions: Mission[] }) {
  const recent = [...missions]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6);

  return (
    <section id="missions" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
            <span className="inline-block h-2 w-2 rounded-full bg-violet-400 pulse-dot" />
            <span>MISSION LOG // RECENT</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">
            Recent Cloud Missions
          </h2>
        </div>
        <p className="hidden text-xs mono text-[color:var(--muted)] sm:block">
          {recent.length} of {missions.length} shown
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recent.map((m) => {
          const status = STATUS_STYLES[m.status];
          const diff = DIFFICULTY_STYLES[m.difficulty];
          const isBoss = m.difficulty === "Final Boss";

          return (
            <article
              key={m.id}
              className={`flex flex-col rounded-2xl border bg-[color:var(--panel)]/80 p-5 ${
                isBoss
                  ? "glow-boss border-rose-400/30"
                  : "glow-card border-[color:var(--border)]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs mono ${status.chip}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {m.status}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs mono ${diff.chip}`}
                >
                  {diff.icon} {m.difficulty}
                </span>
                <span className="ml-auto rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs mono text-amber-200">
                  +{m.xp} XP
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{m.notes}</p>

              <div className="mt-auto flex items-center justify-between border-t border-[color:var(--border)] pt-3 mt-5 text-xs mono text-[color:var(--muted)]">
                <span
                  className={`rounded-full border px-2.5 py-1 ${PLATFORM_BADGE[m.platform]}`}
                >
                  {m.platform}
                </span>
                {m.deploymentUrl ? (
                  <a
                    href={m.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200"
                  >
                    View deploy ↗
                  </a>
                ) : (
                  <span className="text-[color:var(--muted)]/70">No URL yet</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

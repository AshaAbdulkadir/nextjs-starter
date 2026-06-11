import type { Mission } from "@/lib/missions";
import { PLATFORM_BADGE, STATUS_STYLES } from "@/lib/missions";

export default function RecentMissions({ missions }: { missions: Mission[] }) {
  const recent = [...missions]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
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
          const s = STATUS_STYLES[m.status];
          return (
            <article
              key={m.id}
              className="flex flex-col rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)]/80 p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs mono ${s.chip}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs mono ${PLATFORM_BADGE[m.platform]}`}
                >
                  {m.platform}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
              <p className="mt-1 text-sm text-[color:var(--muted)]">
                {m.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-[color:var(--border)] pt-3 text-xs mono text-[color:var(--muted)]">
                <span>Updated {m.updatedAt}</span>
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
                  <span className="text-[color:var(--muted)]/70">
                    No URL yet
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

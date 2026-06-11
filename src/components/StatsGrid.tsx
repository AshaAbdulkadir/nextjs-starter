import type { Mission } from "@/lib/missions";
import { summarize } from "@/lib/missions";

export default function StatsGrid({ missions }: { missions: Mission[] }) {
  const s = summarize(missions);

  const stats = [
    {
      label: "Total Missions",
      value: String(s.total),
      accent: "text-cyan-300",
      hint: "All projects in orbit",
    },
    {
      label: "Active Missions",
      value: String(s.active),
      accent: "text-amber-300",
      hint: "In progress or testing",
    },
    {
      label: "Launched Missions",
      value: String(s.launched),
      accent: "text-emerald-300",
      hint: "Live in production",
    },
    {
      label: "Preview Missions",
      value: String(s.preview),
      accent: "text-sky-300",
      hint: "On Vercel preview URLs",
    },
    {
      label: "Total XP",
      value: `${s.earnedXp}`,
      accent: "text-violet-300",
      hint: `of ${s.totalXp} XP available`,
    },
    {
      label: "Final Boss Progress",
      value: `${s.finalBossProgress}%`,
      accent: "text-rose-300",
      hint: "XP banked toward the crown",
    },
  ];

  return (
    <section id="dashboard" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-12">
      <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 pulse-dot" />
        <span>COMMAND DECK // LIVE TELEMETRY</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glow-card rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)]/80 p-5 backdrop-blur-sm"
          >
            <p className="text-xs mono uppercase tracking-wider text-[color:var(--muted)]">
              {stat.label}
            </p>
            <p className={`mt-3 text-3xl font-semibold sm:text-4xl ${stat.accent}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">{stat.hint}</p>
          </div>
        ))}
      </div>

      {/* Final Boss Progress bar */}
      <div className="glow-boss mt-6 rounded-2xl border border-rose-400/25 bg-[color:var(--panel)]/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs mono uppercase tracking-wider text-rose-200">
            👑 Final Boss Progress
          </p>
          <p className="text-xs mono text-[color:var(--muted)]">
            {s.earnedXp} / {s.totalXp} XP · defeat the boss at 100%
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Final Boss Progress"
          aria-valuenow={s.finalBossProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-3 h-4 overflow-hidden rounded-full border border-[color:var(--border)] bg-[color:var(--panel-2)]"
        >
          <div
            className="boss-bar h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400"
            style={{ width: `${s.finalBossProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}

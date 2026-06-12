import type { Mission } from "@/lib/missions";
import { summarize } from "@/lib/missions";

export default function StatsGrid({
  missions,
  crewCount,
}: {
  missions: Mission[];
  crewCount: number;
}) {
  const s = summarize(missions);
  const won = s.total > 0 && s.finalBossProgress === 100;

  const stats = [
    { label: "Missions", value: s.total },
    { label: "Active", value: s.active },
    { label: "Launched", value: s.launched },
    { label: "XP Banked", value: s.earnedXp },
    { label: "Launch Crew", value: crewCount },
  ];

  return (
    <section id="dashboard" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-10">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#0b0d10] p-4">
            <p className="text-xs mono uppercase tracking-wider text-[color:var(--muted)]">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.08] bg-[#0b0d10] p-4">
        <div className="flex items-center justify-between gap-3 text-xs mono">
          <span className="uppercase tracking-wider text-[color:var(--muted)]">
            Final Boss Progress
          </span>
          <span className={won ? "text-emerald-400" : "text-[color:var(--muted)]"}>
            {won
              ? "Boss defeated — all missions launched"
              : `${s.launched} of ${s.total} launched · ${s.finalBossProgress}%`}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Final Boss Progress"
          aria-valuenow={s.finalBossProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]"
        >
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              won ? "bg-emerald-400" : "bg-cyan-400"
            }`}
            style={{ width: `${s.finalBossProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}

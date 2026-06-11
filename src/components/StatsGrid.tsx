import type { Mission } from "@/lib/missions";
import { summarize } from "@/lib/missions";

type Stat = {
  label: string;
  value: number;
  accent: string;
  hint: string;
};

export default function StatsGrid({ missions }: { missions: Mission[] }) {
  const s = summarize(missions);

  const stats: Stat[] = [
    {
      label: "Total Missions",
      value: s.total,
      accent: "text-cyan-300",
      hint: "All projects in orbit",
    },
    {
      label: "Building or Testing",
      value: s.buildingOrTesting,
      accent: "text-amber-300",
      hint: "In active development",
    },
    {
      label: "Deployed",
      value: s.deployed,
      accent: "text-emerald-300",
      hint: "Live in production",
    },
    {
      label: "Planned",
      value: s.planned,
      accent: "text-violet-300",
      hint: "On the launchpad",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)]/80 p-5 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs mono uppercase tracking-wider text-[color:var(--muted)]">
                {stat.label}
              </p>
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400/70 pulse-dot" />
            </div>
            <p className={`mt-4 text-4xl font-semibold ${stat.accent}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">{stat.hint}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

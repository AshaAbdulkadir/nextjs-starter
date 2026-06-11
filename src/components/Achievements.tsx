import { ACHIEVEMENTS } from "@/lib/missions";

export default function Achievements() {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <section id="achievements" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400 pulse-dot" />
            <span>TROPHY CASE // BADGES</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">Achievements</h2>
        </div>
        <p className="hidden text-xs mono text-[color:var(--muted)] sm:block">
          {unlocked} of {ACHIEVEMENTS.length} unlocked
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.id}
            className={`rounded-2xl border p-5 text-center ${
              a.unlocked
                ? "glow-card border-amber-400/30 bg-[color:var(--panel)]/80"
                : "border-[color:var(--border)] bg-[color:var(--panel)]/40 opacity-60"
            }`}
          >
            <p className={`text-3xl ${a.unlocked ? "" : "grayscale"}`} aria-hidden>
              {a.unlocked ? a.icon : "🔒"}
            </p>
            <p className="mt-3 text-sm font-semibold">{a.title}</p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">{a.hint}</p>
            <p
              className={`mt-3 text-[10px] mono uppercase tracking-wider ${
                a.unlocked ? "text-amber-300" : "text-[color:var(--muted)]"
              }`}
            >
              {a.unlocked ? "★ Unlocked" : "Locked"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

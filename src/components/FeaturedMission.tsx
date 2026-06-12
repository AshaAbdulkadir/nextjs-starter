// The spotlighted Final Boss mission — Road Trip Rush.
const FEATURED = {
  name: "Road Trip Rush Deployment",
  platform: "Vercel",
  status: "Testing",
  difficulty: "Final Boss",
  xp: 500,
  notes:
    "AI-assisted browser game prepared for cloud deployment and live player testing.",
  deploymentUrl: "https://road-trip-rush.vercel.app", // live!
};

export default function FeaturedMission() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="glow-boss relative overflow-hidden rounded-2xl border border-rose-400/30 bg-gradient-to-br from-[color:var(--panel)] via-[color:var(--panel-2)] to-rose-950/30 p-6 sm:p-8">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />

        <div className="relative">
          <div className="flex items-center gap-2 text-xs mono text-rose-200">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-400 pulse-dot" />
            <span>BOSS FIGHT // SPOTLIGHT</span>
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
            👑 Featured Final Boss Mission
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-[color:var(--muted)]">
            Road Trip Rush is the game project deployed to Vercel as the
            final stage of this assignment — it&apos;s live. Play it!
          </p>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold">🏎️ {FEATURED.name}</h3>
              <p className="mt-1 max-w-xl text-sm text-[color:var(--muted)]">
                {FEATURED.notes}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs mono">
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-sky-200">
                  {FEATURED.status}
                </span>
                <span className="rounded-full border border-rose-400/40 bg-rose-400/10 px-2.5 py-1 text-rose-200">
                  👑 {FEATURED.difficulty}
                </span>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-amber-200">
                  +{FEATURED.xp} XP
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-white">
                  {FEATURED.platform}
                </span>
              </div>
            </div>

            <a
              href={FEATURED.deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-400/40 bg-rose-400/10 px-6 py-3 text-sm font-medium text-rose-100 transition-colors hover:bg-rose-400/20"
            >
              🎮 Play Road Trip Rush
              <span className="text-xs mono text-rose-200/70">(live)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

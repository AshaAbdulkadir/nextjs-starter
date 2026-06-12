import TerminalDemo from "@/components/TerminalDemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
        {/* Left: the pitch */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-xs mono text-rose-200 glow-boss">
              👑 FINAL BOSS EDITION
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-xs mono text-sky-200">
              🔭 PREVIEW DEPLOYMENT TEST
            </span>
            <span className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
              SYS ONLINE · CREW: YOU 🧑‍🚀
            </span>
          </div>

          <h1 className="title-glow mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
            <span className="animated-gradient-text bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-200 bg-clip-text text-transparent">
              Cloud Command Center
            </span>{" "}
            <span className="float inline-block text-4xl sm:text-6xl" aria-hidden>
              🚀
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg sm:text-xl text-[color:var(--muted)]">
            Launch cloud missions. Track deployments. Level up your
            engineering skills.
          </p>
          <p className="mt-3 inline-block rounded-lg border border-sky-400/25 bg-sky-400/5 px-3 py-2 text-xs mono text-sky-200/90">
            🌿 This feature was created on a GitHub branch and previewed in
            Vercel before production.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#add-mission"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300"
            >
              🛰️ Start Mission
            </a>
            <a
              href="#dashboard"
              className="rounded-full border border-violet-400/40 bg-violet-400/10 px-6 py-3 text-sm font-medium text-violet-200 transition-colors hover:border-violet-300/60 hover:bg-violet-400/20"
            >
              📡 View Command Center
            </a>
            <a
              href="#crew"
              className="rounded-full border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-3 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:border-amber-400/50 hover:text-amber-200"
            >
              🧑‍🚀 Join Launch Crew
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs mono">
            {["Next.js", "Vercel", "GitHub", "Neon", "Azure"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--panel)] px-3 py-1 text-[color:var(--muted)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Right: live "deploy" terminal */}
        <TerminalDemo />
      </div>
    </section>
  );
}

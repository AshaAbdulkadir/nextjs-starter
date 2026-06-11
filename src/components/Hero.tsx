import TerminalDemo from "@/components/TerminalDemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
        {/* Left: the pitch */}
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs mono text-[color:var(--muted)]">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
            <span>SYS // STATUS: ONLINE</span>
            <span className="text-[color:var(--border)]">|</span>
            <span>CREW: YOU 🧑‍🚀</span>
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
            Track cloud missions from idea to deployment.
          </p>
          <p className="mt-3 max-w-xl text-base text-[color:var(--muted)]/90">
            Every great app starts as a wild idea scribbled at 2am. Plot the
            course, push the code, and watch your side projects reach orbit —
            no flight school required.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#add-mission"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300"
            >
              🛰️ Launch a Mission
            </a>
            <a
              href="#missions"
              className="rounded-full border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-3 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
            >
              📡 View Mission Log
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

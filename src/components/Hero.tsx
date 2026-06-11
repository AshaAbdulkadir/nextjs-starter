export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
          <span>SYS // STATUS: ONLINE</span>
          <span className="text-[color:var(--border)]">|</span>
          <span>SECTOR: CLOUD-OPS</span>
        </div>

        <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            Cloud Command Center
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg sm:text-xl text-[color:var(--muted)]">
          Track cloud missions from idea to deployment.
        </p>

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
    </section>
  );
}

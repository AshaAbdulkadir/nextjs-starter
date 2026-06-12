export default function Hero() {
  return (
    <section className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <p className="text-xs mono uppercase tracking-widest text-[color:var(--muted)]">
          Final Boss Edition
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Cloud Command Center
        </h1>
        <p className="mt-3 max-w-xl text-base text-[color:var(--muted)]">
          Launch cloud missions. Track deployments. Level up your engineering
          skills.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#add-mission"
            className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-300"
          >
            Start Mission
          </a>
          <a
            href="#dashboard"
            className="rounded-md border border-white/10 px-4 py-2 text-sm text-[color:var(--foreground)] transition-colors hover:border-white/25"
          >
            View Command Center
          </a>
          <a
            href="#crew"
            className="rounded-md border border-white/10 px-4 py-2 text-sm text-[color:var(--foreground)] transition-colors hover:border-white/25"
          >
            Join Launch Crew
          </a>
        </div>
      </div>
    </section>
  );
}

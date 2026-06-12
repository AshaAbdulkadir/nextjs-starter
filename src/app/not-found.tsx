import Link from "next/link";

// Custom 404 — any unknown URL on the site lands here instead of the
// default Next.js error page. Mission-control themed: you're not lost,
// you're just off the flight plan.
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

      {/* Drifting set dressing */}
      <span
        className="float absolute left-[12%] top-[18%] text-3xl opacity-70"
        aria-hidden
      >
        🛰️
      </span>
      <span
        className="float absolute right-[15%] top-[30%] text-2xl opacity-60 [animation-delay:-2s]"
        aria-hidden
      >
        ⭐
      </span>
      <span
        className="float absolute bottom-[22%] left-[20%] text-2xl opacity-60 [animation-delay:-1s]"
        aria-hidden
      >
        🪐
      </span>

      <div className="relative">
        <p className="text-xs mono text-rose-300">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-400 pulse-dot" />
          SIGNAL LOST // SECTOR 404
        </p>

        <p className="float mt-6 text-7xl" aria-hidden>
          🧑‍🚀
        </p>

        <h1 className="title-glow mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
          <span className="animated-gradient-text bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-200 bg-clip-text text-transparent">
            404 — Lost in Space
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm text-[color:var(--muted)]">
          This sector of the cloud is uncharted. The page you&apos;re looking
          for drifted out of orbit, was never launched, or got eaten by a
          black hole during a deploy.
        </p>

        <p className="mt-2 text-xs mono text-[color:var(--muted)]">
          $ curl this-page <span className="text-rose-300">→ 404</span>{" "}
          <span className="cursor-blink text-cyan-300">▍</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300"
          >
            🚀 Return to Command Center
          </Link>
          <a
            href="https://github.com/AshaAbdulkadir/nextjs-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-[color:var(--muted)] transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
          >
            View the source
          </a>
        </div>
      </div>
    </main>
  );
}

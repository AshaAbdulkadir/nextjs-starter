const STEPS = [
  {
    icon: "🐙",
    title: "GitHub",
    accent: "text-violet-300 border-violet-400/30",
    body: "Code lives in the repo. Every change starts here.",
  },
  {
    icon: "🌿",
    title: "Feature Branch",
    accent: "text-emerald-300 border-emerald-400/30",
    body: "Branch off main and build the mission in isolation.",
  },
  {
    icon: "🔭",
    title: "Vercel Preview",
    accent: "text-sky-300 border-sky-400/30",
    body: "Every branch gets its own preview URL for testing.",
  },
  {
    icon: "🚀",
    title: "Production Launch",
    accent: "text-cyan-300 border-cyan-400/30",
    body: "Merge to main and Vercel ships it to production.",
  },
  {
    icon: "🗄️",
    title: "Neon Storage",
    accent: "text-emerald-300 border-emerald-400/30",
    body: "Serverless Postgres keeps mission data persistent.",
  },
];

export default function DeploymentWorkflow() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 pulse-dot" />
        <span>FLIGHT PLAN // CI/CD</span>
      </div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">
        Deployment Workflow
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-[color:var(--muted)]">
        How a mission travels from a commit to a live deploy.
      </p>

      <ol className="mt-6 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col items-stretch gap-2 lg:flex-1 lg:flex-row lg:items-center">
            <div
              className={`glow-card w-full rounded-2xl border bg-[color:var(--panel)]/80 p-4 ${step.accent}`}
            >
              <p className="text-2xl" aria-hidden>
                {step.icon}
              </p>
              <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
              <p className="mt-1 text-xs text-[color:var(--muted)]">
                {step.body}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className="self-center text-lg text-[color:var(--muted)] rotate-90 lg:rotate-0"
                aria-hidden
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

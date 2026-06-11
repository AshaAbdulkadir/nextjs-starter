const STEPS = [
  {
    n: "01",
    title: "GitHub",
    accent: "text-violet-300",
    body: "Source of truth. All code lives in the repo; pull requests gate every change.",
  },
  {
    n: "02",
    title: "Vercel · Production",
    accent: "text-cyan-300",
    body: "The main branch deploys to production automatically on every merge.",
  },
  {
    n: "03",
    title: "Vercel · Previews",
    accent: "text-sky-300",
    body: "Feature branches get their own preview URL, perfect for review and screenshots.",
  },
  {
    n: "04",
    title: "Neon",
    accent: "text-emerald-300",
    body: "Serverless Postgres holds persistent data — missions, status history, and metadata.",
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
        How a mission moves from a commit to a live deploy.
      </p>

      <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li
            key={step.n}
            className="relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)]/80 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="mono text-xs text-[color:var(--muted)]">
                STEP {step.n}
              </span>
              <span className="mono text-xs text-[color:var(--muted)]">
                {i < STEPS.length - 1 ? "→ next" : "● live"}
              </span>
            </div>
            <h3 className={`mt-3 text-lg font-semibold ${step.accent}`}>
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const STEPS = [
  { title: "GitHub", body: "Code lives in the repo" },
  { title: "Feature Branch", body: "Build in isolation" },
  { title: "Vercel Preview", body: "Every branch gets a URL" },
  { title: "Production", body: "Merge to main to ship" },
  { title: "Neon", body: "Postgres keeps the data" },
];

export default function DeploymentWorkflow() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-xl font-semibold">Deployment Workflow</h2>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        How a mission travels from a commit to production.
      </p>

      <ol className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="bg-[#0b0d10] p-4">
            <p className="text-xs mono text-[color:var(--muted)]">{i + 1}</p>
            <p className="mt-1 text-sm font-medium">{step.title}</p>
            <p className="mt-0.5 text-xs text-[color:var(--muted)]">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

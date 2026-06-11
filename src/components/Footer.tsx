export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-8 text-xs mono text-[color:var(--muted)] sm:flex-row sm:items-center">
        <p>Built by Asha for AI in Engineering.</p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
          <span>ALL SYSTEMS NOMINAL</span>
        </p>
      </div>
    </footer>
  );
}

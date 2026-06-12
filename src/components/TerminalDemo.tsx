"use client";

import { useEffect, useState } from "react";

// The fake deploy session typed out line by line in the hero.
const LINES = [
  { text: "$ git push origin main", color: "text-slate-200" },
  { text: "▲ Vercel — build started…", color: "text-[color:var(--muted)]" },
  { text: "✓ Compiled in 1.2s", color: "text-emerald-300" },
  { text: "✓ Preview → ccc-git-feat.vercel.app", color: "text-cyan-300" },
  { text: "🚀 Production is LIVE", color: "text-amber-300" },
];

const TYPE_SPEED_MS = 28; // per character
const LINE_PAUSE_MS = 420; // pause between lines

export default function TerminalDemo() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (line >= LINES.length) return; // finished — hold the final frame
    const current = LINES[line].text;

    if (chars < current.length) {
      const t = setTimeout(() => setChars((c) => c + 1), TYPE_SPEED_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, LINE_PAUSE_MS);
    return () => clearTimeout(t);
  }, [line, chars]);

  const done = line >= LINES.length;

  return (
    <div className="w-full rounded-2xl border border-[color:var(--border)] bg-[#070b14]/90 shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[color:var(--border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-xs mono text-[color:var(--muted)]">
          mission-control — zsh
        </span>
      </div>

      {/* Typed lines */}
      <div className="min-h-44 space-y-2 p-5 text-sm mono">
        {LINES.slice(0, line).map((l) => (
          <p key={l.text} className={l.color}>
            {l.text}
          </p>
        ))}
        {!done && (
          <p className={LINES[line].color}>
            {LINES[line].text.slice(0, chars)}
            <span className="cursor-blink text-cyan-300">▍</span>
          </p>
        )}
        {done && (
          <p className="text-slate-200">
            $ <span className="cursor-blink text-cyan-300">▍</span>
          </p>
        )}
      </div>
    </div>
  );
}

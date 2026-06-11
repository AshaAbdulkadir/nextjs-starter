"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Feedback = { kind: "success" | "error"; text: string };

export default function LaunchCrewSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.includes("@") || sending) return;
    setSending(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/crew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.ok) {
        setFeedback({ kind: "success", text: data.message });
        setEmail("");
        // Refresh so the Launch Crew counter on the dashboard updates.
        router.refresh();
      } else {
        setFeedback({ kind: "error", text: data.message });
      }
    } catch {
      setFeedback({
        kind: "error",
        text: "Lost contact with mission control — check your connection and try again.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="crew" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-12">
      <div className="glow-card relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--panel)] to-[color:var(--panel-2)] p-8 sm:p-10">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-400 pulse-dot" />
              <span>CREW CHANNEL // T-MINUS</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
              Join the Launch Crew
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Get mission updates, build notes, and deployment recaps in your
              inbox. No spam — just signal.{" "}
              <span className="mono text-amber-300">+50 XP for enlisting.</span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@orbit.dev"
              className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--panel-2)] px-4 py-2.5 text-sm placeholder:text-[color:var(--muted)]/70 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Enlisting…" : "Join Crew"}
            </button>
          </form>
        </div>

        {feedback && (
          <p
            className={`relative mt-4 text-xs mono ${
              feedback.kind === "success" ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {feedback.kind === "success" ? "✓ " : "✗ "}
            {feedback.text}
          </p>
        )}
      </div>
    </section>
  );
}

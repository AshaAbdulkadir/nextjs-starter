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
        router.refresh();
      } else {
        setFeedback({ kind: "error", text: data.message });
      }
    } catch {
      setFeedback({ kind: "error", text: "Network error — try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="crew" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-10">
      <div className="flex flex-col gap-4 rounded-lg border border-white/[0.08] bg-[#0b0d10] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Join the Launch Crew</h2>
          <p className="mt-0.5 text-sm text-[color:var(--muted)]">
            Mission updates and deployment recaps. No spam.
          </p>
          {feedback && (
            <p
              className={`mt-1 text-xs mono ${
                feedback.kind === "success" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {feedback.text}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm placeholder:text-[color:var(--muted)]/60 focus:border-cyan-400/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending}
            className="shrink-0 rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Joining…" : "Join"}
          </button>
        </form>
      </div>
    </section>
  );
}

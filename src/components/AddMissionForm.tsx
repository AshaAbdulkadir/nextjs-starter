"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DIFFICULTIES,
  PLATFORMS,
  STATUSES,
  type Difficulty,
  type Platform,
  type Status,
} from "@/lib/missions";

type FormState = {
  name: string;
  platform: Platform;
  status: Status;
  difficulty: Difficulty;
  xp: string;
  deploymentUrl: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  platform: "GitHub",
  status: "Queued",
  difficulty: "Easy",
  xp: "100",
  deploymentUrl: "",
  notes: "",
};

type Feedback = { kind: "success" | "error"; text: string };

export default function AddMissionForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || saving) return;
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, xp: Number(form.xp) || 0 }),
      });
      const data = await res.json();
      if (data.ok) {
        setFeedback({ kind: "success", text: data.message });
        setForm(EMPTY);
        router.refresh();
      } else {
        setFeedback({ kind: "error", text: data.message });
      }
    } catch {
      setFeedback({ kind: "error", text: "Network error — try again." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section id="add-mission" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-10">
      <h2 className="text-xl font-semibold">Add Mission</h2>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        New missions start anywhere in the pipeline and are saved to Postgres.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 gap-4 rounded-lg border border-white/[0.08] bg-[#0b0d10] p-5 sm:grid-cols-2"
      >
        <Field label="Mission Name" htmlFor="mission-name">
          <input
            id="mission-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Deploy the next big thing"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Platform" htmlFor="mission-platform">
          <select
            id="mission-platform"
            value={form.platform}
            onChange={(e) => update("platform", e.target.value as Platform)}
            className={inputClass}
          >
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>

        <Field label="Status" htmlFor="mission-status">
          <select
            id="mission-status"
            value={form.status}
            onChange={(e) => update("status", e.target.value as Status)}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Difficulty" htmlFor="mission-difficulty">
          <select
            id="mission-difficulty"
            value={form.difficulty}
            onChange={(e) => update("difficulty", e.target.value as Difficulty)}
            className={inputClass}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>

        <Field label="XP Value" htmlFor="mission-xp">
          <input
            id="mission-xp"
            type="number"
            min={0}
            step={50}
            value={form.xp}
            onChange={(e) => update("xp", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Deployment URL (optional)" htmlFor="mission-url">
          <input
            id="mission-url"
            type="url"
            value={form.deploymentUrl}
            onChange={(e) => update("deploymentUrl", e.target.value)}
            placeholder="https://"
            className={inputClass}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Mission Notes" htmlFor="mission-notes">
            <textarea
              id="mission-notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={2}
              placeholder="What does done look like?"
              className={`${inputClass} resize-y`}
            />
          </Field>
        </div>

        <div className="flex items-center justify-between gap-3 sm:col-span-2">
          <p className="text-xs mono">
            {feedback ? (
              <span
                className={
                  feedback.kind === "success" ? "text-emerald-400" : "text-rose-400"
                }
              >
                {feedback.text}
              </span>
            ) : (
              <span className="text-[color:var(--muted)]">
                Saved to Neon · persists across refreshes
              </span>
            )}
          </p>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : "Add Mission"}
          </button>
        </div>
      </form>
    </section>
  );
}

const inputClass =
  "w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted)]/60 focus:border-cyan-400/60 focus:outline-none";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-xs mono uppercase tracking-wider text-[color:var(--muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

"use client";

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

export default function AddMissionForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim()) return;
    // Front-end only for phase one — log to console and show a confirmation.
    console.log("New mission (front-end only):", form);
    setConfirmed(form.name.trim());
    setForm(EMPTY);
    setTimeout(() => setConfirmed(null), 4000);
  }

  return (
    <section id="add-mission" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-12">
      <div className="glow-card rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)]/80 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs mono text-[color:var(--muted)]">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 pulse-dot" />
          <span>MISSION INTAKE // FORM-01</span>
        </div>

        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">Add Mission</h2>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          Brief a new cloud mission. Saved locally for now — database wiring
          lands in phase two.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Field label="Mission Name" htmlFor="mission-name" required>
            <input
              id="mission-name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Defeat the Final Boss"
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
                <option key={p} value={p}>
                  {p}
                </option>
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
                <option key={s} value={s}>
                  {s}
                </option>
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
                <option key={d} value={d}>
                  {d}
                </option>
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
              placeholder="100"
              className={inputClass}
            />
          </Field>

          <Field label="Deployment URL" htmlFor="mission-url">
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
                placeholder="Objectives, blockers, loot…"
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </Field>
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs mono text-[color:var(--muted)]">
              {confirmed ? (
                <span className="text-emerald-300">
                  ✓ Mission briefed: <strong>{confirmed}</strong>
                </span>
              ) : (
                <>No database connected. Submissions stay in your browser session.</>
              )}
            </p>
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
            >
              🚀 Launch Mission
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-2 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted)]/70 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-xs mono uppercase tracking-wider text-[color:var(--muted)]">
        {label}
        {required && <span className="ml-1 text-rose-300">*</span>}
      </span>
      {children}
    </label>
  );
}

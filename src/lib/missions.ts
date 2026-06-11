export const PLATFORMS = [
  "GitHub",
  "Vercel",
  "Neon",
  "Azure",
  "Next.js",
  "Other",
] as const;

export const STATUSES = ["Queued", "In Progress", "Testing", "Launched"] as const;

export const DIFFICULTIES = ["Easy", "Medium", "Hard", "Final Boss"] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Status = (typeof STATUSES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];

export type Mission = {
  id: string;
  name: string;
  platform: Platform;
  status: Status;
  difficulty: Difficulty;
  xp: number;
  notes: string;
  deploymentUrl?: string;
  updatedAt: string;
};

export const SAMPLE_MISSIONS: Mission[] = [
  {
    id: "m-001",
    name: "Deploy Next.js Starter",
    platform: "Vercel",
    status: "Launched",
    difficulty: "Easy",
    xp: 100,
    notes:
      "First mission: scaffold a clean Next.js app and ship it to production from main.",
    deploymentUrl: "https://nextjs-starter.vercel.app",
    updatedAt: "2026-06-07",
  },
  {
    id: "m-002",
    name: "Connect Neon Database",
    platform: "Neon",
    status: "Queued",
    difficulty: "Medium",
    xp: 250,
    notes:
      "Wire up serverless Postgres so missions persist between sessions. Unlocks the Database Connected badge.",
    updatedAt: "2026-06-11",
  },
  {
    id: "m-003",
    name: "Launch Road Trip Rush",
    platform: "Vercel",
    status: "In Progress",
    difficulty: "Final Boss",
    xp: 500,
    notes:
      "The big one. Ship the full game with daily challenges, achievements, and ghost cars to production.",
    updatedAt: "2026-06-10",
  },
  {
    id: "m-004",
    name: "Test Preview Branch",
    platform: "GitHub",
    status: "Testing",
    difficulty: "Easy",
    xp: 150,
    notes:
      "Open a feature branch PR and verify the Vercel preview deployment before merging.",
    deploymentUrl: "https://ccc-git-feat-preview.vercel.app",
    updatedAt: "2026-06-09",
  },
  {
    id: "m-006",
    name: "Preview Branch Test",
    platform: "Vercel",
    status: "Testing",
    difficulty: "Medium",
    xp: 100,
    notes:
      "Demonstrate the preview pipeline: push a feature branch, let Vercel build it, and review the preview URL.",
    deploymentUrl: "https://nextjs-starter-git-feature-final-boss-preview.vercel.app",
    updatedAt: "2026-06-11",
  },
  {
    id: "m-005",
    name: "Build Azure Jump Box Lab",
    platform: "Azure",
    status: "In Progress",
    difficulty: "Hard",
    xp: 400,
    notes:
      "AZ-104 practice: deploy a secured jump box with Bastion, NSGs, and a private VNet.",
    updatedAt: "2026-06-08",
  },
];

// Dashboard math, derived from mission data — nothing hardcoded.
export function summarize(missions: Mission[]) {
  const launched = missions.filter((m) => m.status === "Launched");
  const active = missions.filter(
    (m) => m.status === "In Progress" || m.status === "Testing",
  );
  // Missions currently running on a Vercel preview deployment.
  const preview = missions.filter((m) => m.status === "Testing");
  const totalXp = missions.reduce((sum, m) => sum + m.xp, 0);
  const earnedXp = launched.reduce((sum, m) => sum + m.xp, 0);

  return {
    total: missions.length,
    active: active.length,
    launched: launched.length,
    preview: preview.length,
    totalXp,
    earnedXp,
    // % of all available XP already banked by launched missions.
    finalBossProgress:
      totalXp === 0 ? 0 : Math.round((earnedXp / totalXp) * 100),
  };
}

export const STATUS_STYLES: Record<
  Status,
  { dot: string; chip: string }
> = {
  Queued: {
    dot: "bg-slate-400",
    chip: "bg-slate-400/10 text-slate-300 border-slate-400/30",
  },
  "In Progress": {
    dot: "bg-amber-400",
    chip: "bg-amber-400/10 text-amber-200 border-amber-400/30",
  },
  Testing: {
    dot: "bg-sky-400",
    chip: "bg-sky-400/10 text-sky-200 border-sky-400/30",
  },
  Launched: {
    dot: "bg-emerald-400",
    chip: "bg-emerald-400/10 text-emerald-200 border-emerald-400/30",
  },
};

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { chip: string; icon: string }
> = {
  Easy: { chip: "bg-emerald-400/10 text-emerald-200 border-emerald-400/30", icon: "●" },
  Medium: { chip: "bg-cyan-400/10 text-cyan-200 border-cyan-400/30", icon: "◆" },
  Hard: { chip: "bg-violet-400/10 text-violet-200 border-violet-400/30", icon: "▲" },
  "Final Boss": {
    chip: "bg-rose-400/10 text-rose-200 border-rose-400/40",
    icon: "👑",
  },
};

export const PLATFORM_BADGE: Record<Platform, string> = {
  GitHub: "bg-violet-500/10 text-violet-200 border-violet-400/30",
  Vercel: "bg-white/5 text-white border-white/15",
  Neon: "bg-emerald-500/10 text-emerald-200 border-emerald-400/30",
  Azure: "bg-sky-500/10 text-sky-200 border-sky-400/30",
  "Next.js": "bg-zinc-100/10 text-zinc-100 border-zinc-100/20",
  Other: "bg-slate-500/10 text-slate-200 border-slate-400/30",
};

// Achievement badges shown in the trophy case.
export type Achievement = {
  id: string;
  title: string;
  icon: string;
  hint: string;
  unlocked: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "a-001",
    title: "First Deploy",
    icon: "🚀",
    hint: "Ship any mission to production",
    unlocked: true,
  },
  {
    id: "a-002",
    title: "Preview Tested",
    icon: "🔬",
    hint: "Verify a Vercel preview deployment",
    unlocked: true,
  },
  {
    id: "a-003",
    title: "Database Connected",
    icon: "🗄️",
    hint: "Hook up Neon Postgres",
    unlocked: false,
  },
  {
    id: "a-004",
    title: "Production Ready",
    icon: "🛡️",
    hint: "Lint, type-check, and build all green",
    unlocked: true,
  },
  {
    id: "a-005",
    title: "Final Boss Ready",
    icon: "👑",
    hint: "Bank 100% of available XP",
    unlocked: false,
  },
];

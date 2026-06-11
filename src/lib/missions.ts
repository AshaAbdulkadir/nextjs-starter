export const PLATFORMS = [
  "Vercel",
  "Azure",
  "GitHub",
  "Neon",
  "Next.js",
  "Other",
] as const;

export const STATUSES = ["Planned", "Building", "Testing", "Deployed"] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Status = (typeof STATUSES)[number];

export type Mission = {
  id: string;
  name: string;
  platform: Platform;
  status: Status;
  description: string;
  deploymentUrl?: string;
  updatedAt: string;
};

export const SAMPLE_MISSIONS: Mission[] = [
  {
    id: "m-001",
    name: "Tech Code Cloud Site",
    platform: "Vercel",
    status: "Deployed",
    description:
      "Static marketing site for the TC² training series. Built with Next.js and shipped from main.",
    deploymentUrl: "https://techcodecloud.example.com",
    updatedAt: "2026-06-09",
  },
  {
    id: "m-002",
    name: "AZ-104 Lab Tracker",
    platform: "Azure",
    status: "Building",
    description:
      "Personal dashboard tracking Azure Administrator lab progress, resources spun up, and study notes.",
    updatedAt: "2026-06-10",
  },
  {
    id: "m-003",
    name: "Resume Site v2",
    platform: "GitHub",
    status: "Testing",
    description:
      "Refresh of GitResume portfolio with new project pages. Currently validating responsive layout.",
    deploymentUrl: "https://asha-resume-preview.vercel.app",
    updatedAt: "2026-06-08",
  },
  {
    id: "m-004",
    name: "Mission Log DB",
    platform: "Neon",
    status: "Planned",
    description:
      "Postgres schema for storing missions, status history, and deployment links. Targeted for phase two.",
    updatedAt: "2026-06-11",
  },
  {
    id: "m-005",
    name: "GitHub Actions Pipeline",
    platform: "GitHub",
    status: "Deployed",
    description:
      "CI workflow running lint, type-check, and preview deploys on every PR.",
    deploymentUrl: "https://github.com/AshaAbdulkadir/nextjs-starter/actions",
    updatedAt: "2026-06-07",
  },
  {
    id: "m-006",
    name: "Starter Kit Refactor",
    platform: "Next.js",
    status: "Planned",
    description:
      "Extract reusable layout and theme primitives from this app into a shared starter template.",
    updatedAt: "2026-06-11",
  },
];

export function summarize(missions: Mission[]) {
  return {
    total: missions.length,
    buildingOrTesting: missions.filter(
      (m) => m.status === "Building" || m.status === "Testing",
    ).length,
    deployed: missions.filter((m) => m.status === "Deployed").length,
    planned: missions.filter((m) => m.status === "Planned").length,
  };
}

export const STATUS_STYLES: Record<
  Status,
  { dot: string; chip: string; label: string }
> = {
  Planned: {
    dot: "bg-slate-400",
    chip: "bg-slate-400/10 text-slate-300 border-slate-400/30",
    label: "Planned",
  },
  Building: {
    dot: "bg-amber-400",
    chip: "bg-amber-400/10 text-amber-200 border-amber-400/30",
    label: "Building",
  },
  Testing: {
    dot: "bg-sky-400",
    chip: "bg-sky-400/10 text-sky-200 border-sky-400/30",
    label: "Testing",
  },
  Deployed: {
    dot: "bg-emerald-400",
    chip: "bg-emerald-400/10 text-emerald-200 border-emerald-400/30",
    label: "Deployed",
  },
};

export const PLATFORM_BADGE: Record<Platform, string> = {
  Vercel: "bg-white/5 text-white border-white/15",
  Azure: "bg-sky-500/10 text-sky-200 border-sky-400/30",
  GitHub: "bg-violet-500/10 text-violet-200 border-violet-400/30",
  Neon: "bg-emerald-500/10 text-emerald-200 border-emerald-400/30",
  "Next.js": "bg-zinc-100/10 text-zinc-100 border-zinc-100/20",
  Other: "bg-slate-500/10 text-slate-200 border-slate-400/30",
};

import FocusMusic from "@/components/FocusMusic";
import HowToPlay from "@/components/HowToPlay";

const LINKS = [
  { href: "#dashboard", label: "Command Deck" },
  { href: "#missions", label: "Mission Log" },
  { href: "#achievements", label: "Achievements" },
  { href: "#add-mission", label: "Add Mission" },
  { href: "#crew", label: "Crew" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[#05070d]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold">
          <span aria-hidden>🛰️</span>
          <span className="mono tracking-wide">
            CLOUD<span className="text-cyan-300">CC</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs mono text-[color:var(--muted)] transition-colors hover:bg-white/5 hover:text-cyan-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="flex items-center gap-1.5">
          <HowToPlay />
          <FocusMusic />
          <span className="ml-1 hidden items-center gap-2 text-xs mono text-emerald-300 md:flex">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
            NOMINAL
          </span>
        </span>
      </div>
    </header>
  );
}

import FocusMusic from "@/components/FocusMusic";
import HowToPlay from "@/components/HowToPlay";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <span className="text-sm font-semibold mono tracking-wide">
          CLOUD<span className="text-cyan-400">CC</span>
        </span>
        <span className="flex items-center gap-1.5">
          <HowToPlay />
          <FocusMusic />
        </span>
      </div>
    </header>
  );
}

import { Link } from "@tanstack/react-router";

export function Logo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link
      to="/"
      className={`font-display tracking-[0.4em] text-2xl md:text-[1.7rem] leading-none select-none ${
        invert ? "text-bone" : "text-ink"
      } ${className}`}
      aria-label="LUXORA — home"
    >
      LUXORA
    </Link>
  );
}
import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

/** Paradigm-style: square, mono, uppercase */
export function Tag({ children, className = "", showArrow = false }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-[var(--color-tag-border)] bg-[var(--color-tag-bg)] px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-700 ${className}`}
    >
      {children}
      {showArrow ? <span className="text-zinc-500" aria-hidden>↗</span> : null}
    </span>
  );
}

import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
      {children}
    </p>
  );
}

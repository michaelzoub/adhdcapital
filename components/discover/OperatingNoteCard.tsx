"use client";

import type { ReactNode } from "react";

import { BackgroundBeams } from "@/components/backgrounds/BackgroundBeams";

type Props = {
  children: ReactNode;
};

export function OperatingNoteCard({ children }: Props) {
  return (
    <div className="relative overflow-hidden border border-zinc-800 bg-zinc-950 shadow-sm">
      <BackgroundBeams className="opacity-90" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

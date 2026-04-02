"use client";

import * as React from "react";

import { Globe } from "@/registry/magicui/globe";

type EarthProps = {
  className?: string;
};

export default function Earth({ className }: EarthProps) {
  return (
    <div className={["relative h-[280px] w-full", className ?? ""].join(" ")}>
      <Globe className="top-6 opacity-90" />
    </div>
  );
}


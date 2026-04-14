"use client";

import Link from "next/link";

import { Container } from "@/components/ui";

const nav = [
  { href: "/variation-avantgarde#vision", label: "Vision" },
  { href: "/variation-avantgarde#modes", label: "Modes" },
  { href: "/variation-avantgarde#system", label: "System" },
  { href: "/variation-avantgarde#contact", label: "Contact" },
] as const;

/**
 * Standalone header for the avantgarde route.
 */
export function AvantHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#cdb9a7] bg-[#f5eee4]/95 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-6 md:h-16">
        <Link
          href="/variation-avantgarde"
          className="inline-flex items-center border border-[#7c2d12] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c2d12]"
        >
          Meridia / Avant
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Avant primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6c4a35] transition-colors hover:text-[#2f241b]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

"use client";

import Link from "next/link";

import { Container } from "@/components/ui";
import { SOCIAL_X_URL } from "@/lib/site";

const links = [
  { href: "/variation-avantgarde#vision", label: "Vision" },
  { href: "/variation-avantgarde#modes", label: "Modes" },
  { href: "/variation-avantgarde#system", label: "System" },
  { href: "/writing", label: "Writing" },
] as const;

/**
 * Sharp, flat footer dedicated to the avantgarde variation route.
 */
export function AvantFooter() {
  return (
    <footer className="border-t border-[#cdb9a7] bg-[#2d2218] text-[#f7f1e8]">
      <Container className="py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d8b89f]">
              Meridia — Avantgarde Variation
            </p>
            <p className="mt-4 max-w-xl font-serif-display text-sm leading-relaxed text-[#e8d9cb]">
              Research with warmth, rigor, and conviction: showing the mechanism, not the illusion.
            </p>
          </div>
          <div className="grid gap-2 md:text-right">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f7f1e8] transition-opacity hover:opacity-75"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SOCIAL_X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f7f1e8] transition-opacity hover:opacity-75"
            >
              Research & updates ↗
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

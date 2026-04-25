import type { Metadata } from "next";
import Image from "next/image";

import PixelHammer from "@/components/backgrounds/PixelHammer";
import PixelMountain from "@/components/backgrounds/PixelMountain";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  HeroColumnStagger,
  HeroEntrance,
  HeroLineItem,
  HeroStaggerChild,
  HeroStaggerRoot,
} from "@/components/hero/HeroEntrance";
import { SectionReveal } from "@/components/hero/SectionReveal";
import { StaggerItem, StaggerOnView } from "@/components/hero/StaggerOnView";
import { Container } from "@/components/ui";
import { SOCIAL_X_URL } from "@/lib/site";

// ── Palette ──────────────────────────────────────────────────────────────────
const PAPER = "#f2f1ed";
const INK = "#0c0c0c";
const RED = "#c1240a"; // flat, no glow — single accent
const RULE = "#d8d5d0";
const MUTED = "#7a7a72";

// ── Data ─────────────────────────────────────────────────────────────────────
const stats = [
  { n: "2", label: "Research seats" },
  { n: "10+", label: "Active domains" },
  { n: "SG × NYC", label: "Coverage span" },
  { n: "0", label: "Vanity decks shipped" },
];

const pillars = [
  {
    n: "01",
    label: "Protocol economics",
    body: "L1/L2 incentive design, DeFi mechanism review, custody and settlement risk. On-chain first, narrative last.",
  },
  {
    n: "02",
    label: "Fintech infrastructure",
    body: "Payment rails, wallet stacks, cross-border settlement. We trace the plumbing before the product pitch.",
  },
  {
    n: "03",
    label: "Frontier AI systems",
    body: "Agent pipelines, inference hardware, emerging compute paradigms. We stress-test the architecture.",
  },
  {
    n: "04",
    label: "Robotics & deep tech",
    body: "Hardware–software integration, sensor stacks, and adjacent layers where physical and digital converge.",
  },
];

const team = [
  {
    handle: "Feuter",
    image: "/feuter.jpg",
    role: "Analytics & company research",
    city: "Singapore",
    xUrl: "https://x.com/feuters",
    blurb:
      "Graduate training with VC exposure—deep on analytics, modelling, and company analysis. Operator judgment meets institutional rigor.",
  },
  {
    handle: "Kafka",
    image: "/kafka.jpg",
    role: "Technical research",
    city: "NYC",
    xUrl: "https://x.com/wenkafka",
    blurb:
      "Computer science background; hands-on engineering across protocol and infrastructure stacks. Codes, reviews, and stress-tests assumptions.",
  },
];

export const metadata: Metadata = {
  title: "Caliga — The future of finance is being written now",
  description:
    "A research collective at the frontier of crypto, fintech, deep tech, and frontier AI. Research first. Capital second.",
  robots: { index: false, follow: true },
};

export default function Variation4Page() {
  return (
    <div style={{ background: PAPER }} className="text-[#0c0c0c]">
      <Header />
      <main>
        {/* ─── HERO: Massive stacked headline ─── */}
        <HeroEntrance>
          <section
            className="relative flex min-h-[calc(100svh-6.5rem)] flex-col overflow-hidden md:min-h-[calc(100svh-7rem)]"
            style={{ background: PAPER }}
          >
            <HeroStaggerRoot className="flex flex-1 flex-col">
              {/* Stacked display headline — full bleed, no Container */}
              <div className="flex flex-1 flex-col justify-end overflow-hidden px-4 pb-0 pt-12 md:px-8 lg:px-10 xl:px-14">
                <HeroStaggerChild>
                  <HeroColumnStagger>
                    <HeroLineItem>
                      <p
                        className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em]"
                        style={{ color: MUTED }}
                      >
                        Caliga · Research collective
                      </p>
                    </HeroLineItem>
                    <HeroLineItem>
                      {/*
                       * Typography scale: clamp(3.5rem, 12vw, 11.5rem)
                       * At 1440px → 172.8px. "THE FUTURE" (10 ch × 0.55) ≈ 950px — bold, edge-filling.
                       * line-height 0.87 → lines touch for stacked magazine look.
                       */}
                      <h1
                        className="font-sans font-black uppercase"
                        style={{
                          fontSize: "clamp(3.5rem, 12vw, 11.5rem)",
                          lineHeight: "0.87",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <span className="block" style={{ color: INK }}>
                          THE FUTURE
                        </span>
                        <span className="block" style={{ color: INK }}>
                          OF FINANCE
                        </span>
                        <span className="block" style={{ color: RED }}>
                          IS BEING
                        </span>
                        <span className="block" style={{ color: INK }}>
                          WRITTEN
                        </span>
                        <span className="block" style={{ color: INK }}>
                          RIGHT NOW
                        </span>
                      </h1>
                    </HeroLineItem>
                  </HeroColumnStagger>
                </HeroStaggerChild>
              </div>

              {/* Stats strip — anchored at bottom */}
              <HeroStaggerChild>
                <div
                  className="mt-10 grid grid-cols-2 border-t md:grid-cols-4"
                  style={{ borderColor: RULE }}
                >
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="border-r px-6 py-5 last:border-r-0 md:px-8"
                      style={{ borderColor: RULE }}
                    >
                      <p
                        className="font-sans font-black text-2xl tracking-tight md:text-3xl"
                        style={{ color: INK }}
                      >
                        {s.n}
                      </p>
                      <p
                        className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                        style={{ color: MUTED }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </HeroStaggerChild>
            </HeroStaggerRoot>
          </section>
        </HeroEntrance>

        {/* ─── WHO WE ARE ─── */}
        <SectionReveal amount={0.07}>
          <section
            className="border-b border-t py-16 md:py-24"
            style={{ background: "#fff", borderColor: RULE }}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p
                    className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: MUTED }}
                  >
                    Who we are
                  </p>
                  <h2
                    className="font-sans font-black leading-[1.0] tracking-tight"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", color: INK }}
                  >
                    Research{" "}
                    <span style={{ color: RED }}>first</span>.{" "}
                    Capital second.
                  </h2>
                </div>
                <div className="flex flex-col justify-center space-y-5">
                  <p
                    className="font-serif-display text-lg leading-relaxed md:text-xl"
                    style={{ color: "#4a4a42" }}
                  >
                    Caliga is a two-seat research collective operating at the edge of crypto,
                    fintech, deep tech, and frontier AI. We publish before we pitch—and we pitch
                    rarely.
                  </p>
                  <p
                    className="font-serif-display text-base leading-relaxed"
                    style={{ color: "#6a6a62" }}
                  >
                    Every deployment of capital is downstream of work you can read, reproduce, and
                    stress-test. We bias toward mechanism over momentum, and evidence over narrative.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="/variation4#contact"
                      className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-opacity hover:opacity-80"
                      style={{ background: INK, color: PAPER }}
                    >
                      Collaborate
                    </a>
                    <a
                      href="/variation4#domains"
                      className="inline-flex items-center border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-colors hover:border-[#0c0c0c]"
                      style={{ borderColor: RULE, color: INK }}
                    >
                      Our research
                    </a>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ─── DARK MANIFESTO ─── */}
        <SectionReveal amount={0.06}>
          <section className="py-20 md:py-32" style={{ background: INK }}>
            <Container>
              <div className="max-w-5xl">
                <p
                  className="mb-8 font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "#555" }}
                >
                  Research thesis
                </p>
                <blockquote
                  className="font-sans font-black leading-[1.0] tracking-tight"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", color: PAPER }}
                >
                  &ldquo;The most valuable{" "}
                  <span style={{ color: RED }}>insights</span>{" "}
                  are the ones that haven&apos;t been priced in yet.&rdquo;
                </blockquote>
                <p
                  className="mt-10 max-w-2xl font-serif-display text-lg leading-relaxed"
                  style={{ color: "#8a8880" }}
                >
                  We research protocols, infrastructure, and technical stacks where evidence still
                  beats narrative. Capital is secondary and selective—deployed only when the work is
                  done.
                </p>
              </div>

              {/* Domain tags */}
              <div
                className="mt-16 grid grid-cols-2 gap-6 border-t pt-10 md:grid-cols-4"
                style={{ borderColor: "#222" }}
              >
                {["Crypto & protocols", "Fintech rails", "Frontier AI", "Robotics"].map((d) => (
                  <div key={d}>
                    <p className="font-sans font-bold text-sm" style={{ color: PAPER }}>
                      {d}
                    </p>
                    <div className="mt-2 h-px w-8" style={{ background: RED }} />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ─── RESEARCH DOMAINS ─── */}
        <SectionReveal amount={0.07}>
          <section
            id="domains"
            className="scroll-mt-24 border-b py-16 md:py-24"
            style={{ background: PAPER, borderColor: RULE }}
          >
            <Container>
              <p
                className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: MUTED }}
              >
                Research domains
              </p>
              <h2
                className="mb-14 font-sans font-black leading-[1.0] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", color: INK }}
              >
                Four domains.{" "}
                <span style={{ color: RED }}>One</span> bar.
              </h2>

              <div>
                {pillars.map((p) => (
                  <div
                    key={p.n}
                    className="grid grid-cols-[3.5rem_1fr] gap-6 border-t py-8 md:grid-cols-[4rem_1fr_1.2fr] md:gap-12 md:py-10"
                    style={{ borderColor: RULE }}
                  >
                    <span className="pt-1 font-mono text-xs" style={{ color: MUTED }}>
                      {p.n}
                    </span>
                    <h3
                      className="font-sans font-bold text-lg tracking-tight"
                      style={{ color: INK }}
                    >
                      {p.label}
                    </h3>
                    <p
                      className="font-serif-display text-sm leading-relaxed"
                      style={{ color: "#5a5a52" }}
                    >
                      {p.body}
                    </p>
                  </div>
                ))}
                <div className="border-t" style={{ borderColor: RULE }} />
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ─── APPROACH CALLOUT ─── */}
        <SectionReveal amount={0.06}>
          <section
            className="border-b py-16 md:py-24"
            style={{ background: "#fff", borderColor: RULE }}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p
                    className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: MUTED }}
                  >
                    The method
                  </p>
                  <h2
                    className="font-sans font-black leading-[1.0] tracking-tight"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", color: INK }}
                  >
                    We read the code.{" "}
                    <span style={{ color: RED }}>Not</span> the pitch.
                  </h2>
                  <p
                    className="mt-6 font-serif-display text-base leading-relaxed"
                    style={{ color: "#4a4a42" }}
                  >
                    When we deploy capital it is early, concentrated, and always downstream of work
                    you can read and stress-test. Capital is secondary and selective.
                  </p>
                </div>

                {/* Method steps */}
                <div className="border" style={{ borderColor: RULE }}>
                  {[
                    {
                      n: "01",
                      title: "Research is the product",
                      body: "We publish memos, models, and datasets you can trace. Sources cited, method open, steps reproducible. No black box.",
                    },
                    {
                      n: "02",
                      title: "Deliberate scope",
                      body: "Crypto, fintech, AI, robotics—and the messy layers in between. We say no when the work doesn't match the bar.",
                    },
                    {
                      n: "03",
                      title: "Capital is downstream",
                      body: "Selective, early, concentrated. Always the last step—never a substitute for the work product.",
                    },
                  ].map((step, i, arr) => (
                    <div key={step.n}>
                      <div className="px-7 py-8 md:px-10">
                        <div className="flex gap-5">
                          <span
                            className="shrink-0 pt-0.5 font-mono text-xs"
                            style={{ color: RED }}
                          >
                            {step.n}
                          </span>
                          <div>
                            <h3
                              className="font-sans font-bold text-base tracking-tight"
                              style={{ color: INK }}
                            >
                              {step.title}
                            </h3>
                            <p
                              className="mt-2 font-serif-display text-sm leading-relaxed"
                              style={{ color: "#5a5a52" }}
                            >
                              {step.body}
                            </p>
                          </div>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="border-t" style={{ borderColor: RULE }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ─── TEAM ─── */}
        <SectionReveal amount={0.07}>
          <section
            id="team"
            className="scroll-mt-24 border-b py-16 md:py-24"
            style={{ background: PAPER, borderColor: RULE }}
          >
            <Container>
              <p
                className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: MUTED }}
              >
                Team
              </p>
              <h2
                className="mb-14 font-sans font-black leading-[1.0] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", color: INK }}
              >
                Two seats.{" "}
                <span style={{ color: RED }}>Zero</span> siloes.
              </h2>

              <StaggerOnView className="grid gap-8 md:grid-cols-2">
                {team.map((member, i) => {
                  const CardBg = i === 0 ? PixelMountain : PixelHammer;
                  return (
                    <StaggerItem key={member.handle}>
                      <article
                        className="relative flex h-full flex-col overflow-hidden border"
                        style={{ borderColor: RULE, background: "#fff" }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-25"
                          aria-hidden
                        >
                          <CardBg />
                        </div>
                        <div className="relative flex justify-center px-7 pt-7 md:justify-start">
                          <div
                            className="relative aspect-[4/5] w-[min(100%,10rem)] shrink-0 overflow-hidden ring-1 sm:w-[10.5rem] md:w-[9.25rem] lg:w-[10rem]"
                            style={{ background: "#e4e2de" } as React.CSSProperties}
                          >
                            <Image
                              src={member.image}
                              alt={`${member.handle}, ${member.role}`}
                              fill
                              sizes="(max-width: 768px) 160px, 200px"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="relative flex flex-1 flex-col px-7 pb-7 pt-6">
                          <div className="h-[2px] w-10" style={{ background: RED }} />
                          <p
                            className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em]"
                            style={{ color: INK }}
                          >
                            {member.handle}
                            <span className="mx-1.5 font-normal text-[#bbb]">·</span>
                            <span style={{ color: MUTED }}>{member.city}</span>
                          </p>
                          <p
                            className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em]"
                            style={{ color: "#bbb" }}
                          >
                            Founder
                          </p>
                          <h3
                            className="mt-3 font-sans text-lg font-bold tracking-tight"
                            style={{ color: INK }}
                          >
                            {member.role}
                          </h3>
                          <p
                            className="mt-3 flex-1 font-serif-display text-sm leading-relaxed"
                            style={{ color: "#5a5a52" }}
                          >
                            {member.blurb}
                          </p>
                          <a
                            href={member.xUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex w-fit font-mono text-[10px] uppercase tracking-[0.16em] underline underline-offset-4 transition-opacity hover:opacity-60"
                            style={{ color: MUTED, textDecorationColor: RULE }}
                          >
                            Profile on X ↗
                          </a>
                        </div>
                      </article>
                    </StaggerItem>
                  );
                })}
              </StaggerOnView>
            </Container>
          </section>
        </SectionReveal>

        {/* ─── CONTACT ─── */}
        <SectionReveal amount={0.07}>
          <section
            id="contact"
            className="scroll-mt-24 py-20 md:py-28"
            style={{ background: INK }}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p
                    className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: "#555" }}
                  >
                    Contact
                  </p>
                  <h2
                    className="font-sans font-black leading-[1.0] tracking-tight"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", color: PAPER }}
                  >
                    Building at the{" "}
                    <span style={{ color: RED }}>frontier</span>?
                  </h2>
                  <p
                    className="mt-5 font-serif-display text-base leading-relaxed md:text-lg"
                    style={{ color: "#8a8880" }}
                  >
                    Share the problem, what&apos;s already built, and what you want
                    pressure-tested. We reply when the research can add real leverage—capital is
                    downstream and optional.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={SOCIAL_X_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-opacity hover:opacity-80"
                      style={{ background: PAPER, color: INK }}
                    >
                      Message on X
                    </a>
                    <a
                      href="mailto:hello@efimov.xyz"
                      className="inline-flex items-center border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-colors hover:border-white"
                      style={{ borderColor: "#2a2a2a", color: PAPER }}
                    >
                      Email us
                    </a>
                  </div>
                </div>
                <div className="border p-8 md:p-10" style={{ borderColor: "#1e1e1e" }}>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "#555" }}
                  >
                    Operating note
                  </p>
                  <p
                    className="mt-6 font-sans text-xl font-bold leading-snug"
                    style={{ color: PAPER }}
                  >
                    Frontier tech rewards teams that can show mechanism, not just momentum.
                  </p>
                  <p
                    className="mt-4 font-serif-display text-base leading-relaxed"
                    style={{ color: "#8a8880" }}
                  >
                    Our default output is research you can fork—not a deck you admire once. Capital
                    is downstream and optional.
                  </p>
                </div>
              </div>
            </Container>
          </section>
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}

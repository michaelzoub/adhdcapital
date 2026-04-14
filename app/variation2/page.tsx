import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { BackgroundBeams } from "@/components/backgrounds/BackgroundBeams";
import { FloatingPathsAv2 } from "./av2-paths";
import PixelBlast from "@/components/backgrounds/PixelBlast";
import PixelHammer from "@/components/backgrounds/PixelHammer";
import PixelMountain from "@/components/backgrounds/PixelMountain";
import Threads from "@/components/backgrounds/Threads";
import { TopographyBackground } from "@/components/backgrounds/TopographyBackground";
import { FlickeringGrid } from "@/components/effects/FlickeringGrid";
import { ScanlineReveal } from "@/components/effects/ScanlineReveal";
import { NoiseGrain } from "@/components/effects/NoiseGrain";
import { CounterTicker } from "@/components/effects/CounterTicker";
import { GlyphScramble } from "@/components/effects/GlyphScramble";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  HeroColumnStagger,
  HeroEntrance,
  HeroLineItem,
  HeroStaggerChild,
  HeroStaggerRoot,
} from "@/components/hero/HeroEntrance";
import { ScrollMouseHint } from "@/components/hero/ScrollMouseHint";
import { SectionReveal } from "@/components/hero/SectionReveal";
import { StaggerItem, StaggerOnView } from "@/components/hero/StaggerOnView";
import { Ripple } from "@/registry/magicui/ripple";
import { Container } from "@/components/ui";
import Earth from "@/components/ui/globe";
import { SOCIAL_X_URL } from "@/lib/site";

import { Av2Marquee } from "./av2-marquee";

export const metadata: Metadata = {
  title: "Meridia — Avant-garde",
  description:
    "Meridia: a bold, future-forward research collective. Crypto, fintech, deep tech. Evidence over narrative.",
  robots: { index: false, follow: true },
};

const STRIP_MANDATE = "Crypto, fintech, deep tech, and anything in between";

const marqueeLabels = [
  { label: "Founders", voice: "serif" },
  { label: "Crypto", voice: "accent" },
  { label: "Fintech", voice: "mono" },
  { label: "Deep tech", voice: "serif" },
  { label: "Spearheaders", voice: "sans" },
  { label: "Protocols", voice: "accent" },
  { label: "DAOs", voice: "serif" },
  { label: "Labs", voice: "mono" },
  { label: "Infrastructure", voice: "mono" },
  { label: "Token teams", voice: "sans" },
  { label: "Frontier AI", voice: "accent" },
  { label: "Robotics", voice: "mono" },
  { label: "Custody & wallets", voice: "mono" },
  { label: "Solo researchers", voice: "serif" },
  { label: "Institutions", voice: "sans" },
  { label: "Public memos", voice: "mono" },
  { label: "On-chain datasets", voice: "mono" },
  { label: "Protocol reviews", voice: "accent" },
  { label: "Open methodologies", voice: "mono" },
  { label: "Selective capital", voice: "serif" },
] as const;

const focusSteps = [
  {
    n: "01",
    title: "Research is the product",
    body: "We publish memos, models, and datasets you can trace—protocol economics, security assumptions, frontier compute, and explicit what-has-to-be-true statements. The method stays inspectable.",
  },
  {
    n: "02",
    title: "Deliberate scope",
    body: "Crypto networks, fintech rails, L1/L2 and DeFi plumbing, wallets and infra, AI systems, robotics, and the messy layers in between—we say no when the work doesn't match the bar.",
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
      "Graduate training with VC exposure—deep on analytics, modelling, and company analysis. Former owner of a contracting business; brings operator judgment to diligence.",
    Bg: PixelMountain,
  },
  {
    handle: "Kafka",
    image: "/kafka.jpg",
    role: "Technical research",
    city: "NYC",
    xUrl: "https://x.com/wenkafka",
    blurb:
      "Computer science background; hands-on engineering with projects spanning YC- and Paradigm-style stacks. Codes, reviews, and stress-tests assumptions.",
    Bg: PixelHammer,
  },
];

/* ─── Warm palette ─── */
const WARM_THREAD_COLOR: [number, number, number] = [212 / 255, 160 / 255, 76 / 255];
const WARM_PIXEL_ACCENT: [number, number, number] = [201, 148, 80];

const BG_ROOT = "#14100c";
const BG_DARK = "#1a140e";
const BG_MID = "#211a12";
const BG_SURFACE = "#251e15";
const BG_CARD = "#2c2318";
const AMBER = "#d4a44c";
const AMBER_LIGHT = "#e8c07a";
const STONE_TEXT = "#c8b49a";
const WARM_WHITE = "#f0e8d8";

const sectionNavItems = [
  { href: "/variation2#thesis", label: "Thesis" },
  { href: "/variation2#glance", label: "Approach" },
  { href: "/variation2#team", label: "Team" },
  { href: "/writing", label: "Writing" },
  { href: "/variation2#contact", label: "Contact" },
] as const;

/* ─── Sub-components (server-renderable) ─── */

function Av2SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.28em]"
      style={{ color: AMBER }}
    >
      {children}
    </p>
  );
}

function Av2Tag({
  href,
  children,
  showArrow,
}: {
  href?: string;
  children: ReactNode;
  showArrow?: boolean;
}) {
  const cls =
    "inline-flex items-center gap-1.5 border border-amber-700/45 bg-amber-900/15 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-amber-300/90 transition-colors hover:border-amber-600/60 hover:text-amber-200";
  return href ? (
    <a href={href} className={cls}>
      {children}
      {showArrow && <span aria-hidden>↗</span>}
    </a>
  ) : (
    <span className={cls}>
      {children}
      {showArrow && <span aria-hidden>↗</span>}
    </span>
  );
}

function HeroResearchPanel() {
  const rows = [
    {
      label: "Primary outputs",
      body: "Long-form memos, scenario tables, and dashboards you can reproduce.",
    },
    {
      label: "Domains",
      body: "On-chain and fintech rails, L1/L2 economics, DeFi & custody risk, wallets & infra, frontier AI, robotics.",
    },
    {
      label: "Methods",
      body: "Chain-native metrics, adversarial reviews, agent-assisted synthesis, open methodology notes.",
    },
  ];

  return (
    <div
      className="relative w-full border"
      style={{ borderColor: "rgba(212,160,76,0.25)", background: BG_CARD }}
    >
      <div
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ background: `linear-gradient(to bottom, ${AMBER}, rgba(212,160,76,0.15))` }}
        aria-hidden
      />
      <div className="px-6 py-6 pl-9">
        <Av2Tag>Research practice</Av2Tag>
        <h3
          className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: AMBER_LIGHT }}
        >
          What we actually ship
        </h3>
        <p className="mt-2 font-serif-display text-sm leading-relaxed" style={{ color: STONE_TEXT }}>
          No abstract lattice—this is the work product: research artifacts first, everything else
          follows.
        </p>
        <ul
          className="mt-5 space-y-4 pt-5"
          style={{ borderTop: "1px solid rgba(212,160,76,0.15)" }}
        >
          {rows.map((row) => (
            <li key={row.label}>
              <p
                className="font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: AMBER }}
              >
                {row.label}
              </p>
              <p
                className="mt-1 font-serif-display text-sm leading-snug"
                style={{ color: WARM_WHITE }}
              >
                {row.body}
              </p>
            </li>
          ))}
        </ul>
        <div
          className="mt-5 space-y-0.5 pt-4"
          style={{ borderTop: "1px solid rgba(212,160,76,0.12)" }}
        >
          <div className="h-px w-full max-w-[280px]" style={{ background: "rgba(212,160,76,0.3)" }} />
          <div className="h-px w-full max-w-[220px]" style={{ background: "rgba(212,160,76,0.18)" }} />
          <div className="h-px w-full max-w-[160px]" style={{ background: "rgba(212,160,76,0.1)" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Ticker strip ─── */
const tickerItems = [
  "Public memos",
  "On-chain datasets",
  "Protocol reviews",
  "Fintech & custody",
  "Risk scenarios",
  "Primary research",
  "Open methodologies",
  "Hardware–software",
  "Long-form notes",
  "Selective capital",
];

function VerticalTicker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div
      className="relative overflow-hidden border-b border-t py-3"
      style={{ borderColor: "rgba(212,160,76,0.18)", background: BG_ROOT }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
        style={{ background: `linear-gradient(to right, ${BG_ROOT}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
        style={{ background: `linear-gradient(to left, ${BG_ROOT}, transparent)` }}
      />
      <div className="flex w-max animate-marquee gap-16 font-mono text-[11px] font-medium uppercase tracking-[0.18em] md:gap-20">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="whitespace-nowrap"
            style={{
              background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LIGHT})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function Variation2Page() {
  return (
    <div
      className="relative"
      style={{ background: BG_ROOT, color: WARM_WHITE, "--av2-bg": BG_ROOT } as React.CSSProperties}
    >
      <Header />
      <main className="flex-1">

        {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
        <section
          className="relative flex min-h-[calc(100svh-6.5rem)] flex-col overflow-hidden md:min-h-[calc(100svh-7rem)]"
          style={{ background: BG_ROOT }}
        >
          <TopographyBackground
            lineCount={28}
            lineColor="rgba(180, 120, 50, 0.22)"
            backgroundColor={BG_ROOT}
            speed={0.6}
            strokeWidth={0.5}
          />
          <NoiseGrain opacity={0.06} refreshRate={70} scale={1} />

          <HeroEntrance>
            <Container className="relative z-[1] flex flex-1 flex-col py-10 pb-0 md:py-14">
              <HeroStaggerRoot className="flex flex-1 flex-col">
                <HeroStaggerChild className="grid flex-1 grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6">

                  {/* Left column */}
                  <div className="flex gap-5 md:gap-6 lg:col-span-7">
                    <div
                      className="hidden w-px shrink-0 md:block md:min-h-[240px]"
                      style={{
                        background: `linear-gradient(to bottom, ${AMBER}, rgba(212,160,76,0.1), transparent)`,
                      }}
                      aria-hidden
                    />
                    <HeroColumnStagger className="min-w-0 flex-1">
                      <HeroLineItem>
                        <p
                          className="font-mono text-[11px] uppercase tracking-[0.28em]"
                          style={{ color: AMBER }}
                        >
                          Meridia · Research collective
                        </p>
                      </HeroLineItem>

                      <HeroLineItem className="mt-5">
                        <div
                          className="mb-3 inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
                          style={{
                            borderColor: "rgba(212,160,76,0.3)",
                            background: "rgba(212,160,76,0.06)",
                            color: STONE_TEXT,
                          }}
                        >
                          <span style={{ color: AMBER }} aria-hidden>◈</span>
                          Evidence beats narrative
                        </div>
                        <h1
                          className="max-w-xl font-serif-display leading-[1.04] tracking-tight"
                          style={{ fontSize: "clamp(2.4rem, 5.8vw, 4rem)", color: WARM_WHITE }}
                        >
                          A future worth{" "}
                          <span
                            className="font-semibold not-italic"
                            style={{
                              background: `linear-gradient(115deg, ${AMBER}, ${AMBER_LIGHT})`,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            building
                          </span>
                          ,{" "}
                          <br className="hidden sm:block" />
                          one memo at a time
                        </h1>
                        <p
                          className="mt-3 font-sans text-base font-medium uppercase tracking-[0.12em] md:text-lg"
                          style={{ color: STONE_TEXT }}
                        >
                          A research firm for {STRIP_MANDATE.toLowerCase()}
                        </p>
                      </HeroLineItem>

                      <HeroLineItem className="mt-5">
                        <p
                          className="max-w-md font-serif-display text-base leading-relaxed md:text-lg"
                          style={{ color: "#a89880" }}
                        >
                          We are not here to intimidate—we publish, iterate, and correct in public.
                          Capital follows rigor, quietly.
                        </p>
                      </HeroLineItem>

                      <HeroLineItem className="mt-8">
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="/variation2#contact"
                            className="inline-flex items-center justify-center gap-2 border-0 px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
                            style={{ background: AMBER, color: BG_ROOT }}
                          >
                            Collaborate
                          </a>
                          <a
                            href="/variation2#thesis"
                            className="inline-flex items-center justify-center gap-2 border px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors"
                            style={{
                              borderColor: "rgba(212,160,76,0.4)",
                              color: AMBER_LIGHT,
                            }}
                          >
                            Read our approach
                          </a>
                        </div>
                      </HeroLineItem>

                      <HeroLineItem>
                        <ScrollMouseHint />
                      </HeroLineItem>
                    </HeroColumnStagger>
                  </div>

                  {/* Right: research panel */}
                  <HeroStaggerChild className="relative w-full lg:col-span-5 lg:mt-4">
                    <div
                      className="pointer-events-none absolute -right-2 -top-2 hidden h-14 w-14 lg:block"
                      style={{
                        borderTop: `2px solid ${AMBER}`,
                        borderRight: `2px solid ${AMBER}`,
                        opacity: 0.4,
                      }}
                      aria-hidden
                    />
                    <HeroResearchPanel />
                  </HeroStaggerChild>
                </HeroStaggerChild>

                {/* Marquee */}
                <HeroStaggerChild
                  className="mt-14 pt-10 md:mt-16 md:pt-12"
                  style={{ borderTop: "1px solid rgba(212,160,76,0.15)" }}
                >
                  <p
                    className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.28em] md:text-[11px]"
                    style={{ color: STONE_TEXT }}
                  >
                    We work alongside
                  </p>
                  <Av2Marquee labels={marqueeLabels} fadeFromColor={BG_ROOT} />
                </HeroStaggerChild>
              </HeroStaggerRoot>
            </Container>
          </HeroEntrance>
        </section>

        {/* ═══ TICKER ════════════════════════════════════════════════════════ */}
        <VerticalTicker />

        {/* ═══ WHY WE EXIST ══════════════════════════════════════════════════ */}
        <SectionReveal amount={0.08}>
          <section
            id="ethos"
            className="relative border-b py-16 md:py-28"
            style={{ borderColor: "rgba(212,160,76,0.15)", background: BG_DARK }}
          >
            <NoiseGrain opacity={0.04} refreshRate={100} scale={1.5} />

            {/* Decorative large numeral */}
            <div
              className="pointer-events-none absolute right-0 top-0 select-none overflow-hidden"
              aria-hidden
            >
              <span
                className="block font-mono font-bold"
                style={{
                  fontSize: "clamp(8rem, 20vw, 18rem)",
                  color: "rgba(212,160,76,0.04)",
                  lineHeight: 1,
                  transform: "translateY(-10%)",
                }}
              >
                01
              </span>
            </div>

            <Container className="relative z-[1]">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <Av2SectionLabel>Why we exist</Av2SectionLabel>
                  <h2
                    className="font-sans font-semibold leading-[1.1] tracking-tight"
                    style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)", color: WARM_WHITE }}
                  >
                    The best outcomes in crypto, fintech, deep tech are{" "}
                    <span className="font-serif-display italic" style={{ color: AMBER_LIGHT }}>
                      under-published
                    </span>
                    , not under-hyped.
                  </h2>
                </div>

                <div className="flex flex-col justify-end gap-6 lg:col-span-5">
                  {[
                    { label: "Research outputs published", to: 12, suffix: "+" },
                    { label: "Domains covered", to: 8, suffix: undefined },
                    { label: "Years combined experience", to: 15, suffix: "+" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-end gap-4 border-b pb-4"
                      style={{ borderColor: "rgba(212,160,76,0.12)" }}
                    >
                      <CounterTicker
                        to={stat.to}
                        suffix={stat.suffix}
                        className="font-sans text-4xl font-bold tabular-nums md:text-5xl"
                        style={{ color: AMBER }}
                      />
                      <p
                        className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] leading-snug"
                        style={{ color: STONE_TEXT }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote box */}
              <div className="mt-16">
                <ScanlineReveal delay={0.1} barColor={AMBER}>
                  <div
                    className="relative overflow-hidden border p-6 md:p-10"
                    style={{
                      borderStyle: "dashed",
                      borderColor: "rgba(212,160,76,0.3)",
                      background: BG_SURFACE,
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
                      <Ripple tone="warm" />
                    </div>
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                      style={{ background: `linear-gradient(to top, ${BG_SURFACE}, transparent)` }}
                      aria-hidden
                    />
                    <p
                      className="relative max-w-3xl font-serif-display text-lg leading-relaxed md:text-xl"
                      style={{ color: "#d8c8ae" }}
                    >
                      We bias toward teams who want reviewers that read code, cite sources, and write the
                      uncomfortable questions into the appendix—whether or not a check ever follows.
                    </p>
                    <nav className="relative mt-8 flex flex-wrap gap-2" aria-label="On this page">
                      {sectionNavItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors"
                          style={{ borderColor: "rgba(212,160,76,0.3)", color: STONE_TEXT }}
                        >
                          {item.label}
                          <span aria-hidden style={{ color: AMBER }}>↗</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </ScanlineReveal>
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ═══ AT A GLANCE ═══════════════════════════════════════════════════ */}
        <SectionReveal amount={0.08} delay={0.04}>
          <section
            id="glance"
            className="scroll-mt-24 relative overflow-hidden border-b py-16 md:py-28"
            style={{ borderColor: "rgba(212,160,76,0.15)", background: BG_MID }}
          >
            <FloatingPathsAv2 />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${BG_MID} 30%, rgba(33,26,18,0.92) 100%)`,
              }}
            />

            <Container className="relative z-[1]">
              <div className="max-w-3xl">
                <Av2SectionLabel>At a glance</Av2SectionLabel>
                <h2
                  className="font-sans font-semibold tracking-tight"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
                    color: WARM_WHITE,
                    lineHeight: 1.12,
                  }}
                >
                  One research desk,{" "}
                  <span style={{ color: AMBER }}>rare capital</span>, no touring roadshow.
                </h2>
                <p
                  className="mt-4 max-w-2xl font-serif-display text-base leading-relaxed md:text-lg"
                  style={{ color: STONE_TEXT }}
                >
                  One bar, shared definitions of proof, and artifacts you can stress-test. Memos and
                  models first—vanity decks are the exception.
                </p>
              </div>

              <div className="mt-12 grid gap-0 md:mt-14 md:grid-cols-3">
                {/* Collective */}
                <div
                  className="relative overflow-hidden border p-8"
                  style={{ borderColor: "rgba(212,160,76,0.2)", background: BG_CARD }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
                    <PixelBlast
                      variant="square"
                      pixelSize={2}
                      color="#5c3a14"
                      patternScale={2}
                      patternDensity={1}
                      pixelSizeJitter={0}
                      enableRipples
                      rippleSpeed={0.38}
                      rippleThickness={0.12}
                      rippleIntensityScale={1.4}
                      liquid={false}
                      speed={0.45}
                      edgeFade={0.3}
                      transparent
                    />
                  </div>
                  <div className="relative">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: STONE_TEXT }}>
                      Collective
                    </p>
                    <p className="mt-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: WARM_WHITE }}>
                      One research bar
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: AMBER }}>
                      Two seats · one standard
                    </p>
                    <p className="mt-4 font-serif-display text-sm leading-relaxed" style={{ color: STONE_TEXT }}>
                      Two seats covering analytics and technical systems—one standard of rigor, no
                      siloed opinions without work product.
                    </p>
                  </div>
                </div>

                {/* Globe */}
                <div
                  className="relative overflow-hidden border-y border-l-0 border-r-0 p-8 md:border md:border-l-0 md:border-r-0"
                  style={{ borderColor: "rgba(212,160,76,0.2)", background: BG_CARD }}
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="relative flex size-full items-center justify-center overflow-hidden px-8 pt-4 pb-20">
                      <Earth className="w-full max-w-[460px] opacity-25" />
                    </div>
                  </div>
                  <div className="relative z-[1]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: STONE_TEXT }}>
                      Geography
                    </p>
                    <p className="mt-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: WARM_WHITE }}>
                      Singapore <span style={{ color: STONE_TEXT }}>×1</span> · NYC{" "}
                      <span style={{ color: STONE_TEXT }}>×1</span>
                    </p>
                    <p className="mt-4 font-serif-display text-sm leading-relaxed" style={{ color: STONE_TEXT }}>
                      Built across Asia and North America—remote-first review cycles with on-site time
                      when hardware or lab work demands it.
                    </p>
                  </div>
                </div>

                {/* Mandate */}
                <div
                  className="relative overflow-hidden border p-8"
                  style={{ borderColor: "rgba(212,160,76,0.2)", background: BG_CARD }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden>
                    <Threads color={WARM_THREAD_COLOR} amplitude={1.2} enableMouseInteraction />
                  </div>
                  <div className="relative">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: STONE_TEXT }}>
                      Mandate
                    </p>
                    <p className="mt-4 font-sans text-lg font-semibold leading-snug tracking-tight md:text-xl" style={{ color: WARM_WHITE }}>
                      {STRIP_MANDATE}
                    </p>
                    <p className="mt-4 font-serif-display text-sm leading-relaxed" style={{ color: STONE_TEXT }}>
                      L1/L2 and DeFi plumbing, fintech and custody rails, wallets and infra, frontier
                      AI, robotics. If it falls outside that perimeter, we are not the right desk.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ═══ THESIS ════════════════════════════════════════════════════════ */}
        <SectionReveal amount={0.07}>
          <section
            id="thesis"
            className="scroll-mt-24 border-b py-16 md:py-28"
            style={{ borderColor: "rgba(212,160,76,0.15)", background: BG_SURFACE }}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
                <div
                  className="min-w-0 lg:border-r lg:pr-12"
                  style={{ borderStyle: "dashed", borderColor: "rgba(212,160,76,0.2)" }}
                >
                  <Av2SectionLabel>Research thesis</Av2SectionLabel>
                  <h2
                    className="font-sans font-bold tracking-tight"
                    style={{
                      fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                      background: `linear-gradient(115deg, ${AMBER}, ${AMBER_LIGHT})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <GlyphScramble text="MERIDIA" />
                  </h2>
                  <p
                    className="mt-4 font-serif-display text-base leading-relaxed"
                    style={{ color: "#c8b49a" }}
                  >
                    When we deploy capital it is{" "}
                    <span className="font-semibold" style={{ color: WARM_WHITE }}>
                      early, concentrated
                    </span>
                    , and always downstream of work you can read and stress-test.
                  </p>

                  <div
                    className="relative mt-5 min-h-[120px] overflow-hidden border"
                    style={{ borderColor: "rgba(212,160,76,0.25)", background: BG_CARD }}
                  >
                    <FlickeringGrid
                      className="absolute inset-0 min-h-full"
                      color={AMBER}
                      squareSize={3}
                      gridGap={7}
                      flickerChance={0.05}
                      maxOpacity={0.2}
                    />
                    <div className="relative z-[1] px-4 py-5">
                      <p
                        className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: AMBER }}
                      >
                        AI on the desk
                      </p>
                      <p
                        className="mt-2 font-serif-display text-sm leading-relaxed"
                        style={{ color: STONE_TEXT }}
                      >
                        We spearhead research workflows with{" "}
                        <span className="font-semibold" style={{ color: WARM_WHITE }}>
                          AI agents
                        </span>
                        —custom pipelines for ingestion, stress-testing, and publication—so rigor
                        scales without becoming opaque.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <Av2Tag href="/writing">Thesis</Av2Tag>
                    <Av2Tag
                      showArrow
                      href="mailto:hello@efimov.xyz?subject=Memo%20request%20%E2%80%94%20Meridia"
                    >
                      Request memo
                    </Av2Tag>
                  </div>
                </div>

                <StaggerOnView id="work" className="scroll-mt-24 lg:pl-12">
                  <Av2SectionLabel>Approach</Av2SectionLabel>
                  <div
                    className="border"
                    style={{
                      borderStyle: "dashed",
                      borderColor: "rgba(212,160,76,0.25)",
                      background: BG_CARD,
                    }}
                  >
                    {focusSteps.map((step, i) => (
                      <div key={step.n}>
                        <StaggerItem>
                          <div className="px-7 py-8 md:px-10 md:py-9">
                            <div className="flex gap-5 md:gap-6">
                              <span
                                className="shrink-0 font-mono text-xs tabular-nums md:text-sm"
                                style={{ color: AMBER }}
                              >
                                {step.n}
                              </span>
                              <div className="min-w-0">
                                <h3
                                  className="font-sans text-base font-semibold tracking-tight"
                                  style={{ color: WARM_WHITE }}
                                >
                                  {step.title}
                                </h3>
                                <p
                                  className="mt-2 font-serif-display text-sm leading-relaxed"
                                  style={{ color: STONE_TEXT }}
                                >
                                  {step.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        </StaggerItem>
                        {i < focusSteps.length - 1 ? (
                          <div
                            className="relative flex min-h-12 items-center justify-center md:min-h-14"
                            aria-hidden
                          >
                            <div
                              className="absolute inset-x-0 top-1/2 border-t"
                              style={{ borderStyle: "dashed", borderColor: "rgba(212,160,76,0.2)" }}
                            />
                            <div
                              className="relative border px-3 py-1"
                              style={{ borderColor: "rgba(212,160,76,0.3)", background: BG_CARD }}
                            >
                              <span style={{ color: AMBER }}>↓</span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </StaggerOnView>
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ═══ TEAM ══════════════════════════════════════════════════════════ */}
        <SectionReveal amount={0.08}>
          <section
            id="team"
            className="scroll-mt-24 border-b py-16 md:py-28"
            style={{ borderColor: "rgba(212,160,76,0.15)", background: BG_DARK }}
          >
            <Container>
              <Av2SectionLabel>Team</Av2SectionLabel>
              <h2
                className="max-w-2xl font-sans font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", color: WARM_WHITE }}
              >
                Two seats.{" "}
                <span style={{ color: AMBER }}>One research bar</span>.
              </h2>
              <p
                className="mt-3 max-w-2xl font-serif-display text-sm leading-relaxed md:text-base"
                style={{ color: STONE_TEXT }}
              >
                The people behind the desk—operators and researchers who publish before they pitch.
              </p>

              <StaggerOnView className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-2">
                {team.map((member, i) => {
                  const CardBg = member.Bg;
                  return (
                    <StaggerItem key={member.handle}>
                      <article
                        className="relative flex h-full flex-col overflow-hidden border"
                        style={{
                          borderColor: "rgba(212,160,76,0.2)",
                          background: BG_CARD,
                          borderRight: i === 0 ? "none" : undefined,
                        }}
                      >
                        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
                          <CardBg accentRgb={WARM_PIXEL_ACCENT} />
                        </div>
                        <div className="relative flex justify-center px-7 pt-7 md:justify-start">
                          <div
                            className="relative aspect-[4/5] w-[min(100%,10rem)] shrink-0 overflow-hidden sm:w-[10.5rem] md:w-[9.25rem] lg:w-[10rem]"
                            style={{ border: "1px solid rgba(212,160,76,0.25)" }}
                          >
                            <Image
                              src={member.image}
                              alt={`${member.handle}, ${member.role}`}
                              fill
                              sizes="(max-width: 768px) 160px, 200px"
                              className="object-cover"
                            />
                            <div
                              className="pointer-events-none absolute inset-0"
                              style={{ background: "rgba(180,100,20,0.08)" }}
                              aria-hidden
                            />
                          </div>
                        </div>
                        <div className="relative flex flex-1 flex-col px-7 pb-7 pt-6">
                          <div className="h-px w-10" style={{ background: AMBER }} />
                          <p
                            className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em]"
                            style={{ color: WARM_WHITE }}
                          >
                            {member.handle}
                            <span className="mx-1.5 font-normal" style={{ color: STONE_TEXT }}>·</span>
                            <span style={{ color: STONE_TEXT }}>{member.city}</span>
                          </p>
                          <p
                            className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em]"
                            style={{ color: STONE_TEXT }}
                          >
                            Founder
                          </p>
                          <h3
                            className="mt-3 font-sans text-lg font-semibold tracking-tight"
                            style={{ color: WARM_WHITE }}
                          >
                            {member.role}
                          </h3>
                          <p
                            className="mt-3 flex-1 font-serif-display text-sm leading-relaxed"
                            style={{ color: STONE_TEXT }}
                          >
                            {member.blurb}
                          </p>
                          <a
                            href={member.xUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex w-fit font-mono text-[10px] uppercase tracking-[0.16em] underline underline-offset-4 transition-colors"
                            style={{
                              color: STONE_TEXT,
                              textDecorationColor: "rgba(212,160,76,0.3)",
                            }}
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

        {/* ═══ CONTACT ═══════════════════════════════════════════════════════ */}
        <SectionReveal amount={0.08}>
          <section
            id="contact"
            className="scroll-mt-24 py-20 md:py-32"
            style={{ background: BG_ROOT }}
          >
            <Container>
              <div
                className="mb-12 border-b pb-10"
                style={{ borderColor: "rgba(212,160,76,0.15)" }}
              >
                <Av2SectionLabel>Contact</Av2SectionLabel>
                <h2
                  className="font-sans font-bold leading-[1.06] tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: WARM_WHITE }}
                >
                  Building in{" "}
                  <span style={{ color: AMBER }}>crypto</span>,{" "}
                  <span style={{ color: AMBER }}>fintech</span>,{" "}
                  <br className="hidden sm:block" />
                  <span style={{ color: AMBER }}>deep tech</span>?
                </h2>
                <p
                  className="mt-6 max-w-xl font-serif-display text-base leading-relaxed md:text-lg"
                  style={{ color: STONE_TEXT }}
                >
                  Share the problem, what is already built, and what you want pressure-tested. We reply
                  when the research can add real leverage—capital is downstream and optional.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={SOCIAL_X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-0 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
                    style={{ background: AMBER, color: BG_ROOT }}
                  >
                    Message on X
                  </a>
                  <a
                    href="mailto:hello@efimov.xyz"
                    className="inline-flex items-center justify-center gap-2 border px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors"
                    style={{ borderColor: "rgba(212,160,76,0.4)", color: AMBER_LIGHT }}
                  >
                    Email us
                  </a>
                </div>
              </div>

              {/* Operating note */}
              <article
                className="relative overflow-hidden border"
                style={{
                  borderStyle: "dashed",
                  borderColor: "rgba(212,160,76,0.3)",
                  background: BG_DARK,
                }}
              >
                <BackgroundBeams tone="terracotta" className="opacity-80" />
                <NoiseGrain opacity={0.05} refreshRate={90} scale={1.5} />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(60,30,5,0.3), transparent, rgba(30,15,5,0.5))",
                  }}
                  aria-hidden
                />
                <div className="relative z-[1] p-8 md:p-12">
                  <p
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: STONE_TEXT }}
                  >
                    Operating note
                  </p>
                  <p
                    className="mt-6 font-sans text-xl font-semibold leading-snug md:text-2xl"
                    style={{ color: WARM_WHITE }}
                  >
                    Frontier tech rewards teams that can show mechanism, not just momentum. Our default
                    output is research you can fork—not a deck you admire once.
                  </p>
                  <p
                    className="mt-4 font-serif-display text-base leading-relaxed"
                    style={{ color: STONE_TEXT }}
                  >
                    When we allocate, it is narrow, repeatable, and always late in the process—never a
                    substitute for the work product.
                  </p>
                </div>
              </article>
            </Container>
          </section>
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}

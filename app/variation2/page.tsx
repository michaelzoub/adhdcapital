import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { AtAGlanceFloatingPaths } from "@/components/backgrounds/FloatingPaths";
import PixelBlast from "@/components/backgrounds/PixelBlast";
import PixelHammer from "@/components/backgrounds/PixelHammer";
import PixelMountain from "@/components/backgrounds/PixelMountain";
import Threads from "@/components/backgrounds/Threads";
import { TopographyBackground } from "@/components/backgrounds/TopographyBackground";
import { BackgroundBeams } from "@/components/backgrounds/BackgroundBeams";
import { FlickeringGrid } from "@/components/effects/FlickeringGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  HeroColumnStagger,
  HeroEntrance,
  HeroLineItem,
  HeroStaggerChild,
  HeroStaggerRoot,
} from "@/components/hero/HeroEntrance";
import type { PartnerMarqueeItem } from "@/components/hero/PartnersMarquee";
import { ScrollMouseHint } from "@/components/hero/ScrollMouseHint";
import { SectionReveal } from "@/components/hero/SectionReveal";
import { StaggerItem, StaggerOnView } from "@/components/hero/StaggerOnView";
import { Ripple } from "@/registry/magicui/ripple";
import { Button, Container, Tag } from "@/components/ui";
import Earth from "@/components/ui/globe";
import { TextReveal } from "@/components/effects/TextReveal";
import { CountUp } from "@/components/effects/CountUp";
import { MarchingBorder } from "@/components/effects/MarchingBorder";
import { NoisePlane } from "@/components/effects/NoisePlane";
import { SOCIAL_X_URL } from "@/lib/site";

import { AvantgardeMarquee } from "./avant-marquee";

export const metadata: Metadata = {
  title: "Meridia — Avantgarde",
  description:
    "Meridia: research-led, forward-facing. A warm, avantgarde take on how the future gets built—one traceable memo at a time.",
  robots: { index: false, follow: true },
};

/* ─────────────────────────────────────────── constants ──────────────── */

const STRIP_MANDATE = "Crypto, fintech, deep tech, and anything in between";

const partnersMarqueeLabels = [
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
] as const satisfies readonly PartnerMarqueeItem[];

const researchLabels = [
  "Public memos",
  "On-chain datasets",
  "Protocol reviews",
  "Open methodologies",
  "Long-form notes",
  "Selective capital",
] as const;

const combinedLabels = [
  ...partnersMarqueeLabels,
  ...researchLabels.map((label) => ({ label, voice: "mono" as const })),
] as const satisfies readonly PartnerMarqueeItem[];

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
  },
  {
    handle: "Kafka",
    image: "/kafka.jpg",
    role: "Technical research",
    city: "NYC",
    xUrl: "https://x.com/wenkafka",
    blurb:
      "Computer science background; hands-on engineering with projects spanning YC- and Paradigm-style stacks. Codes, reviews, and stress-tests assumptions.",
  },
];

const WARM_PIXEL_ACCENT: [number, number, number] = [196, 130, 50];

const avantNav = [
  { href: "/variation2#thesis", label: "Thesis" },
  { href: "/variation2#glance", label: "Glance" },
  { href: "/variation2#team", label: "Team" },
  { href: "/writing", label: "Writing" },
  { href: "/variation2#contact", label: "Contact" },
] as const;

/* ─────────────────────────────────────────── sub-components ─────────── */

function AvLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#7c4a00]/80">
      {children}
    </p>
  );
}

function AvSectionNav() {
  return (
    <nav className="mt-8 flex flex-wrap gap-2" aria-label="On this page">
      {avantNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="inline-flex items-center gap-1.5 border border-[#c45c00]/40 bg-[#fff8ee]/80 px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#7c4a00] transition-colors hover:border-[#c45c00]/70 hover:bg-[#fff0d9] hover:text-[#1a0f00]"
        >
          {item.label}
          <span aria-hidden className="text-[#c45c00]/70">↗</span>
        </Link>
      ))}
    </nav>
  );
}

/** Research credentials panel — right column of hero. */
function AvHeroPanel() {
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
      body: "Chain-native metrics, adversarial reviews, agent-assisted synthesis, and open methodology notes.",
    },
  ];

  return (
    <MarchingBorder
      className="w-full max-w-xl lg:ml-auto"
      innerClassName="bg-gradient-to-br from-[#fffbf4] via-[#fff4e0] to-[#fde8c4] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
      color="rgba(196,92,0,0.5)"
      dashArray="10 7"
      duration={16}
    >
      <NoisePlane opacity={0.03} />
      <div className="relative border-l-[3px] border-[#c45c00] pl-5">
        <span className="inline-block border border-[#c45c00]/30 bg-[#fff0d9] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#7c4a00]">
          Research practice
        </span>
        <h3 className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a0f00]">
          What we actually ship
        </h3>
        <p className="mt-2 font-serif-display text-sm leading-relaxed text-[#4a3010]">
          No abstract lattice—this is the work product: research artifacts first, everything else follows.
        </p>
        <ul className="mt-5 space-y-4 border-t border-[#c45c00]/20 pt-5">
          {rows.map((row) => (
            <li key={row.label}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c45c00]/90">
                {row.label}
              </p>
              <p className="mt-1 font-serif-display text-sm leading-snug text-[#1a0f00]">{row.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 space-y-0.5 border-t border-[#c45c00]/15 pt-4">
          <div className="h-px w-full max-w-[280px] bg-[#c45c00]/30" />
          <div className="h-px w-full max-w-[220px] bg-[#c45c00]/20" />
          <div className="h-px w-full max-w-[160px] bg-[#c45c00]/12" />
        </div>
      </div>
    </MarchingBorder>
  );
}

/** Horizontal ticker with warm amber gradient labels. */
function AvTicker() {
  const items = [
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
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-t border-b border-[#c45c00]/25 bg-[#1a0f00] py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#1a0f00] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#1a0f00] to-transparent" />
      <div className="flex w-max animate-marquee gap-14 md:gap-20 font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="whitespace-nowrap bg-gradient-to-r from-[#e8a44a] via-[#f5c470] to-[#c47820] bg-clip-text text-transparent"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** "At a glance" stat boxes with CountUp numbers. */
function AvStatBar() {
  const stats = [
    { to: 2, suffix: " seats", label: "Team" },
    { to: 1, suffix: " bar", label: "Research standard" },
    { to: 2, suffix: " continents", label: "Coverage" },
  ];
  return (
    <div className="grid grid-cols-3 divide-x divide-[#c45c00]/20 border border-[#c45c00]/25 bg-[#fffbf4]">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center justify-center px-4 py-5 text-center">
          <p className="font-serif-display text-3xl font-semibold text-[#1a0f00] md:text-4xl">
            <CountUp to={s.to} suffix={s.suffix} duration={1200} />
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7c4a00]/80">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────── page ───────────────────── */

export default function Variation2Page() {
  return (
    <div className="bg-[#fdf5e8] text-[#1a0f00]">
      <Header />
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[calc(100svh-6.5rem)] flex-col overflow-hidden md:min-h-[calc(100svh-7rem)]">
          <TopographyBackground
            lineCount={26}
            lineColor="rgba(196, 92, 0, 0.22)"
            backgroundColor="#fdf5e8"
            speed={0.7}
            strokeWidth={0.5}
          />
          {/* Subtle noise film */}
          <NoisePlane opacity={0.03} />

          <HeroEntrance>
            <Container className="relative z-[1] flex flex-1 flex-col py-10 pb-0 md:py-14">
              <HeroStaggerRoot className="flex flex-1 flex-col">
                <HeroStaggerChild className="grid flex-1 grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6 lg:gap-y-14">

                  {/* Left column */}
                  <div className="relative flex gap-5 md:gap-6 lg:col-span-7">
                    <div
                      className="hidden w-px shrink-0 bg-gradient-to-b from-[#c45c00]/50 via-[#c45c00]/25 to-transparent md:block md:min-h-[220px]"
                      aria-hidden
                    />
                    <HeroColumnStagger className="min-w-0 flex-1">
                      <HeroLineItem>
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7c4a00]">
                          Meridia · Research collective
                        </p>
                      </HeroLineItem>

                      <HeroLineItem className="mt-5">
                        {/* Trust badge */}
                        <p className="mb-4 inline-flex items-center gap-2 border border-[#c45c00]/40 bg-[#fff8ee]/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c4a00]">
                          <span className="h-1.5 w-1.5 bg-[#c45c00]" aria-hidden />
                          Evidence beats narrative
                        </p>
                        <h1 className="max-w-xl font-serif-display text-[clamp(2.2rem,5.4vw,3.8rem)] font-semibold leading-[1.05] tracking-tight text-[#1a0f00]">
                          The future is worth{" "}
                          <TextReveal
                            text="building."
                            className="italic text-[#c45c00]"
                            delay={900}
                            speed={50}
                          />
                        </h1>
                        <p className="mt-4 max-w-lg font-sans text-lg font-medium leading-snug text-[#4a3010] md:text-xl">
                          A research firm for {STRIP_MANDATE.toLowerCase()}
                        </p>
                      </HeroLineItem>

                      <HeroLineItem className="mt-6">
                        <p className="max-w-md font-serif-display text-base leading-relaxed text-[#6b4020] md:text-lg">
                          We publish before we pitch. Rigorous memos, traceable models, and
                          open methodologies—capital is downstream of evidence.
                        </p>
                      </HeroLineItem>

                      <HeroLineItem className="mt-8">
                        <div className="flex flex-wrap gap-3">
                          <Button
                            href="/variation2#contact"
                            className="!rounded-none border-0 !bg-[#1a0f00] !bg-none !text-[#fdf5e8] hover:!opacity-90"
                          >
                            Collaborate
                          </Button>
                          <Button
                            href="/variation2#thesis"
                            variant="secondary"
                            className="!rounded-none !border !border-[#c45c00]/50 !bg-[#fff8ee] !text-[#1a0f00] hover:!border-[#c45c00]/80 hover:!bg-[#fff0d9]"
                          >
                            Read our approach
                          </Button>
                        </div>
                      </HeroLineItem>

                      <HeroLineItem>
                        <ScrollMouseHint />
                      </HeroLineItem>
                    </HeroColumnStagger>
                  </div>

                  {/* Right column: animated research panel */}
                  <HeroStaggerChild className="relative w-full lg:col-span-5 lg:mt-8">
                    <div
                      className="pointer-events-none absolute -right-4 -top-4 hidden h-20 w-20 border border-dashed border-[#c45c00]/30 lg:block"
                      aria-hidden
                    />
                    <AvHeroPanel />
                  </HeroStaggerChild>
                </HeroStaggerChild>

                {/* Partners marquee */}
                <HeroStaggerChild className="mt-14 border-t border-[#c45c00]/20 pt-8 md:mt-16 md:pt-10">
                  <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#7c4a00]/80 md:text-[11px]">
                    We work alongside
                  </p>
                  <AvantgardeMarquee labels={combinedLabels} />
                </HeroStaggerChild>
              </HeroStaggerRoot>
            </Container>
          </HeroEntrance>
        </section>

        {/* ── Dark ticker ───────────────────────────────────────────────── */}
        <AvTicker />

        {/* ── Why we exist ──────────────────────────────────────────────── */}
        <SectionReveal amount={0.08}>
          <section
            id="ethos"
            className="relative border-b border-[#c45c00]/20 bg-[#fff8ee] py-16 md:py-24"
          >
            <NoisePlane opacity={0.025} />
            <Container className="relative z-[1]">
              <div className="max-w-3xl">
                <AvLabel>Why we exist</AvLabel>
                <h2 className="font-serif-display text-3xl font-semibold leading-[1.1] tracking-tight text-[#1a0f00] md:text-4xl lg:text-[2.7rem]">
                  The best outcomes are{" "}
                  <span className="italic text-[#c45c00]">under-published</span>, not under-hyped.
                </h2>
              </div>

              <div className="mt-12">
                <MarchingBorder
                  color="rgba(196,92,0,0.42)"
                  dashArray="9 7"
                  duration={18}
                  innerClassName="relative overflow-hidden bg-[#fffbf4] p-6 md:p-10"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
                    <Ripple tone="warm" />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fffbf4] to-transparent"
                    aria-hidden
                  />
                  <p className="relative max-w-2xl font-serif-display text-lg leading-relaxed text-[#4a3010]">
                    We bias toward teams who want reviewers that read code, cite sources, and write the
                    uncomfortable questions into the appendix—whether or not a check ever follows.
                  </p>
                  <AvSectionNav />
                </MarchingBorder>
              </div>

              {/* Stat bar */}
              <div className="mt-10">
                <AvStatBar />
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ── At a glance ───────────────────────────────────────────────── */}
        <SectionReveal amount={0.08} delay={0.04}>
          <section
            id="glance"
            className="scroll-mt-24 relative overflow-hidden border-b border-[#c45c00]/20 bg-[#fdf5e8] py-16 md:py-24"
          >
            <AtAGlanceFloatingPaths strokeColor="#c47820" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fdf5e8] from-30% via-[#fdf5e8]/94 to-[#f5e8ce]/90" />
            <Container className="relative z-[1]">
              <div className="max-w-3xl">
                <AvLabel>At a glance</AvLabel>
                <h2 className="mt-2 font-serif-display text-3xl font-semibold tracking-tight text-[#1a0f00] md:text-4xl lg:max-w-[42rem] lg:leading-[1.14]">
                  One research desk,{" "}
                  <span className="text-[#c45c00]">rare capital</span>, no touring roadshow.
                </h2>
                <p className="mt-4 max-w-2xl font-serif-display text-base leading-relaxed text-[#6b4020] md:text-lg">
                  One bar, shared definitions of proof, and artifacts you can stress-test. Memos and
                  models first—vanity decks are the exception.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
                {/* Card 1: Research bar */}
                <div className="relative overflow-hidden border border-[#c45c00]/30 bg-[#fffbf4] p-8">
                  <div className="pointer-events-none absolute inset-0 opacity-85" aria-hidden>
                    <PixelBlast
                      variant="square"
                      pixelSize={2}
                      color="#f5ddb0"
                      patternScale={2}
                      patternDensity={1}
                      pixelSizeJitter={0}
                      enableRipples
                      rippleSpeed={0.36}
                      rippleThickness={0.11}
                      rippleIntensityScale={1.4}
                      liquid={false}
                      speed={0.45}
                      edgeFade={0.28}
                      transparent
                    />
                  </div>
                  <div className="relative">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7c4a00]/80">
                      Collective
                    </p>
                    <p className="mt-4 font-sans text-2xl font-semibold tracking-tight text-[#1a0f00] md:text-3xl">
                      One research bar
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c45c00]/90">
                      Two seats · one standard
                    </p>
                    <p className="mt-4 font-serif-display text-sm leading-relaxed text-[#4a3010]">
                      Two seats covering analytics and technical systems—one standard of rigor, no
                      siloed opinions without work product.
                    </p>
                  </div>
                </div>

                {/* Card 2: Geography + Globe */}
                <div className="relative overflow-hidden border border-[#c45c00]/30 bg-[#fffbf4] p-8">
                  <div className="relative z-[1]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7c4a00]/80">
                      Geography
                    </p>
                    <p className="mt-4 font-sans text-2xl font-semibold tracking-tight text-[#1a0f00] md:text-3xl">
                      Singapore <span className="text-[#7c4a00]/60">×1</span> · NYC{" "}
                      <span className="text-[#7c4a00]/60">×1</span>
                    </p>
                    <p className="mt-4 font-serif-display text-sm leading-relaxed text-[#4a3010]">
                      Built across Asia and North America—remote-first review cycles with on-site time
                      when hardware or lab work demands it.
                    </p>
                  </div>
                  <div className="relative mt-8 border-t border-[#c45c00]/15 pt-8">
                    <div className="flex justify-center">
                      <Earth className="h-[110px] w-auto max-w-[220px] opacity-45" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mandate card */}
              <div className="relative mt-6 overflow-hidden border border-[#c45c00]/30 bg-[#fffbf4] p-8 md:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden>
                  <Threads
                    color={[196 / 255, 120 / 255, 32 / 255]}
                    amplitude={1}
                    distance={0}
                    enableMouseInteraction
                  />
                </div>
                <div className="relative max-w-4xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7c4a00]/80">
                    Mandate
                  </p>
                  <p className="mt-4 font-sans text-xl font-semibold leading-snug tracking-tight text-[#1a0f00] md:text-2xl">
                    {STRIP_MANDATE}
                  </p>
                  <p className="mt-5 font-serif-display text-sm leading-relaxed text-[#6b4020] md:text-base">
                    L1/L2 and DeFi plumbing, fintech and custody rails, wallets and infra, frontier AI,
                    robotics, and adjacent hardware. If it falls outside that perimeter, we are not the
                    right desk—saying no is part of the product.
                  </p>
                </div>
              </div>
            </Container>
          </section>
        </SectionReveal>

        {/* ── Thesis ────────────────────────────────────────────────────── */}
        <SectionReveal amount={0.07}>
          <section
            id="thesis"
            className="scroll-mt-24 border-b border-[#c45c00]/20 bg-[#fff8ee] py-16 md:py-24"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 50% at 50% -15%, rgba(196,92,0,0.07), transparent)",
            }}
          >
            <NoisePlane opacity={0.02} />
            <Container className="relative z-[1]">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
                {/* Left: thesis copy */}
                <div className="min-w-0 lg:border-r lg:border-dashed lg:border-[#c45c00]/30 lg:pr-12">
                  <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7c4a00]/80">
                    Research thesis
                  </p>
                  <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#1a0f00] md:text-4xl">
                    <TextReveal
                      text="Meridia"
                      className="bg-gradient-to-r from-[#c45c00] via-[#e07a20] to-[#7c4a00] bg-clip-text text-transparent"
                      delay={200}
                      speed={55}
                    />
                  </h2>
                  <p className="mt-4 font-serif-display text-base leading-relaxed text-[#4a3010]">
                    When we deploy capital it is{" "}
                    <span className="font-semibold text-[#c45c00]">early, concentrated</span>, and always
                    downstream of work you can read and stress-test.
                  </p>

                  {/* AI on the desk callout */}
                  <div className="relative mt-5 min-h-[120px] overflow-hidden border border-[#c45c00]/30 bg-[#fffbf4]">
                    <FlickeringGrid
                      className="absolute inset-0 min-h-full"
                      color="rgb(196, 92, 0)"
                      squareSize={3}
                      gridGap={7}
                      flickerChance={0.05}
                      maxOpacity={0.2}
                    />
                    <div className="relative z-[1] px-5 py-4">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c45c00]">
                        AI on the desk
                      </p>
                      <p className="mt-2 font-serif-display text-sm leading-relaxed text-[#4a3010]">
                        We spearhead research workflows with{" "}
                        <span className="font-semibold text-[#7c2e00]">AI agents</span>—custom pipelines
                        for ingestion, stress-testing, and publication—so rigor scales without becoming
                        opaque.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <Tag
                      href="/writing"
                      className="!rounded-none border-[#c45c00]/40 bg-[#fff0d9] text-[#7c4a00]"
                    >
                      Thesis
                    </Tag>
                    <Tag
                      showArrow
                      href="mailto:hello@efimov.xyz?subject=Memo%20request%20%E2%80%94%20Meridia"
                      className="!rounded-none border-[#c45c00]/40 bg-[#fffbf4] text-[#7c4a00]"
                    >
                      Request memo
                    </Tag>
                  </div>
                </div>

                {/* Right: approach steps */}
                <StaggerOnView id="work" className="scroll-mt-24 lg:pl-12">
                  <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7c4a00]/80">
                    Approach
                  </p>
                  <div className="border border-dashed border-[#c45c00]/40 bg-[#fffbf4]">
                    {focusSteps.map((step, i) => (
                      <div key={step.n}>
                        <StaggerItem>
                          <div className="px-7 py-8 md:px-10 md:py-9">
                            <div className="flex gap-5 md:gap-6">
                              <span className="shrink-0 font-mono text-xs tabular-nums text-[#c45c00] md:text-sm">
                                {step.n}
                              </span>
                              <div className="min-w-0">
                                <h3 className="font-sans text-base font-semibold tracking-tight text-[#1a0f00]">
                                  {step.title}
                                </h3>
                                <p className="mt-2 font-serif-display text-sm leading-relaxed text-[#6b4020]">
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
                            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#c45c00]/30" />
                            <div className="relative border border-[#c45c00]/40 bg-[#fff8ee] px-3 py-1">
                              <span className="block text-[#c45c00]">↓</span>
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

        {/* ── Team ──────────────────────────────────────────────────────── */}
        <SectionReveal amount={0.08}>
          <section
            id="team"
            className="scroll-mt-24 border-b border-[#c45c00]/20 bg-[#fdf5e8] py-16 md:py-24"
          >
            <Container>
              <AvLabel>Team</AvLabel>
              <h2 className="max-w-2xl font-serif-display text-3xl font-semibold tracking-tight text-[#1a0f00] md:text-4xl">
                Two seats.{" "}
                <span className="text-[#c45c00]">One research bar</span>.
              </h2>
              <p className="mt-3 max-w-2xl font-serif-display text-sm leading-relaxed text-[#6b4020] md:text-base">
                The people behind the desk—operators and researchers who publish before they pitch.
              </p>

              <StaggerOnView className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
                {team.map((member, i) => {
                  const CardBg = i === 0 ? PixelMountain : PixelHammer;
                  return (
                    <StaggerItem key={member.handle}>
                      <article className="relative flex h-full flex-col overflow-hidden border border-[#c45c00]/25 bg-[#fffbf4]">
                        <div className="pointer-events-none absolute inset-0 opacity-55" aria-hidden>
                          <CardBg accentRgb={WARM_PIXEL_ACCENT} />
                        </div>
                        <div className="relative flex justify-center px-7 pt-7 md:justify-start">
                          <div className="relative aspect-[4/5] w-[min(100%,10rem)] shrink-0 overflow-hidden bg-[#f5e8ce] ring-1 ring-[#c45c00]/20 sm:w-[10.5rem] md:w-[9.25rem] lg:w-[10rem]">
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
                          <div className="h-px w-10 bg-[#c45c00]/70" />
                          <p className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#1a0f00]">
                            {member.handle}
                            <span className="mx-1.5 font-normal text-[#c45c00]/50">·</span>
                            <span className="text-[#7c4a00]/70">{member.city}</span>
                          </p>
                          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#c45c00]/60">
                            Founder
                          </p>
                          <h3 className="mt-3 font-sans text-lg font-semibold tracking-tight text-[#1a0f00]">
                            {member.role}
                          </h3>
                          <p className="mt-3 flex-1 font-serif-display text-sm leading-relaxed text-[#6b4020]">
                            {member.blurb}
                          </p>
                          <a
                            href={member.xUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex w-fit font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c4a00] underline decoration-[#c45c00]/30 underline-offset-4 transition-colors hover:text-[#c45c00] hover:decoration-[#c45c00]/60"
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

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <SectionReveal amount={0.08}>
          <section id="contact" className="scroll-mt-24 bg-[#f5e8ce] py-20 md:py-28">
            <Container className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-8">
              {/* Left: contact form entry */}
              <MarchingBorder
                color="rgba(196,92,0,0.45)"
                dashArray="9 7"
                duration={20}
                innerClassName="flex flex-col justify-center bg-[#fffbf4] p-6 md:p-9 h-full"
              >
                <AvLabel>Contact</AvLabel>
                <h2 className="mt-2 font-serif-display text-3xl font-semibold leading-tight tracking-tight text-[#1a0f00] md:text-4xl">
                  Building in{" "}
                  <span className="text-[#c45c00]">crypto</span>,{" "}
                  <span className="text-[#c45c00]">fintech</span>,{" "}
                  <span className="text-[#c45c00]">deep tech</span>—or anywhere in between?
                </h2>
                <p className="mt-4 font-serif-display text-base leading-relaxed text-[#4a3010]">
                  Share the problem, what is already built, and what you want pressure-tested. We reply
                  when the research can add real leverage—capital is downstream and optional.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    href={SOCIAL_X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!rounded-none border-0 !bg-[#1a0f00] !bg-none !text-[#fdf5e8] hover:!opacity-90"
                  >
                    Message on X
                  </Button>
                  <Button
                    href="mailto:hello@efimov.xyz"
                    variant="secondary"
                    className="!rounded-none !border !border-[#c45c00]/50 !bg-[#fff8ee] !text-[#1a0f00] hover:!border-[#c45c00]/80 hover:!bg-[#fff0d9]"
                  >
                    Email us
                  </Button>
                </div>
              </MarchingBorder>

              {/* Right: dark "operating note" card */}
              <article className="relative flex min-h-[min(22rem,70vh)] flex-col justify-center overflow-hidden border border-[#c47820]/40 bg-[#1a0f00] text-[#fdf5e8]">
                <NoisePlane opacity={0.04} />
                <BackgroundBeams tone="terracotta" className="opacity-90" />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c45c00]/20 via-transparent to-[#7c2e00]/35"
                  aria-hidden
                />
                <div className="relative z-[1] p-6 md:p-9">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c47820]/80">
                    Operating note
                  </p>
                  <p className="mt-6 font-sans text-xl font-semibold leading-snug text-[#fdf5e8]">
                    Frontier tech rewards teams that can show mechanism, not just momentum. Our default
                    output is research you can fork—not a deck you admire once.
                  </p>
                  <p className="mt-4 font-serif-display text-base leading-relaxed text-[#c47820]/70">
                    When we allocate, it is narrow, repeatable, and always late in the process—never a
                    substitute for the work product.
                  </p>

                  {/* Decorative corner mark */}
                  <div
                    className="absolute bottom-5 right-5 h-12 w-12 border border-[#c47820]/25"
                    aria-hidden
                  />
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

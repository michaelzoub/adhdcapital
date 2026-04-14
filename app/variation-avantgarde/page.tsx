import type { Metadata } from "next";
import Link from "next/link";

import { AvantFooter } from "@/components/avantgarde/AvantFooter";
import { AvantHeader } from "@/components/avantgarde/AvantHeader";
import { AvantMarquee } from "@/components/avantgarde/AvantMarquee";
import { WarmFuturePulse } from "@/components/avantgarde/WarmFuturePulse";
import { WarmWireframeField } from "@/components/avantgarde/WarmWireframeField";
import { AtAGlanceFloatingPaths } from "@/components/backgrounds/FloatingPaths";
import { BackgroundBeams } from "@/components/backgrounds/BackgroundBeams";
import PixelBlast from "@/components/backgrounds/PixelBlast";
import PixelHammer from "@/components/backgrounds/PixelHammer";
import PixelMountain from "@/components/backgrounds/PixelMountain";
import PixelNuclear from "@/components/backgrounds/PixelNuclear";
import Threads from "@/components/backgrounds/Threads";
import { TopographyBackground } from "@/components/backgrounds/TopographyBackground";
import { FlickeringGrid } from "@/components/effects/FlickeringGrid";
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
import { Button, Container, Tag } from "@/components/ui";
import { SOCIAL_X_URL } from "@/lib/site";
import { Ripple } from "@/registry/magicui/ripple";

const MARQUEE_ITEMS = [
  { label: "Warm systems", voice: "mono" },
  { label: "Future confidence", voice: "accent" },
  { label: "Readable complexity", voice: "serif" },
  { label: "Protocol thinking", voice: "mono" },
  { label: "No fear design", voice: "accent" },
  { label: "Human rigor", voice: "serif" },
  { label: "Sharp geometry", voice: "mono" },
  { label: "Clear evidence", voice: "accent" },
] as const;

const MODES = [
  {
    mode: "Mode A — Signal Grid",
    label: "Trust through clarity",
    body: "Hard structure, visible assumptions, and clean spatial rhythm. Feels precise without feeling cold.",
  },
  {
    mode: "Mode B — Momentum Field",
    label: "Trust through progress",
    body: "Layered directional motion and warm kinetic overlays suggest movement toward better outcomes.",
  },
  {
    mode: "Mode C — Human Engine",
    label: "Trust through intent",
    body: "Editorial typography and lived warmth balance frontier energy with professional confidence.",
  },
] as const;

export const metadata: Metadata = {
  title: "Meridia — Avantgarde Variation",
  description:
    "A bold avantgarde Meridia concept in warm tones: sharp geometry, expressive motion, and an optimistic future-facing narrative.",
  robots: { index: false, follow: true },
};

const primaryButton =
  "!rounded-none border border-[#7c2d12] !bg-[#7c2d12] !text-[#f7f1e8] hover:!opacity-90";
const secondaryButton =
  "!rounded-none border border-[#b79175] !bg-[#f7f1e8] !text-[#2f241b] hover:!border-[#7c2d12]";

export default function AvantgardeVariationPage() {
  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#2f241b]">
      <AvantHeader />
      <main>
        <section className="relative overflow-hidden border-b border-[#d6c5b6]">
          <TopographyBackground
            lineCount={26}
            lineColor="rgba(146, 64, 14, 0.26)"
            backgroundColor="#f3eadf"
            speed={0.85}
            strokeWidth={0.6}
          />
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <WarmWireframeField density={18} />
          </div>
          <HeroEntrance>
            <Container className="relative z-[1] py-12 md:py-16">
              <HeroStaggerRoot className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
                <HeroStaggerChild className="lg:col-span-7">
                  <HeroColumnStagger>
                    <HeroLineItem>
                      <Tag className="!rounded-none border-[#c7a891] bg-[#f7f1e8] text-[#6f3c1f]">
                        Avantgarde variation
                      </Tag>
                    </HeroLineItem>
                    <HeroLineItem className="mt-5">
                      <h1 className="max-w-3xl font-serif-display text-[clamp(2.25rem,6.4vw,5rem)] font-semibold leading-[0.98] tracking-tight text-[#2f241b]">
                        The future can feel warm,{" "}
                        <span className="italic text-[#7c2d12]">sharp</span>, and trustworthy.
                      </h1>
                    </HeroLineItem>
                    <HeroLineItem className="mt-5">
                      <p className="max-w-xl font-serif-display text-base leading-relaxed text-[#5a4333] md:text-lg">
                        This concept pushes the site into an experimental visual language while keeping
                        professional edges: no rounded corners, no glow, just structured motion and clear
                        intent.
                      </p>
                    </HeroLineItem>
                    <HeroLineItem className="mt-8 flex flex-wrap gap-3">
                      <Button href="#vision" className={primaryButton}>
                        Explore the concept
                      </Button>
                      <Button href="/variation1" variant="secondary" className={secondaryButton}>
                        View warm baseline
                      </Button>
                    </HeroLineItem>
                    <HeroLineItem>
                      <ScrollMouseHint />
                    </HeroLineItem>
                  </HeroColumnStagger>
                </HeroStaggerChild>
                <HeroStaggerChild className="lg:col-span-5">
                  <article className="relative min-h-[360px] overflow-hidden border border-[#c7a891] bg-[#f7f1e8] p-5 md:min-h-[440px] md:p-6">
                    <div className="absolute inset-0" aria-hidden>
                      <WarmFuturePulse />
                    </div>
                    <div className="absolute inset-0 opacity-80" aria-hidden>
                      <PixelNuclear />
                    </div>
                    <div className="absolute inset-0 opacity-35" aria-hidden>
                      <FlickeringGrid
                        squareSize={3}
                        gridGap={8}
                        flickerChance={0.04}
                        color="rgb(124, 45, 18)"
                        maxOpacity={0.3}
                      />
                    </div>
                    <div className="relative z-[1] flex h-full flex-col">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c2d12]">
                        Creative directive
                      </p>
                      <p className="mt-3 max-w-sm font-serif-display text-lg leading-snug text-[#2f241b]">
                        Push boundaries, keep warmth, preserve trust. Every line and motion should suggest
                        capability and hope.
                      </p>
                      <div className="mt-auto border-t border-[#d4bfad] pt-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6f4f3a]">
                          Geometry: hard corners only
                        </p>
                      </div>
                    </div>
                  </article>
                </HeroStaggerChild>
              </HeroStaggerRoot>
            </Container>
          </HeroEntrance>
        </section>

        <AvantMarquee items={MARQUEE_ITEMS} />

        <SectionReveal amount={0.08}>
          <section id="vision" className="relative overflow-hidden border-b border-[#d6c5b6] bg-[#efe4d7] py-16 md:py-24">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <AtAGlanceFloatingPaths strokeColor="#b45309" />
            </div>
            <Container className="relative z-[1]">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c2d12]">
                    Vision
                  </p>
                  <h2 className="mt-4 font-serif-display text-3xl font-semibold leading-tight tracking-tight text-[#2f241b] md:text-5xl">
                    Avantgarde, but with <span className="italic text-[#7c2d12]">emotional safety</span>.
                  </h2>
                  <p className="mt-5 max-w-2xl font-serif-display text-base leading-relaxed text-[#5a4333] md:text-lg">
                    Warm chroma, strong typography, and disciplined animation can make advanced technology
                    feel inviting instead of threatening. The message: the future is complex, but it can be
                    built responsibly.
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <div className="relative min-h-[280px] overflow-hidden border border-[#c7a891] bg-[#f7f1e8]">
                    <div className="absolute inset-0 opacity-70" aria-hidden>
                      <Ripple tone="warm" />
                    </div>
                    <div className="absolute inset-0 opacity-40" aria-hidden>
                      <Threads color={[180 / 255, 83 / 255, 9 / 255]} amplitude={1.15} enableMouseInteraction />
                    </div>
                    <div className="relative z-[1] p-6 md:p-8">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c2d12]">
                        Emotional target
                      </p>
                      <p className="mt-3 font-serif-display text-lg leading-snug text-[#2f241b]">
                        “They understand difficult systems, and they still care about people.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </SectionReveal>

        <SectionReveal amount={0.08}>
          <section id="modes" className="border-b border-[#d6c5b6] bg-[#f3eadf] py-16 md:py-24">
            <Container>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c2d12]">
                Multiple stylistic directions
              </p>
              <h2 className="mt-4 max-w-3xl font-serif-display text-3xl font-semibold tracking-tight text-[#2f241b] md:text-4xl">
                Three distinct avantgarde modes from one warm system.
              </h2>
              <StaggerOnView className="mt-10 grid gap-6 md:grid-cols-3">
                {MODES.map((mode, index) => (
                  <StaggerItem key={mode.mode}>
                    <article className="relative min-h-[280px] overflow-hidden border border-[#c7a891] bg-[#f7f1e8] p-6">
                      <div className="absolute inset-0" aria-hidden>
                        {index === 0 ? (
                          <PixelMountain accentRgb={[180, 83, 9]} />
                        ) : index === 1 ? (
                          <PixelHammer accentRgb={[180, 83, 9]} />
                        ) : (
                          <PixelBlast
                            variant="square"
                            pixelSize={2}
                            color="#ecd3ba"
                            patternScale={2}
                            patternDensity={1}
                            pixelSizeJitter={0}
                            enableRipples
                            rippleSpeed={0.45}
                            rippleThickness={0.12}
                            rippleIntensityScale={1.4}
                            liquid={false}
                            speed={0.56}
                            edgeFade={0.25}
                            transparent
                          />
                        )}
                      </div>
                      <div className="relative z-[1]">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c2d12]">
                          {mode.label}
                        </p>
                        <h3 className="mt-3 font-sans text-xl font-semibold tracking-tight text-[#2f241b]">
                          {mode.mode}
                        </h3>
                        <p className="mt-4 font-serif-display text-sm leading-relaxed text-[#5a4333]">
                          {mode.body}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerOnView>
            </Container>
          </section>
        </SectionReveal>

        <SectionReveal amount={0.08}>
          <section id="system" className="relative overflow-hidden border-b border-[#d6c5b6] bg-[#f0e4d6] py-16 md:py-24">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <BackgroundBeams tone="terracotta" className="opacity-75" />
            </div>
            <Container className="relative z-[1]">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c2d12]">
                    System principles
                  </p>
                  <h2 className="mt-4 font-serif-display text-3xl font-semibold tracking-tight text-[#2f241b] md:text-4xl">
                    Experimental surface, reliable core.
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Hard-edge geometry only. No rounded cards, no soft chrome.",
                      "Motion combines reveal, flow, pulse, and pixel systems with reduced-motion fallbacks.",
                      "Warm spectrum stays optimistic: terracotta, amber, parchment, and charcoal.",
                      "Trust cues: strict spacing, legible contrast, and clear directional hierarchy.",
                    ].map((line) => (
                      <li key={line} className="border-l-2 border-[#b98c6d] pl-3 font-serif-display text-base text-[#4e3a2c]">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-5">
                  <div className="relative min-h-[320px] overflow-hidden border border-[#c7a891] bg-[#2d2218] text-[#f7f1e8]">
                    <div className="absolute inset-0 opacity-90" aria-hidden>
                      <BackgroundBeams tone="terracotta" />
                    </div>
                    <div className="relative z-[1] p-6 md:p-8">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#dfb899]">
                        Outcome
                      </p>
                      <p className="mt-4 font-serif-display text-lg leading-snug">
                        Users should feel they are stepping into a serious lab that is still humane about what
                        comes next.
                      </p>
                      <div className="mt-8 border-t border-[#6c4a35] pt-4">
                        <Link
                          href="/"
                          className="inline-flex border border-[#dfb899] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f7f1e8] transition-opacity hover:opacity-80"
                        >
                          Back to current home
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </SectionReveal>

        <SectionReveal amount={0.08}>
          <section id="contact" className="bg-[#f7f1e8] py-16 md:py-24">
            <Container>
              <div className="grid gap-8 md:grid-cols-2">
                <article className="border border-[#c7a891] bg-[#fffaf3] p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c2d12]">Next step</p>
                  <h2 className="mt-4 font-serif-display text-3xl font-semibold leading-tight text-[#2f241b]">
                    Want this direction developed further?
                  </h2>
                  <p className="mt-4 font-serif-display text-base leading-relaxed text-[#5a4333]">
                    We can evolve this into additional route-level experiments, AB test variants, or a complete
                    brand-forward redesign with production-safe motion defaults.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      href={SOCIAL_X_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={primaryButton}
                    >
                      Message on X
                    </Button>
                    <Button href="mailto:hello@efimov.xyz" variant="secondary" className={secondaryButton}>
                      Email us
                    </Button>
                  </div>
                </article>
                <article className="border border-[#c7a891] bg-[#efe4d7] p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7c2d12]">
                    Compatibility note
                  </p>
                  <p className="mt-4 font-serif-display text-base leading-relaxed text-[#4e3a2c]">
                    This is intentionally isolated to new files and a dedicated route, so the existing site stays
                    untouched while you review the creative direction.
                  </p>
                  <p className="mt-3 font-serif-display text-base leading-relaxed text-[#4e3a2c]">
                    Route: <span className="font-mono text-[13px]">/variation-avantgarde</span>
                  </p>
                </article>
              </div>
            </Container>
          </section>
        </SectionReveal>
      </main>
      <AvantFooter />
    </div>
  );
}

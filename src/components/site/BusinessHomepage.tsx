import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedCta } from "@/components/site/TrackedCta";
import { BrowserMock } from "@/components/site/BrowserMock";
import { HeroWorkflowDemo } from "@/components/site/HeroWorkflowDemo";
import { RolloutSteps } from "@/components/site/RolloutSteps";
import { AuthorityTabs } from "@/components/site/AuthorityTabs";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { DashedRing, PlayCircle } from "@/components/site/featureIcons";
import {
  aiControlSection,
  authorityTrustPoints,
  configurability,
  connectedSystems,
  ctaCopy,
  faqSection,
  featureSection,
  finalCtaSection,
  heroContent,
  howItWorksSection,
  implementationControl,
  implementationHonestyNote,
  intelligenceLayer,
  logoStrip,
  patchworkSources,
  proofSection,
  sectionIds,
} from "@/lib/site-config";

export function BusinessHomepage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <ConnectedSystems />
      <Problem />
      <Features />
      <IntelligenceLayer />
      <HowItWorks />
      <ConfigureControl />
      <Proof />
      <Faq />
      <FinalCta />
    </>
  );
}

/** Splits a sentence around one substring and wraps that substring in <strong>. */
function withEmphasis(text: string, emphasis: string): ReactNode {
  const index = text.indexOf(emphasis);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <strong className="font-bold text-[var(--color-text-on-dark-primary)]">{emphasis}</strong>
      {text.slice(index + emphasis.length)}
    </>
  );
}

function Hero() {
  return (
    <section
      id={sectionIds.hero}
      className="relative overflow-hidden bg-[var(--color-canvas-hero)] pb-20 pt-28 sm:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 -top-52 size-[720px] rounded-full border border-white/25" />
        <div className="absolute -right-64 top-4 size-[720px] rounded-full border border-white/20" />
        <DashedRing size={176} className="absolute left-[44%] top-14 hidden text-white/25 lg:block" />
        <DashedRing
          size={120}
          strokeDasharray="2 6"
          className="absolute bottom-24 right-[7%] hidden text-white/20 lg:block"
        />
        <span className="absolute right-10 top-16 size-2 rounded-full bg-white/25 opacity-40" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="max-w-2xl">
            <p className="label-mono animate-reveal-soft text-[var(--color-text-on-dark-primary)]">
              {heroContent.eyebrow}
            </p>
            <h1
              className="font-display mt-5 text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.06] text-[var(--color-text-on-dark-primary)]"
              style={{ letterSpacing: "-0.025em" }}
            >
              <span className="block overflow-hidden">
                <span className="animate-reveal-clip block font-light" style={{ animationDelay: "80ms" }}>
                  {heroContent.headlineLight}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="animate-reveal-clip block font-bold" style={{ animationDelay: "180ms" }}>
                  {heroContent.headlineBold}
                </span>
              </span>
            </h1>
            <p
              className="animate-reveal-soft mt-6 max-w-[42ch] text-lg leading-relaxed text-[var(--color-text-on-dark-primary)]"
              style={{ animationDelay: "300ms" }}
            >
              {heroContent.subhead}
            </p>
            <div
              className="animate-reveal-soft mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              style={{ animationDelay: "420ms" }}
            >
              <TrackedCta location="hero" variant="cta">
                {ctaCopy.primary}
              </TrackedCta>
              <Link
                href={`#${sectionIds.howItWorks}`}
                className="group inline-flex items-center gap-3 rounded-full text-sm text-[var(--color-text-on-dark-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-on-dark-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-white/25 transition-colors duration-[var(--duration-hover)] group-hover:bg-white/35">
                  <PlayCircle className="size-4 text-[var(--color-text-on-dark-primary)]" />
                </span>
                {heroContent.secondaryCta}
              </Link>
            </div>
            <p
              className="label-mono animate-reveal-soft mt-8 text-[var(--color-text-on-dark-primary)]"
              style={{ animationDelay: "520ms" }}
            >
              {heroContent.microline}
            </p>
          </div>

          <Reveal className="mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
            <BrowserMock />
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-20 border-t border-border-on-dark pt-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {heroContent.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[2.25rem] font-bold leading-none text-[var(--color-text-on-dark-primary)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-on-dark-primary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function LogoStrip() {
  return (
    <section id={sectionIds.pilots} className="scroll-mt-24 bg-[var(--color-canvas-dark)] py-14">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="label-mono text-[var(--color-text-on-dark-muted)]">{logoStrip.label}</p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            {logoStrip.aggregate}
          </p>
          <p className="mt-3 text-sm text-[var(--color-text-on-dark-muted)]">{logoStrip.tell}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function ConnectedSystems() {
  return (
    <section
      id={sectionIds.connected}
      className="scroll-mt-24 border-t border-border-on-dark bg-[var(--color-canvas-dark-raised)] py-16"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-text-on-dark-muted)]">{connectedSystems.label}</p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            {connectedSystems.intro}
          </p>
        </Reveal>
        <Reveal delay={80} className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
          {connectedSystems.systems.map((system) => (
            <span
              key={system}
              className="rounded-full border border-[var(--color-border-on-dark)] px-3.5 py-1.5 text-xs text-[var(--color-text-on-dark-secondary)]"
            >
              {system}
            </span>
          ))}
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-xs leading-relaxed text-[var(--color-text-on-dark-muted)]">{connectedSystems.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Problem() {
  return (
    <section id={sectionIds.problem} className="scroll-mt-24 bg-[var(--color-canvas)] py-16 sm:py-20">
      <Container>
        <Reveal variant="clip" className="max-w-3xl">
          <h2 className="font-display text-[2rem] font-semibold leading-[1.15] sm:text-[2.5rem]">
            Your managers run the business across a dozen disconnected apps.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {patchworkSources.map((item) => (
            <div key={item.source} className="ticket-slip px-4 py-5">
              <p className="ticket-number">{item.source}</p>
              <p className="mt-2.5 text-sm font-medium leading-snug">{item.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={160} className="mt-8 flex max-w-2xl items-start gap-3">
          <span
            aria-hidden
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-signal-soft)] text-[var(--color-signal-strong)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M6 13l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="text-base font-medium leading-relaxed text-[var(--color-text-primary)]">
            WorkforceOS turns those scattered signals into one operating view.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Features() {
  return (
    <section
      id={sectionIds.capabilities}
      className="scroll-mt-24 bg-[var(--color-canvas-features)] py-28 sm:py-32"
    >
      <Container>
        <Reveal variant="clip" className="max-w-[780px]">
          <h2 className="font-display text-[2.5rem] leading-[1.25]">
            <span className="block font-light">{featureSection.headingLight}</span>
            <span className="block font-bold">{featureSection.headingBold}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="max-w-[761px]">
          <p className="mt-6 text-[18px] leading-[1.625] text-[var(--color-text-muted)]">
            {featureSection.intro}
          </p>
        </Reveal>

        <div className="mt-20">
          <FeatureGrid />
        </div>

        <Reveal delay={80} className="mt-12 max-w-3xl">
          <p className="text-sm leading-[1.7] text-[var(--color-text-muted)]">{featureSection.footerNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function IntelligenceLayer() {
  return (
    <section
      id={sectionIds.intelligence}
      className="scroll-mt-24 bg-[var(--color-canvas-dark)] py-28 sm:py-32"
    >
      <Container>
        <Reveal variant="clip" className="max-w-[720px]">
          <h2 className="font-display text-[2.5rem] leading-[1.25] text-[var(--color-text-on-dark-primary)]">
            <span className="block font-light">{intelligenceLayer.headingLight}</span>
            <span className="block font-bold">{intelligenceLayer.headingBold}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="max-w-2xl">
          <p className="mt-5 text-lg leading-[1.625] text-[var(--color-text-on-dark-secondary)]">
            {intelligenceLayer.intro}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-16">
          <ol className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {intelligenceLayer.steps.map((step, index) => (
              <li key={step.key} className="lg:pr-6">
                <div className="border-t border-[var(--color-signal)]/40 pt-4">
                  <span className="font-mono text-sm text-[var(--color-signal)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-[var(--color-text-on-dark-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.625] text-[var(--color-text-on-dark-muted)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160} className="mt-14 space-y-3">
          {intelligenceLayer.examples.map((example) => {
            const [trigger, outcome] = example.split("→").map((part) => part.trim());
            return (
              <div
                key={example}
                className="ticket-slip-dark flex flex-col gap-1.5 px-5 py-4 sm:flex-row sm:items-center sm:gap-3"
              >
                <span className="text-sm text-[var(--color-text-on-dark-secondary)]">{trigger}</span>
                <span aria-hidden className="font-mono text-[var(--color-signal)] sm:hidden">↓</span>
                <span aria-hidden className="hidden font-mono text-[var(--color-signal)] sm:inline">
                  →
                </span>
                <span className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">{outcome}</span>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id={sectionIds.howItWorks}
      className="scroll-mt-24 border-t border-border-on-dark bg-[var(--color-canvas-dark)] py-28 sm:py-32"
    >
      <Container>
        <Reveal variant="clip" className="max-w-[576px]">
          <h2 className="font-display text-[2.5rem] leading-[1.25] text-[var(--color-text-on-dark-primary)]">
            <span className="block font-light">{howItWorksSection.headingLight}</span>
            <span className="block font-bold">{howItWorksSection.headingBold}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="max-w-[48ch]">
          <p className="mt-[30px] text-lg leading-[1.625] text-[var(--color-text-on-dark-muted)]">
            {withEmphasis(howItWorksSection.subhead, howItWorksSection.subheadEmphasis)}
          </p>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:items-center">
          <RolloutSteps />
          <HeroWorkflowDemo />
        </div>

        <Reveal delay={80}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[var(--color-text-on-dark-muted)]">
            {implementationHonestyNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function ConfigureControl() {
  return (
    <section
      id={sectionIds.authority}
      className="scroll-mt-24 border-t border-border-on-dark bg-[var(--color-canvas-dark)] py-28 sm:py-32"
    >
      <Container>
        <Reveal variant="clip" className="max-w-[576px]">
          <h2 className="font-display text-[2.5rem] leading-[1.25] text-[var(--color-text-on-dark-primary)]">
            <span className="block font-light">{configurability.headingLight}</span>
            <span className="block font-bold">{configurability.headingBold}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="max-w-2xl">
          <p className="mt-5 leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            {configurability.intro}
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {configurability.items.map((item) => (
            <div key={item.label}>
              <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-on-dark-muted)]">{item.detail}</p>
            </div>
          ))}
        </Reveal>

        <div className="my-16 border-t border-border-on-dark" />

        <Reveal variant="clip" className="max-w-[576px]">
          <h2 className="font-display text-[2.5rem] leading-[1.25] text-[var(--color-text-on-dark-primary)]">
            <span className="block font-light">{aiControlSection.headingLight}</span>
            <span className="block font-bold">{aiControlSection.headingBold}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="max-w-2xl">
          <p className="mt-5 leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            {aiControlSection.intro}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <AuthorityTabs />
        </Reveal>

        <Reveal
          delay={160}
          className="mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-border-on-dark pt-6"
        >
          {authorityTrustPoints.map((point) => (
            <div key={point.label}>
              <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">{point.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-on-dark-muted)]">
                {point.detail}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function Proof() {
  return (
    <section id={sectionIds.proof} className="scroll-mt-24 bg-[var(--color-canvas-features)] py-28">
      <Container>
        <Reveal variant="clip" className="mx-auto max-w-[720px] text-center">
          <h2 className="font-display text-[2.5rem] leading-[1.25]">
            <span className="block font-bold">{proofSection.headingBold}</span>
            <span className="block font-light">{proofSection.headingLight}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mx-auto max-w-[576px] text-center">
          <p className="mt-5 leading-relaxed text-[var(--color-text-muted)]">{proofSection.intro}</p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {proofSection.cards.map((card) => (
            <article
              key={card.name}
              className="rounded-2xl border border-canvas-raised bg-[var(--color-canvas-elevated)] p-7"
            >
              <p className="font-display text-xl font-semibold text-[var(--color-text-primary)]">{card.name}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{card.context}</p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-text-primary)]">
                {card.result}
              </p>
              <p className="mt-4 border-t border-canvas-raised pt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {card.note}
              </p>
            </article>
          ))}
        </Reveal>

        <Reveal delay={160} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="label-mono text-[var(--color-text-muted)]">{proofSection.aggregate}</p>
          <p className="mt-8 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {proofSection.transparencyNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Faq() {
  return (
    <section id={sectionIds.faq} className="scroll-mt-24 bg-[var(--color-canvas)] py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal variant="clip">
          <h2 className="font-display text-[2.5rem] font-semibold leading-[1.2]">{faqSection.heading}</h2>
        </Reveal>
        <Reveal delay={80} className="space-y-3">
          {implementationControl.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-canvas-raised bg-[var(--color-canvas-elevated)] px-5 py-1"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-semibold marker:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="text-xl font-normal text-[var(--color-signal-strong)] group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section
      id={sectionIds.finalCta}
      className="relative overflow-hidden bg-[var(--color-canvas-hero)] py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute -right-24 -top-24 size-80 rounded-full border-2 border-canvas-elevated" />
        <div className="absolute -bottom-16 -left-16 size-48 rounded-full border border-canvas-elevated" />
      </div>

      <div className="relative mx-auto max-w-[896px] px-6 text-center">
        <Reveal variant="clip">
          <h2 className="font-display text-[2.5rem] leading-[1.25] text-[var(--color-text-on-dark-primary)]">
            <span className="block font-bold">{finalCtaSection.headingBold}</span>
            <span className="block font-light">{finalCtaSection.headingLight}</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-[640px] leading-relaxed text-[var(--color-text-on-dark-primary)]">
            {finalCtaSection.body}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {finalCtaSection.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-text-on-dark-primary)]"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1 shrink-0 rounded-full bg-[var(--color-text-on-dark-primary)]"
                />
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={160} className="mt-10">
          <div className="flex justify-center">
            <TrackedCta location="final_cta" variant="cta">
              {ctaCopy.primary}
            </TrackedCta>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-on-dark-primary)]">
            {finalCtaSection.reassurance}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

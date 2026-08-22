"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { operatingPillars, sectionIds, type OperatingPillar } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const fields: { key: keyof OperatingPillar; label: string }[] = [
  { key: "connectedData", label: "Connected Information" },
  { key: "interpretation", label: "AI Interpretation" },
  { key: "aiActions", label: "AI Action" },
  { key: "managerControl", label: "Manager Control" },
  { key: "outcome", label: "Resulting State" },
];

/**
 * The five operating pillars as substantial, sticky stacked cards — not a
 * grid of small feature tiles. Each card pins in place via CSS `position:
 * sticky`; GSAP/ScrollTrigger only handles the outgoing card's scale/lift/
 * shadow as the next one arrives (scrubbed, not pinned — sticky already
 * does the "stay in place" work more cheaply). Disabled below the md
 * breakpoint and under reduced motion, where this becomes an ordinary
 * stacked sequence.
 */
export function OperatingPillars() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      if (window.matchMedia("(max-width: 1024px)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>(".pillar-card");
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        const shadow = card.querySelector<HTMLElement>(".pillar-shadow");
        const scrollTrigger = { trigger: next, start: "top bottom", end: "top top", scrub: true };
        // Only transform/opacity are tweened per frame — the "increasing
        // shadow" reads as a fixed-value shadow layer fading in via opacity
        // (compositor-only) rather than a box-shadow string recomputed on
        // every scroll tick, which was the site's main scroll-jank source.
        gsap.to(card, { scale: 0.96, y: -26, ease: "none", scrollTrigger });
        if (shadow) gsap.to(shadow, { opacity: 1, ease: "none", scrollTrigger });
      });
    },
    { scope: scopeRef, dependencies: [reducedMotion] },
  );

  return (
    <section id={sectionIds.pillars} className="bg-[var(--color-canvas)] py-20 sm:py-28">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-24">
          <p className="label-mono text-[var(--color-signal-strong)]">Five Operating Pillars</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Scheduling is one pillar. This is the whole operation.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            Labor, sales, inventory, tasks, and communication — coordinated
            within authority rules you configure.
          </p>
        </div>
      </Container>

      <div ref={scopeRef} className="relative">
        {operatingPillars.map((pillar, index) => (
          <div
            key={pillar.slug}
            className={reducedMotion ? "pillar-card" : "pillar-card lg:sticky lg:top-24"}
            style={{ zIndex: index + 1 }}
          >
            <Container className="pb-6 lg:pb-10">
              <PillarCard pillar={pillar} />
            </Container>
          </div>
        ))}
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: OperatingPillar }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        className="pillar-shadow pointer-events-none absolute inset-0 rounded-[3px] opacity-0"
        style={{ boxShadow: "0 36px 80px -20px rgba(23,19,16,0.38)" }}
        aria-hidden
      />
      <article className="ticket-slip relative border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] p-8 sm:p-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="lg:w-[280px] lg:flex-shrink-0">
            <p className="ticket-number">TICKET {pillar.ticketNumber}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold leading-snug text-[var(--color-text-primary)] sm:text-3xl">
              {pillar.title}
            </h3>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">{pillar.signals}</p>
          </div>

          <div className="min-w-0 flex-1">
            <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {fields.map((field) => (
                <div key={field.key} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <dt className="label-mono text-[var(--color-signal-strong)]">{field.label}</dt>
                  <dd className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">{pillar[field.key]}</dd>
                </div>
              ))}
            </dl>

            <div className="ticket-slip mt-6 px-5 pb-4 pt-5">
              <p className="label-mono text-[var(--color-text-muted)]">Illustrative Example</p>
              <p className="mt-1.5 max-w-[64ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">{pillar.example}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

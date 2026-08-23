"use client";

import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { audienceSegments, sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { useInView } from "@/lib/motion";

const convergenceSignals = [
  { label: "Connect", transform: "translate(-160px, -64px) rotate(-8deg)" },
  { label: "Understand", transform: "translate(150px, -74px) rotate(6deg)" },
  { label: "Act", transform: "translate(-136px, 70px) rotate(5deg)" },
  { label: "Improve", transform: "translate(154px, 62px) rotate(-6deg)" },
] as const;

const demoOutcomes = [
  "Walk through the workflow as it runs today",
  "Identify the first practical place to connect WorkforceOS",
  "Leave with a clear pilot starting point",
];

export function FinalCta() {
  const [sectionRef, visible] = useInView<HTMLElement>();

  return (
    <section ref={sectionRef} id={sectionIds.finalCta} className="overflow-hidden bg-[var(--color-canvas-dark)] py-16 sm:py-20">
      <Container className="max-w-[1200px]">
        <div className="relative mx-auto mb-14 flex h-32 max-w-3xl items-center justify-center" aria-hidden>
          {convergenceSignals.map((signal, index) => (
            <span
              key={signal.label}
              className={visible ? "animate-converge absolute" : "absolute opacity-0"}
              style={
                {
                  "--converge-from": signal.transform,
                  animationDelay: `${index * 80}ms`,
                } as CSSProperties
              }
            >
              <span className="ticket-slip label-mono inline-flex items-center gap-2 px-3 py-1.5 text-[var(--color-text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
                {signal.label}
              </span>
            </span>
          ))}
          <span
            className={visible ? "animate-fade-up font-display text-3xl font-semibold text-[var(--color-text-on-dark-primary)]" : "opacity-0"}
            style={{ animationDelay: "900ms" }}
          >
            WorkforceOS
          </span>
        </div>

        <div className="mb-12 border-b border-[var(--color-border-on-dark)] pb-6">
          <p className="text-sm text-[var(--color-text-on-dark-muted)]">Built for shift-based teams in</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[var(--color-text-on-dark-primary)]">
            {audienceSegments.map((segment) => (
              <li key={segment.slug}>{segment.name}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-on-dark-primary)] sm:text-5xl lg:text-6xl">
              Bring us the workflow your managers spend too much time chasing.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)]">
              Tell us where the day breaks down. We&apos;ll prepare the walkthrough around that real workflow.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                href="/demo"
                size="lg"
                variant="primary"
                arrow
                onClick={() => trackEvent("demo_cta_click", { location: "final_cta" })}
              >
                Book a Demo
              </Button>
              <p className="text-sm text-[var(--color-text-on-dark-muted)]">A tailored walkthrough, not a generic sales deck.</p>
            </div>
          </div>

          <div className="border-y border-[var(--color-border-on-dark)] py-6">
            <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">What you&apos;ll leave understanding</p>
            <ul className="mt-5 space-y-4">
              {demoOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">
                  <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-[var(--color-status-resolved)]">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </Container>
    </section>
  );
}

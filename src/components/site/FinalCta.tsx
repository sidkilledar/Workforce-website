"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { audienceSegments, sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

const demoOutcomes = [
  "Walk through the workflow as it runs today",
  "Identify the first practical place to connect WorkforceOS",
  "Leave with a clear pilot starting point",
];

export function FinalCta() {
  return (
    <section id={sectionIds.finalCta} className="bg-[var(--color-canvas-dark)] py-16 sm:py-20">
      <Container className="max-w-[1200px]">
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

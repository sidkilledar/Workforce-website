"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pilotImpact, sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

const demoOutcomes = [
  "Map one high-friction workflow from signal to resolution",
  "See where manager approval belongs and what can be automated",
  "Identify which existing systems would provide the operating context",
];

export function FinalCta() {
  return (
    <section id={sectionIds.finalCta} className="bg-[var(--color-canvas-dark)] py-16 sm:py-20">
      <Container className="max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-on-dark-primary)] sm:text-5xl lg:text-6xl">
              Bring us the workflow your managers spend too much time chasing.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)]">
              We&apos;ll show you how WorkforceOS could connect the signal, prepare the response, and keep the right decision
              with your manager—using the operation you already run.
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

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--color-border-on-dark)] pt-5 text-xs text-[var(--color-text-on-dark-muted)]">
          <span>{pilotImpact.organizations} active customer pilots</span>
          <span>{pilotImpact.frontlineUsers} frontline users across their teams</span>
          <span>Existing systems considered during implementation</span>
        </div>
      </Container>
    </section>
  );
}

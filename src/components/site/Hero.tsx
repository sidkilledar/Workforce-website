"use client";

import { Atmosphere } from "@/components/ui/Atmosphere";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/ui/RevealText";
import { OperationsPanel, type OperationsPanelState } from "@/components/site/OperationsPanel";
import { trackEvent } from "@/lib/analytics";

const bootState: OperationsPanelState = {
  caption: "LIVE OPERATING VIEW",
  pulse: "resolved",
  forecastLabel: "Balanced this week",
  coverageLabel: "Fully staffed",
  coverageStatus: "resolved",
  approvalStatus: "approved",
  taskStatus: "done",
  highlightCell: null,
};

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-28"
      style={{ background: `var(--gradient-atmosphere), var(--color-canvas-dark)` }}
    >
      <Atmosphere variant="dark" dense />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="animate-fade-up">AI OPERATIONS FOR SHIFT-BASED TEAMS</Badge>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <RevealText text="Your operations should run themselves." baseDelay={100} />
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)] sm:text-xl"
            style={{ animationDelay: "420ms" }}
          >
            Workforce OS learns how your organization runs, forecasts staffing and labor
            needs, builds smarter schedules, fills coverage gaps, and handles the
            repetitive work that slows managers down.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "500ms" }}
          >
            <Button
              href="/demo"
              variant="light"
              size="lg"
              magnetic
              arrow
              onClick={() => trackEvent("demo_cta_click", { location: "hero" })}
            >
              Book a Demo
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              See How It Works
            </Button>
          </div>

          <p
            className="animate-fade-up mt-6 text-sm text-[var(--color-text-on-dark-muted)]"
            style={{ animationDelay: "580ms" }}
          >
            Built for restaurants, chains, catering teams, campuses, and frontline
            organizations.
          </p>
        </div>

        <div
          className="animate-fade-up mx-auto mt-16 max-w-4xl sm:mt-20"
          style={{ animationDelay: "680ms" }}
        >
          <OperationsPanel state={bootState} />
        </div>
      </Container>
    </section>
  );
}

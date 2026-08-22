"use client";

import { Atmosphere } from "@/components/ui/Atmosphere";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RevealText } from "@/components/ui/RevealText";
import { LoopDiagram } from "@/components/site/LoopDiagram";
import { sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section
      id={sectionIds.hero}
      className="relative overflow-hidden bg-[var(--color-canvas-dark)] pb-20 pt-20 sm:pb-28 sm:pt-24"
    >
      <Atmosphere variant="dark" dense />
      <Container className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-14">
        <div className="max-w-2xl text-center lg:text-left">
          <Badge className="animate-fade-up text-[var(--color-text-on-dark-secondary)]">
            AI Ops Manager For Shift-Based Teams
          </Badge>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--color-text-on-dark-primary)] sm:text-6xl lg:text-[3.75rem]">
            <RevealText text="Stay in the loop. Not in the weeds." baseDelay={100} />
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)] sm:text-xl lg:mx-0"
            style={{ animationDelay: "420ms" }}
          >
            WorkforceOS is the AI ops manager for shift-based teams. It
            schedules your staff, absorbs the daily chaos — call-outs,
            no-shows, headcount changes — and keeps managers informed instead
            of buried.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            style={{ animationDelay: "500ms" }}
          >
            <Button
              href="/demo"
              variant="primary"
              size="lg"
              magnetic
              arrow
              onClick={() => trackEvent("demo_cta_click", { location: "hero" })}
            >
              Book a Demo
            </Button>
            <Button href={`#${sectionIds.howItWorks}`} variant="secondary" size="lg">
              See How It Works
            </Button>
          </div>

          <p
            className="animate-fade-up mt-6 text-sm text-[var(--color-text-on-dark-muted)]"
            style={{ animationDelay: "580ms" }}
          >
            Built for caterers, restaurant groups, and campus sports &amp;
            recreation departments running on student and hourly staff.
          </p>
        </div>

        <div className="animate-fade-up flex-shrink-0" style={{ animationDelay: "300ms" }}>
          <LoopDiagram size={280} className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[400px] lg:w-[400px]" />
        </div>
      </Container>
    </section>
  );
}

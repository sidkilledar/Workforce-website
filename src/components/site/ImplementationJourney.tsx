"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { OperationsPanel } from "@/components/site/OperationsPanel";
import { implementationSteps } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const panelState = {
  caption: "READY TO DEPLOY",
  pulse: "resolved" as const,
  forecastLabel: "Balanced this week",
  coverageLabel: "Fully staffed",
  coverageStatus: "resolved" as const,
  approvalStatus: "approved" as const,
  taskStatus: "done" as const,
  highlightCell: null,
};

export function ImplementationJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    for (const node of stepRefs.current) {
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <Section className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Start with the workflows creating the most friction.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-24">
          <div className="relative space-y-10 border-l border-[var(--color-border)] pl-9">
            {implementationSteps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={step.number}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  data-index={index}
                  className="relative"
                >
                  <span
                    className={cn(
                      "label-mono absolute -left-[46px] top-0 flex h-7 w-7 items-center justify-center rounded-md border transition-colors duration-300",
                      isActive
                        ? "border-transparent bg-[image:var(--gradient-brand)] text-white"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)]",
                    )}
                  >
                    {index + 1}
                  </span>
                  <h3
                    className={cn(
                      "text-lg font-medium transition-colors duration-300",
                      isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 max-w-md text-sm leading-relaxed transition-colors duration-300",
                      isActive ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {step.description}
                  </p>
                  {index === 0 && (
                    <Button
                      href="/demo"
                      size="md"
                      arrow
                      className="mt-5"
                      onClick={() => trackEvent("demo_cta_click", { location: "implementation_journey" })}
                    >
                      Book a Demo
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <OperationsPanel state={panelState} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

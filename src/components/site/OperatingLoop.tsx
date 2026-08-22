"use client";

import { Atmosphere } from "@/components/ui/Atmosphere";
import { Container } from "@/components/ui/Container";
import { ScrollStory, type ScrollStoryStep } from "@/components/ui/ScrollStory";
import { LoopDiagram } from "@/components/site/LoopDiagram";
import { operatingLoopStages, sectionIds } from "@/lib/site-config";

const locationCodes = ["LOC 04", "LOC 12", "LOC 07", "LOC 01"];

export function OperatingLoop() {
  const steps: ScrollStoryStep[] = operatingLoopStages.map((stage) => ({
    key: stage.key,
    content: (
      <div>
        <p className="label-mono text-[var(--color-signal-soft)]">
          {stage.number} / {stage.title.toUpperCase()}
        </p>
        <h3 className="font-display mt-3 text-2xl font-semibold text-[var(--color-text-on-dark-primary)] sm:text-3xl">
          {stage.heading}
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
          {stage.description}
        </p>
      </div>
    ),
  }));

  return (
    <section
      id={sectionIds.howItWorks}
      className="relative overflow-hidden bg-[var(--color-canvas-dark)] py-24 sm:py-28"
    >
      <Atmosphere variant="dark" />
      <Container className="relative">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-soft)]">The Operating Loop</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-on-dark-primary)] sm:text-4xl">
            Sense → Plan → Act → Verify
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            Every exception runs through one loop. WorkforceOS works it
            continuously — noticing, deciding, acting, and confirming — so it
            doesn&apos;t sit unresolved in a group chat.
          </p>
        </div>

        <ScrollStory
          steps={steps}
          renderVisual={(activeIndex) => (
            <LoopDiagram size={480} locations={locationCodes} activeIndex={activeIndex} />
          )}
        />
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { operationalAreas, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { OperationSelector } from "@/components/site/OperationSelector";
import { OperationsDashboard } from "@/components/site/OperationsDashboard";

/**
 * Replaces the old five-card sticky pillar stack: one connected-operations
 * product showcase. A manager picks an operational area on the left (or, on
 * mobile, opens its accordion row); the command-center visual on the right
 * updates to show that area's signal, AI recommendation, and outcome — the
 * same dashboard, not five separate feature descriptions. Fully native
 * document scroll throughout: no pin, no scrub, no horizontal hijacking.
 */
export function ConnectedOperationsShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id={sectionIds.pillars} className="bg-[var(--color-canvas)] py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Five operational questions. One place to answer them.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            See the signal, understand why it matters, and let WorkforceOS prepare or carry out the next step within the
            authority rules your team controls.
          </p>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <OperationSelector areas={operationalAreas} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
          </div>
          <div className="hidden md:block lg:col-span-8">
            <OperationsDashboard areas={operationalAreas} selectedIndex={selectedIndex} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

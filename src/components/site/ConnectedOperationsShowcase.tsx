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
    <section id={sectionIds.pillars} className="bg-[var(--color-canvas)] py-20 sm:py-24">
      <Container className="max-w-[1280px]">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="label-mono text-[var(--color-signal-strong)]">One Connected Operation</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Everything a manager needs to run the day.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            WorkforceOS connects labor, sales, inventory, tasks, and team
            communication — then helps coordinate the next action within
            rules your team controls.
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

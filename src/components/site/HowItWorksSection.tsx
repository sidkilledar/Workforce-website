"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ScrollStory, type ScrollStoryStep } from "@/components/ui/ScrollStory";
import { OperationsPanel, type OperationsPanelState } from "@/components/site/OperationsPanel";
import { howItWorksStages } from "@/lib/site-config";

const stageStates: OperationsPanelState[] = [
  {
    caption: "01 — LEARNING YOUR OPERATION",
    pulse: "signal",
    forecastLabel: "Reading patterns…",
    coverageLabel: "—",
    coverageStatus: "ok",
    approvalStatus: "none",
    taskStatus: "pending",
    highlightCell: null,
    scheduleVisibility: 0.28,
  },
  {
    caption: "02 — FORECASTING DEMAND",
    pulse: "signal",
    forecastLabel: "+18% expected",
    coverageLabel: "Calculating…",
    coverageStatus: "ok",
    approvalStatus: "none",
    taskStatus: "pending",
    highlightCell: null,
    scheduleVisibility: 0.65,
  },
  {
    caption: "03 — COORDINATING THE DAY",
    pulse: "resolving",
    forecastLabel: "+18% expected",
    coverageLabel: "1 gap — monitoring",
    coverageStatus: "warning",
    approvalStatus: "pending",
    taskStatus: "assigned",
    highlightCell: { row: 2, col: 3 },
    scheduleVisibility: 1,
  },
  {
    caption: "04 — HANDLING IT AUTOMATICALLY",
    pulse: "resolved",
    forecastLabel: "On track",
    coverageLabel: "Fully staffed",
    coverageStatus: "resolved",
    approvalStatus: "approved",
    taskStatus: "done",
    highlightCell: null,
    scheduleVisibility: 1,
  },
];

export function HowItWorksSection() {
  const steps: ScrollStoryStep[] = howItWorksStages.map((stage) => ({
    key: stage.number,
    content: (
      <div>
        <p className="label-mono text-[var(--color-accent-cyan-ink)]">{stage.number}</p>
        <h3 className="font-display mt-3 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
          {stage.title}
        </h3>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--color-text-secondary)]">
          {stage.description}
        </p>
      </div>
    ),
  }));

  return (
    <Section id="how-it-works">
      <Container>
        <ScrollStory
          eyebrow="ONE OPERATING LAYER"
          title="It learns your operation. Then it helps run it."
          description="Workforce OS understands your staffing patterns, business hours, roles, locations, team availability, demand, and operating rules. It turns those signals into coordinated action."
          steps={steps}
          renderVisual={(activeIndex) => <OperationsPanel state={stageStates[activeIndex]!} />}
        />
      </Container>
    </Section>
  );
}

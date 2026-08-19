"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ScrollStory, type ScrollStoryStep } from "@/components/ui/ScrollStory";
import { OperationsPanel, type OperationsPanelState } from "@/components/site/OperationsPanel";
import { operationalTimeline } from "@/lib/site-config";

const stageStates: OperationsPanelState[] = [
  {
    caption: "6:10 AM — EMPLOYEE CALLS OUT",
    pulse: "signal",
    forecastLabel: "Baseline",
    coverageLabel: "1 shift open",
    coverageStatus: "warning",
    approvalStatus: "none",
    taskStatus: "pending",
    highlightCell: { row: 0, col: 1 },
  },
  {
    caption: "7:30 AM — DEMAND FORECAST CHANGES",
    pulse: "signal",
    forecastLabel: "+18% expected",
    coverageLabel: "1 shift open",
    coverageStatus: "warning",
    approvalStatus: "none",
    taskStatus: "pending",
    highlightCell: { row: 0, col: 1 },
  },
  {
    caption: "9:15 AM — COVERAGE GAP DETECTED",
    pulse: "risk",
    forecastLabel: "+18% expected",
    coverageLabel: "Gap — dinner service",
    coverageStatus: "warning",
    approvalStatus: "none",
    taskStatus: "pending",
    highlightCell: { row: 0, col: 4 },
  },
  {
    caption: "11:40 AM — APPROVAL PENDING",
    pulse: "resolving",
    forecastLabel: "+18% expected",
    coverageLabel: "Gap — dinner service",
    coverageStatus: "warning",
    approvalStatus: "pending",
    taskStatus: "pending",
    highlightCell: { row: 0, col: 4 },
  },
  {
    caption: "2:00 PM — CLOSING TASK UNASSIGNED",
    pulse: "resolving",
    forecastLabel: "+18% expected",
    coverageLabel: "Gap — dinner service",
    coverageStatus: "warning",
    approvalStatus: "pending",
    taskStatus: "pending",
    highlightCell: { row: 0, col: 4 },
  },
  {
    caption: "WORKFORCE OS — CONSOLIDATED",
    pulse: "resolved",
    forecastLabel: "On track",
    coverageLabel: "Fully staffed",
    coverageStatus: "resolved",
    approvalStatus: "approved",
    taskStatus: "done",
    highlightCell: null,
  },
];

export function ProblemSection() {
  const steps: ScrollStoryStep[] = [
    ...operationalTimeline.map((item, index) => ({
      key: item.time,
      content: (
        <div>
          <p className="label-mono text-[var(--color-accent-cyan-ink)]">
            {String(index + 1).padStart(2, "0")} / {operationalTimeline.length + 1}
          </p>
          <p className="label-mono mt-3 text-[var(--color-text-muted)]">{item.time}</p>
          <h3 className="font-display mt-2 text-2xl font-semibold text-[var(--color-text-primary)] sm:text-3xl">
            {item.event}
          </h3>
        </div>
      ),
    })),
    {
      key: "consolidated",
      content: (
        <div>
          <p className="label-mono text-[var(--color-accent-cyan-ink)]">
            {operationalTimeline.length + 1} / {operationalTimeline.length + 1}
          </p>
          <p className="label-mono mt-3 text-[var(--color-text-muted)]">ONE SYSTEM</p>
          <h3 className="font-display mt-2 text-2xl font-semibold text-[var(--color-text-primary)] sm:text-3xl">
            Every signal lands in one place — and Workforce OS resolves it.
          </h3>
        </div>
      ),
    },
  ];

  return (
    <Section className="bg-[var(--color-canvas-raised)]">
      <Container>
        <ScrollStory
          eyebrow="THE REALITY OF FRONTLINE OPERATIONS"
          title="Your managers are running the business through texts, spreadsheets, and memory."
          description="Schedules change. Employees call out. Demand moves. Approvals wait. Tasks get missed. Managers spend their day chasing updates instead of leading the operation."
          steps={steps}
          renderVisual={(activeIndex) => <OperationsPanel state={stageStates[activeIndex]!} />}
        />
      </Container>
    </Section>
  );
}

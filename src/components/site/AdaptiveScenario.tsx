"use client";

import { useState } from "react";
import { scenarios, type ScenarioKey } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { OperationsPanel, type OperationsPanelState } from "@/components/site/OperationsPanel";
import { cn } from "@/lib/cn";

const panelStates: Record<ScenarioKey, OperationsPanelState> = {
  normal: {
    caption: "NORMAL WEEKDAY",
    pulse: "idle",
    forecastLabel: "Baseline",
    coverageLabel: "Fully staffed",
    coverageStatus: "ok",
    approvalStatus: "none",
    taskStatus: "done",
    highlightCell: null,
  },
  spike: {
    caption: "DEMAND SPIKE + 2 CALL-OUTS",
    pulse: "risk",
    forecastLabel: "+38% vs. baseline",
    coverageLabel: "High risk — dinner",
    coverageStatus: "warning",
    approvalStatus: "pending",
    taskStatus: "pending",
    highlightCell: { row: 0, col: 4 },
  },
};

const rows: { label: string; key: keyof typeof scenarios.normal }[] = [
  { label: "Forecast demand", key: "forecastDemand" },
  { label: "Required staffing hours", key: "staffingHours" },
  { label: "Coverage risk", key: "coverageRisk" },
  { label: "Suggested adjustment", key: "suggestedAdjustment" },
];

export function AdaptiveScenario() {
  const [scenario, setScenario] = useState<ScenarioKey>("normal");
  const data = scenarios[scenario];

  return (
    <Section className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-accent-cyan-ink)]">THE PLAN CHANGES BEFORE THE SHIFT DOES</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            When operations change, Workforce OS responds.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-10 flex max-w-md justify-center gap-2 rounded-full border border-[var(--color-border)] p-1">
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setScenario(key)}
              className={cn(
                "flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                scenario === key
                  ? "bg-[image:var(--gradient-brand)] text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
              )}
            >
              {scenarios[key].label}
            </button>
          ))}
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <OperationsPanel state={panelStates[scenario]} />
          </div>

          <div>
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">{data.description}</p>

            <div className="mt-6 space-y-3">
              {rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between border-b border-[var(--color-border)] py-3"
                >
                  <span className="label-mono flex items-center gap-2 text-[var(--color-text-muted)]">
                    <span className="h-1.5 w-1.5 shrink-0 bg-[var(--color-accent-cyan)]" />
                    {row.label}
                  </span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{data[row.key]}</span>
                </div>
              ))}
            </div>

            <GlassPanel className="mt-6 p-5">
              <p className="label-mono text-[var(--color-accent-cyan-ink)]">Recommendation for manager</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-primary)]">{data.recommendation}</p>
            </GlassPanel>

            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
              Illustrative example for demonstration purposes only — not real customer data.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

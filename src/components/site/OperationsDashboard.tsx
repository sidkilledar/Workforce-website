"use client";

import { useEffect, useState } from "react";
import { useCrossfadeSwap } from "@/lib/motion";
import type {
  CommunicationWorkspace,
  InventoryWorkspace,
  LaborWorkspace,
  OperationalArea,
  SalesWorkspace,
  TasksWorkspace,
} from "@/lib/site-config";
import { ConnectedSignalRail } from "@/components/site/ConnectedSignalRail";
import { AiActionPanel } from "@/components/site/AiActionPanel";

const availabilityColor: Record<string, string> = {
  available: "var(--color-status-resolved)",
  tentative: "var(--color-signal)",
  unavailable: "var(--color-text-on-dark-muted)",
};

const taskStatusLabel: Record<string, string> = {
  "on-track": "On track",
  "at-risk": "At risk",
  reassigned: "Reassigned",
};

const taskStatusColor: Record<string, string> = {
  "on-track": "var(--color-status-resolved)",
  "at-risk": "var(--color-signal)",
  reassigned: "var(--color-text-on-dark-muted)",
};

const rowDelay = (index: number) => index * 45;

/**
 * The command-center visual: one coherent product surface, not a grid of
 * unrelated cards. Four stacked layers — toolbar, connected-signal rail,
 * workspace (changes per selected operational area), and the AI action
 * panel. Mounted once; only visible md+ (mobile gets the accordion instead
 * of a duplicate dashboard).
 */
export function OperationsDashboard({ areas, selectedIndex }: { areas: OperationalArea[]; selectedIndex: number }) {
  const { displayed: area, fading } = useCrossfadeSwap(areas[selectedIndex]!);
  // Derived, not synced: "Just now" whenever the settled index hasn't
  // caught up with the current selection yet; the effect only performs the
  // actual (callback-based) delayed state update.
  const [settledIndex, setSettledIndex] = useState<number | null>(null);
  const syncLabel = settledIndex === selectedIndex ? "2 min ago" : "Just now";

  useEffect(() => {
    const timer = window.setTimeout(() => setSettledIndex(selectedIndex), 2200);
    return () => window.clearTimeout(timer);
  }, [selectedIndex]);

  const fadeStyle = fading ? { opacity: 0.35, transition: "opacity 140ms var(--ease-out)" } : undefined;

  return (
    <div className="overflow-hidden rounded-[4px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] paper-stack-dark">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-[var(--color-border-on-dark)] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-semibold text-[var(--color-text-on-dark-primary)]">WorkforceOS</span>
          <span className="label-mono text-[var(--color-text-on-dark-muted)]">Thursday · All Locations</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 label-mono text-[var(--color-text-on-dark-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-resolved)]" aria-hidden />
            Live
          </span>
          <span className="label-mono text-[var(--color-text-on-dark-muted)]">Synced {syncLabel}</span>
        </div>
      </div>

      <ConnectedSignalRail areas={areas} selectedIndex={selectedIndex} />

      <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[1fr_320px] lg:gap-6">
        <div key={area.slug} className="dashboard-enter min-h-[280px]" style={fadeStyle}>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <div style={{ transitionDelay: `${rowDelay(0)}ms` }}>
              <p className="label-mono text-[var(--color-signal-soft)]">Signal</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-text-on-dark-primary)]">{area.signal}</p>
            </div>
            <div style={{ transitionDelay: `${rowDelay(1)}ms` }}>
              <p className="label-mono text-[var(--color-text-on-dark-muted)]">Context</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">{area.context}</p>
            </div>
          </div>

          <div className="mt-6" style={{ transitionDelay: `${rowDelay(2)}ms` }}>
            <WorkspaceBody area={area} />
          </div>

          <div
            className="mt-6 flex items-start gap-3 border-t border-[var(--color-border-on-dark)] pt-5"
            style={{ transitionDelay: `${rowDelay(3)}ms` }}
          >
            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-status-resolved)]" aria-hidden />
            <p className="text-sm font-medium leading-relaxed text-[var(--color-text-on-dark-primary)]">{area.outcome}</p>
          </div>
        </div>

        <AiActionPanel key={`panel-${area.slug}`} area={area} rowDelay={rowDelay} />
      </div>

      <p className="label-mono border-t border-[var(--color-border-on-dark)] px-5 py-3 text-[var(--color-text-on-dark-muted)] sm:px-6">
        Illustrative operations view — not a live customer environment.
      </p>
    </div>
  );
}

function WorkspaceBody({ area }: { area: OperationalArea }) {
  switch (area.workspace.kind) {
    case "labor":
      return <LaborBody workspace={area.workspace} />;
    case "sales":
      return <SalesBody workspace={area.workspace} />;
    case "inventory":
      return <InventoryBody workspace={area.workspace} />;
    case "tasks":
      return <TasksBody workspace={area.workspace} />;
    case "communication":
      return <CommunicationBody workspace={area.workspace} />;
  }
}

function LaborBody({ workspace }: { workspace: LaborWorkspace }) {
  return (
    <div className="rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-4">
      <p className="label-mono text-[var(--color-text-on-dark-muted)]">Coverage overview</p>
      <p className="mt-1.5 text-sm text-[var(--color-text-on-dark-primary)]">{workspace.coverageSummary}</p>

      <div className="mt-4 rounded-[3px] border border-[var(--color-signal)] bg-[rgba(255,78,31,0.08)] p-3">
        <p className="label-mono text-[var(--color-signal)]">{workspace.gapShift.label}</p>
        <p className="mt-1 text-sm text-[var(--color-text-on-dark-primary)]">
          {workspace.gapShift.time} — {workspace.gapShift.detail}
        </p>
      </div>

      <p className="label-mono mt-4 text-[var(--color-text-on-dark-muted)]">Availability</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {workspace.availability.map((worker) => (
          <li
            key={worker.name}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-border-on-dark)] px-2.5 py-1 text-xs text-[var(--color-text-on-dark-secondary)]"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: availabilityColor[worker.status] }} aria-hidden />
            {worker.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SalesBody({ workspace }: { workspace: SalesWorkspace }) {
  const max = Math.max(...workspace.demand.map((point) => point.value), ...workspace.scheduledLabor.map((point) => point.value));
  return (
    <div className="rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-4">
      <p className="label-mono text-[var(--color-text-on-dark-muted)]">Demand signal vs. scheduled labor</p>
      <div className="mt-4 flex h-24 items-stretch gap-4">
        {workspace.demand.map((point, index) => {
          const scheduled = workspace.scheduledLabor[index]!;
          return (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 items-end justify-center gap-1">
                <div
                  className="w-2.5 rounded-t-sm bg-[var(--color-border-on-dark)]"
                  style={{ height: `${(scheduled.value / max) * 100}%` }}
                />
                <div className="w-2.5 rounded-t-sm bg-[var(--color-signal)]" style={{ height: `${(point.value / max) * 100}%` }} />
              </div>
              <span className="label-mono text-[var(--color-text-on-dark-muted)]">{point.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="flex items-center gap-1.5 label-mono text-[var(--color-text-on-dark-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-on-dark)]" aria-hidden />
          Scheduled labor
        </span>
        <span className="flex items-center gap-1.5 label-mono text-[var(--color-text-on-dark-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" aria-hidden />
          Demand signal
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">{workspace.mismatch}</p>
    </div>
  );
}

function InventoryBody({ workspace }: { workspace: InventoryWorkspace }) {
  return (
    <div className="rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">{workspace.item}</p>
        <span className="label-mono rounded-full bg-[rgba(255,78,31,0.12)] px-2.5 py-1 text-[var(--color-signal)]">
          {workspace.threshold}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">{workspace.requiredAction}</p>

      <div className="mt-4 rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] p-3">
        <p className="label-mono text-[var(--color-status-resolved)]">Task created</p>
        <p className="mt-1 text-sm text-[var(--color-text-on-dark-primary)]">{workspace.createdTask.title}</p>
        <p className="label-mono mt-1 text-[var(--color-text-on-dark-muted)]">
          {workspace.createdTask.assignee} · Due {workspace.createdTask.due}
        </p>
      </div>
    </div>
  );
}

function TasksBody({ workspace }: { workspace: TasksWorkspace }) {
  return (
    <div className="rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-4">
      <p className="label-mono text-[var(--color-text-on-dark-muted)]">Task queue</p>
      <ul className="mt-2 divide-y divide-[var(--color-border-on-dark)]">
        {workspace.queue.map((task) => (
          <li key={task.title} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm text-[var(--color-text-on-dark-primary)]">{task.title}</p>
              <p className="label-mono mt-0.5 text-[var(--color-text-on-dark-muted)]">
                {task.owner} · {task.due}
              </p>
            </div>
            <span
              className="label-mono flex-shrink-0 rounded-full px-2 py-1"
              style={{ color: taskStatusColor[task.status], backgroundColor: "rgba(255,78,31,0.1)" }}
            >
              {taskStatusLabel[task.status]}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-[3px] border border-[var(--color-signal)] bg-[rgba(255,78,31,0.08)] p-3">
        <p className="text-sm text-[var(--color-text-on-dark-primary)]">
          <span className="text-[var(--color-text-on-dark-muted)]">Reassigned:</span> {workspace.reassignedTask.title}
        </p>
        <p className="label-mono mt-1 text-[var(--color-text-on-dark-muted)]">
          {workspace.reassignedTask.from} → {workspace.reassignedTask.to} · {workspace.reassignedTask.relatedEvent}
        </p>
      </div>
    </div>
  );
}

function CommunicationBody({ workspace }: { workspace: CommunicationWorkspace }) {
  return (
    <div className="rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-4">
      <p className="label-mono text-[var(--color-text-on-dark-muted)]">Affected</p>
      <p className="mt-1.5 text-sm text-[var(--color-text-on-dark-primary)]">{workspace.affected}</p>

      <p className="label-mono mt-4 text-[var(--color-text-on-dark-muted)]">Activity history</p>
      <ul className="mt-2 space-y-2">
        {workspace.history.map((entry) => (
          <li key={entry.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-[var(--color-text-on-dark-secondary)]">{entry.label}</span>
            <span className="label-mono flex-shrink-0 text-[var(--color-text-on-dark-muted)]">{entry.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

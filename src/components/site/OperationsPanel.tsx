"use client";

import { Fragment } from "react";
import { cn } from "@/lib/cn";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const roles = ["Line cook", "Server", "Shift lead", "Host"];
const baseGrid = [
  [1, 1, 1, 0.6, 1, 1, 0.3],
  [0.5, 0.5, 0.7, 1, 1, 1, 0.4],
  [1, 1, 1, 1, 1, 1, 0.5],
  [0.3, 0.3, 0.5, 0.8, 1, 1, 0.3],
];

export type OperationsPanelState = {
  /** Small mono caption in the top bar, e.g. an event label or stage name. */
  caption: string;
  pulse: "idle" | "signal" | "risk" | "resolving" | "resolved";
  forecastLabel: string;
  coverageLabel: string;
  coverageStatus: "ok" | "warning" | "resolved";
  approvalStatus: "none" | "pending" | "approved";
  taskStatus: "pending" | "assigned" | "done";
  highlightCell?: { row: number; col: number } | null;
  /** 0–1: how "built up" the schedule grid appears. Defaults to fully visible. */
  scheduleVisibility?: number;
};

const pulseColor: Record<OperationsPanelState["pulse"], string> = {
  idle: "bg-[var(--color-border-strong)]",
  signal: "bg-[var(--color-accent-cyan-ink)]",
  risk: "bg-amber-400",
  resolving: "bg-[var(--color-accent-cobalt)]",
  resolved: "bg-emerald-500",
};

const coverageColor: Record<OperationsPanelState["coverageStatus"], string> = {
  ok: "text-[var(--color-text-secondary)]",
  warning: "text-amber-600",
  resolved: "text-emerald-600",
};

export function OperationsPanel({
  state,
  className,
}: {
  state: OperationsPanelState;
  className?: string;
}) {
  return (
    <div className={cn("glass-panel relative overflow-hidden rounded-3xl p-4 sm:p-6", className)}>
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-500",
              pulseColor[state.pulse],
              state.pulse !== "idle" && "animate-pulse-glow",
            )}
          />
          <span className="label-mono text-[var(--color-text-muted)]">{state.caption}</span>
        </div>
        <span className="label-mono hidden text-[var(--color-text-muted)] sm:inline">
          WORKFORCE OS
        </span>
      </div>

      <div
        className="mt-5 grid grid-cols-[40px_repeat(7,minmax(0,1fr))] gap-1 transition-opacity duration-700 sm:grid-cols-[64px_repeat(7,minmax(0,1fr))] sm:gap-2"
        style={{ opacity: state.scheduleVisibility ?? 1 }}
      >
        <div />
        {days.map((day) => (
          <div
            key={day}
            className="label-mono min-w-0 truncate text-center text-[9px] text-[var(--color-text-muted)]"
          >
            {day}
          </div>
        ))}

        {roles.map((role, rowIndex) => (
          <Fragment key={role}>
            <div className="flex min-w-0 items-center truncate text-[10px] font-medium text-[var(--color-text-secondary)] sm:text-xs">
              {role}
            </div>
            {baseGrid[rowIndex]!.map((value, colIndex) => {
              const isHighlighted =
                state.highlightCell?.row === rowIndex && state.highlightCell?.col === colIndex;
              return (
                <div
                  key={`${role}-${days[colIndex]}`}
                  className={cn(
                    "h-7 rounded-md transition-all duration-500 sm:h-9",
                    isHighlighted && "ring-2 ring-amber-400",
                  )}
                  style={{
                    background:
                      value === 0
                        ? "transparent"
                        : isHighlighted
                          ? "linear-gradient(180deg, rgba(251,191,36,0.35), rgba(251,191,36,0.15))"
                          : `linear-gradient(180deg, rgba(157,184,255,${0.22 + value * 0.42}), rgba(182,175,255,${0.16 + value * 0.36}))`,
                    border: "1px solid var(--color-border)",
                  }}
                />
              );
            })}
          </Fragment>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--color-border)] pt-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-2">
          <p className="label-mono text-[var(--color-text-muted)]">Forecast</p>
          <p className="mt-1 text-xs font-medium text-[var(--color-text-primary)] transition-all duration-500 sm:text-sm">
            {state.forecastLabel}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-2">
          <p className="label-mono text-[var(--color-text-muted)]">Coverage</p>
          <p
            className={cn(
              "mt-1 text-xs font-medium transition-colors duration-500 sm:text-sm",
              coverageColor[state.coverageStatus],
            )}
          >
            {state.coverageLabel}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-2">
          <p className="label-mono text-[var(--color-text-muted)]">Approval</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-primary)] sm:text-sm">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                state.approvalStatus === "approved"
                  ? "bg-emerald-500"
                  : state.approvalStatus === "pending"
                    ? "bg-amber-400"
                    : "bg-[var(--color-border-strong)]",
              )}
            />
            {state.approvalStatus === "approved"
              ? "Approved"
              : state.approvalStatus === "pending"
                ? "Pending"
                : "—"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {["Opening checklist", "Prep list", "Closing tasks"].map((task, index) => {
          const done = state.taskStatus === "done" || (state.taskStatus === "assigned" && index === 0);
          return (
            <span
              key={task}
              className={cn(
                "label-mono flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors duration-500",
                done
                  ? "border-emerald-500/30 text-emerald-600"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)]",
              )}
            >
              <span className={cn("h-1 w-1 rounded-full", done ? "bg-emerald-500" : "bg-[var(--color-border-strong)]")} />
              {task}
            </span>
          );
        })}
      </div>
    </div>
  );
}

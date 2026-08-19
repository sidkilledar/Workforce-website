"use client";

import { cn } from "@/lib/cn";

const bars = [0.35, 0.55, 0.4, 0.75, 0.9, 0.6, 1];

function Forecasting() {
  return (
    <div className="flex h-full items-end justify-center gap-2.5 px-6">
      {bars.map((height, index) => (
        <div key={index} className="h-full w-6 overflow-hidden rounded-t-md bg-white/60">
          <div
            className="animate-bar-grow h-full w-full rounded-t-md"
            style={{
              background: "linear-gradient(180deg, var(--color-accent-cyan), var(--color-accent-cobalt))",
              transform: `scaleY(${height})`,
              animationDelay: `${index * 90}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function SmartScheduling() {
  const cells = Array.from({ length: 21 });
  return (
    <div className="grid h-full grid-cols-7 gap-1.5 px-8 py-6">
      {cells.map((_, index) => (
        <div
          key={index}
          className="animate-fade-up rounded-md"
          style={{
            background: "linear-gradient(180deg, rgba(91,79,239,0.55), rgba(157,184,255,0.4))",
            border: "1px solid rgba(91,79,239,0.16)",
            animationDelay: `${index * 35}ms`,
          }}
        />
      ))}
    </div>
  );
}

function ShiftCoverage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border text-[10px]",
              index === 2
                ? "border-amber-500/50 bg-amber-400/20 text-amber-700"
                : "border-[rgba(217,119,6,0.16)] bg-white/70 text-[var(--color-text-muted)]",
            )}
          >
            {index === 2 ? "!" : ""}
          </div>
        ))}
      </div>
      <div className="animate-check-pop flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs text-emerald-700">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Coverage found
      </div>
    </div>
  );
}

function Approvals() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="glass-panel w-56 rounded-xl p-4">
        <p className="label-mono text-[var(--color-text-muted)]">Time-off request</p>
        <p className="mt-1 text-sm text-[var(--color-text-primary)]">J. Alvarez — Sat, Sep 6</p>
        <div className="animate-fade-up mt-3 flex items-center gap-1.5 text-xs text-emerald-600" style={{ animationDelay: "500ms" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Approved
        </div>
      </div>
    </div>
  );
}

function TeamCommunication() {
  return (
    <div className="relative flex h-full items-center justify-center px-10">
      <div className="relative h-px w-full bg-[rgba(46,92,255,0.2)]">
        {[0, 0.5, 1].map((delay) => (
          <span
            key={delay}
            className="animate-travel absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{
              background: "var(--color-accent-cobalt)",
              boxShadow: "0 0 12px var(--color-accent-cobalt)",
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCoordination() {
  const tasks = ["Opening checklist", "Prep list", "Closing tasks"];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-8">
      {tasks.map((task, index) => (
        <div
          key={task}
          className="animate-fade-up flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"
          style={{ animationDelay: `${index * 220}ms` }}
        >
          <span className="animate-check-pop flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/25 text-emerald-700" style={{ animationDelay: `${index * 220 + 180}ms` }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {task}
        </div>
      ))}
    </div>
  );
}

function OperationalFollowUps() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="glass-panel flex w-56 items-center justify-between rounded-xl px-4 py-3">
        <span className="text-sm text-[var(--color-text-primary)]">Closing task</span>
        <span className="animate-pulse-glow rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] text-amber-700">
          UNRESOLVED
        </span>
      </div>
      <div className="animate-fade-up flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]" style={{ animationDelay: "500ms" }}>
        Auto follow-up sent to next available lead
      </div>
    </div>
  );
}

const visuals: Record<string, () => React.JSX.Element> = {
  forecasting: Forecasting,
  "smart-scheduling": SmartScheduling,
  "shift-coverage": ShiftCoverage,
  approvals: Approvals,
  "team-communication": TeamCommunication,
  "task-coordination": TaskCoordination,
  "operational-follow-ups": OperationalFollowUps,
};

/** Each capability gets its own tinted card background — a distinct color per
 * feature rather than one uniform panel, echoing a colorful product-card grid. */
const tints: Record<string, string> = {
  forecasting: "bg-[#eef2ff] border-[rgba(46,92,255,0.14)]",
  "smart-scheduling": "bg-[#f2f0fe] border-[rgba(91,79,239,0.14)]",
  "shift-coverage": "bg-[#fef6ea] border-[rgba(217,119,6,0.16)]",
  approvals: "bg-[#eafbf3] border-[rgba(5,150,105,0.16)]",
  "team-communication": "bg-[#eef2ff] border-[rgba(46,92,255,0.14)]",
  "task-coordination": "bg-[#f2f0fe] border-[rgba(91,79,239,0.14)]",
  "operational-follow-ups": "bg-[#fef6ea] border-[rgba(217,119,6,0.16)]",
};

export function CapabilityVisual({ slug, className }: { slug: string; className?: string }) {
  const Visual = visuals[slug] ?? Forecasting;
  return (
    <div
      className={cn(
        "h-56 overflow-hidden rounded-2xl border sm:h-64",
        tints[slug] ?? "bg-[var(--color-canvas-raised)] border-[var(--color-border)]",
        className,
      )}
    >
      <Visual key={slug} />
    </div>
  );
}

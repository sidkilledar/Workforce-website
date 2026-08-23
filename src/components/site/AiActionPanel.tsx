import { authorityLevels, type OperationalArea } from "@/lib/site-config";

const authorityColor: Record<OperationalArea["authorityMode"], string> = {
  inform: "var(--color-status-resolved)",
  recommend: "var(--color-signal)",
  execute: "var(--color-signal)",
};

const primaryActionLabel: Record<OperationalArea["authorityMode"], string> = {
  inform: "Acknowledge",
  recommend: "Approve",
  execute: "Mark Reviewed",
};

/**
 * The dashboard's focal point: what WorkforceOS recommends, why, which
 * systems informed it, whether it needs approval, and what a manager can
 * do about it right now. Approve/Review controls are illustrative — this
 * is a marketing surface, not the live product — so they're inert beyond
 * their own press feedback.
 */
export function AiActionPanel({ area, rowDelay }: { area: OperationalArea; rowDelay: (index: number) => number }) {
  const authority = authorityLevels.find((level) => level.key === area.authorityMode)!;

  return (
    <div className="dashboard-enter-panel rounded-[4px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label-mono text-[var(--color-signal-soft)]">AI Recommendation</p>
        <span
          className="label-mono rounded-full px-2.5 py-1"
          style={{ color: authorityColor[area.authorityMode], backgroundColor: "rgba(255,78,31,0.12)" }}
        >
          {authority.title}
        </span>
      </div>

      <p
        className="font-display mt-4 text-xl font-semibold leading-snug text-[var(--color-text-on-dark-primary)] sm:text-2xl"
        style={{ transitionDelay: `${rowDelay(0)}ms` }}
      >
        {area.recommendation}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]" style={{ transitionDelay: `${rowDelay(1)}ms` }}>
        {area.reason}
      </p>

      <div className="mt-4 flex flex-wrap gap-2" style={{ transitionDelay: `${rowDelay(2)}ms` }}>
        {area.connectedSystems.map((system) => (
          <span
            key={system}
            className="label-mono rounded-full border border-[var(--color-border-on-dark)] px-2.5 py-1 text-[var(--color-text-on-dark-muted)]"
          >
            {system}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3" style={{ transitionDelay: `${rowDelay(3)}ms` }}>
        <button
          type="button"
          className="rounded-[3px] bg-[var(--color-signal)] px-4 py-2 text-sm font-medium text-[var(--color-canvas-dark)] transition-transform duration-[var(--duration-hover)] active:scale-[0.97] active:duration-[var(--duration-press)]"
        >
          {primaryActionLabel[area.authorityMode]}
        </button>
        <button
          type="button"
          className="rounded-[3px] border border-[var(--color-border-on-dark)] px-4 py-2 text-sm font-medium text-[var(--color-text-on-dark-secondary)] transition-transform duration-[var(--duration-hover)] active:scale-[0.97] active:duration-[var(--duration-press)]"
        >
          Review
        </button>
        <p className="label-mono ml-auto text-[var(--color-text-on-dark-muted)]">Logged to activity history</p>
      </div>
    </div>
  );
}

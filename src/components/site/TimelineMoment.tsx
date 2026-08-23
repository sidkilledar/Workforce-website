"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { authorityLevels, type DayTimelineMoment } from "@/lib/site-config";

const glyphByIndex = [
  // Briefing: a short stacked-lines glyph.
  <path key="briefing" d="M4 6h16M4 12h16M4 18h10" />,
  // Mid-day: a signal/response glyph — two converging arrows.
  <path key="response" d="M4 6l16 12M20 6L4 18M4 6v6M20 18v-6" />,
  // Close: a checkmark-in-record glyph.
  <path key="close" d="M4 4h16v16H4z M8 12l3 3 6-6" />,
];

/**
 * One moment in the three-step day timeline. The connected-system labels
 * highlight on hover — desktop, fine-pointer only — but nothing essential
 * depends on that hover; everything is plain text underneath it.
 */
export function TimelineMoment({
  moment,
  index,
  emphasized,
  active,
  className,
}: {
  moment: DayTimelineMoment;
  index: number;
  emphasized?: boolean;
  /** Whether the section's one-shot entrance has played — gates the marker/content reveal. */
  active: boolean;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const authority = authorityLevels.find((level) => level.key === moment.authorityMode)!;
  const delay: CSSProperties = { transitionDelay: `${index * 70}ms` };

  return (
    <div
      className={cn(
        "timeline-moment relative flex flex-row items-start gap-4 md:flex-col md:items-stretch md:gap-3",
        emphasized && "md:scale-[1.03]",
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn("flex flex-shrink-0 flex-col items-center gap-1.5 md:flex-row md:gap-3 animate-timeline-marker", active && "is-active")}
        style={delay}
      >
        <span
          aria-hidden
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border bg-[var(--color-canvas)]",
            emphasized ? "border-[var(--color-signal)] text-[var(--color-signal-strong)]" : "border-[var(--color-border-strong)] text-[var(--color-text-muted)]",
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {glyphByIndex[index]}
            </g>
          </svg>
        </span>
        <p className="ticket-number">{moment.time}</p>
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col gap-3 animate-timeline-content", active && "is-active")} style={delay}>
        <h3 className="font-display text-xl font-semibold leading-snug text-[var(--color-text-primary)] sm:text-2xl">{moment.title}</h3>
        <p className="max-w-[46ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">{moment.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {moment.connectedSystems.map((system) => (
            <span
              key={system}
              className="label-mono rounded-full border px-2.5 py-1 transition-colors duration-200"
              style={{
                borderColor: hovered ? "var(--color-signal-strong)" : "var(--color-border)",
                color: hovered ? "var(--color-signal-strong)" : "var(--color-text-muted)",
              }}
            >
              {system}
            </span>
          ))}
        </div>

        <p className="label-mono" style={{ color: authority.key === "inform" ? "var(--color-status-resolved)" : "var(--color-signal-strong)" }}>
          {authority.title}
        </p>

        <div className="mt-1 flex items-start gap-2 border-t border-[var(--color-border)] pt-3">
          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-status-resolved)]" aria-hidden />
          <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">{moment.outcome}</p>
        </div>
      </div>
    </div>
  );
}

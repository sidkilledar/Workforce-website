"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { authorityLevels, type OperationalArea } from "@/lib/site-config";

const statusColor: Record<OperationalArea["authorityMode"], string> = {
  inform: "var(--color-text-muted)",
  recommend: "var(--color-signal-strong)",
  execute: "var(--color-status-resolved)",
};

/**
 * The five operational-area selectors. Desktop/tablet render one accessible
 * tablist (roving focus, arrow-key navigation) that CSS alone reflows from
 * a horizontally-scrollable row (tablet) to a stacked column (desktop) —
 * the dashboard it drives is mounted once, not duplicated per breakpoint.
 * Mobile gets a fully separate, self-contained accordion (native
 * `<details name>` for mutually-exclusive, keyboard/screen-reader-friendly
 * rows) with its own compact mini-summary — never the full dashboard.
 */
export function OperationSelector({
  areas,
  selectedIndex,
  onSelect,
}: {
  areas: OperationalArea[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % areas.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + areas.length) % areas.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = areas.length - 1;
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <>
      {/* Tablet: horizontally-scrollable row, above the dashboard. Desktop:
          stacked column, left of the dashboard. Same markup, CSS reflow. */}
      <div
        role="tablist"
        aria-label="Operational areas"
        aria-orientation="vertical"
        className="hidden gap-3 overflow-x-auto md:flex md:flex-row lg:flex-col lg:overflow-visible"
      >
        {areas.map((area, index) => {
          const selected = index === selectedIndex;
          return (
            <button
              key={area.slug}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              role="tab"
              id={`operation-tab-${area.slug}`}
              aria-selected={selected}
              aria-controls="operation-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "operation-tab relative flex w-64 flex-shrink-0 items-start gap-3 overflow-hidden rounded-[3px] border px-4 py-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-strong)] md:w-72 lg:w-full",
                selected ? "border-[var(--color-canvas-dark)] bg-[var(--color-canvas-dark)]" : "border-[var(--color-border)] bg-[var(--color-canvas-elevated)]",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-y-2 left-0 w-[3px] bg-[var(--color-signal)]"
                style={{
                  transform: selected ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "center",
                  transition: "transform 200ms var(--ease-out)",
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      selected ? "text-[var(--color-text-on-dark-primary)]" : "text-[var(--color-text-primary)]",
                    )}
                  >
                    {area.question}
                  </span>
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: statusColor[area.authorityMode] }}
                  />
                </div>
                <p
                  className={cn(
                    "mt-1 text-[13px] leading-snug",
                    selected ? "text-[var(--color-text-on-dark-secondary)]" : "text-[var(--color-text-secondary)]",
                  )}
                >
                  {area.name} · {area.summary}
                </p>
              </div>
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className={cn(
                  "operation-tab-chevron mt-0.5 flex-shrink-0",
                  selected ? "text-[var(--color-text-on-dark-muted)]" : "text-[var(--color-text-muted)]",
                )}
              >
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Mobile: independent accordion — not synced to the tablist above,
          which is hidden at this width. Only one row open at a time via the
          native `name` grouping; defaults to Labor & Staffing. */}
      <div className="md:hidden">
        {areas.map((area, index) => (
          <details
            key={area.slug}
            name="operation-areas"
            open={index === 0}
            className="group border-b border-[var(--color-border)] first:border-t"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-4 marker:content-none">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{area.question}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-[var(--color-text-secondary)]">
                  {area.name} · {area.summary}
                </p>
              </div>
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-ui)] ease-out group-open:rotate-90"
              >
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="pb-5">
              <MiniSummary area={area} />
            </div>
          </details>
        ))}
      </div>
    </>
  );
}

function MiniSummary({ area }: { area: OperationalArea }) {
  const authority = authorityLevels.find((level) => level.key === area.authorityMode)!;
  return (
    <div className="ticket-slip p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono text-[var(--color-signal-strong)]">AI Recommendation</p>
        <span
          className="label-mono rounded-full px-2.5 py-1"
          style={{ color: "var(--color-signal-strong)", backgroundColor: "var(--color-signal-soft)" }}
        >
          {authority.title}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--color-text-primary)]">{area.signal}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{area.recommendation}</p>
      <div className="mt-3 flex items-start gap-2 border-t border-[var(--color-border)] pt-3">
        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-status-resolved)]" aria-hidden />
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{area.outcome}</p>
      </div>
    </div>
  );
}

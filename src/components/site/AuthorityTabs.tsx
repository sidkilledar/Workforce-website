"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { authorityModes } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/motion";

type Direction = -1 | 0 | 1;

/**
 * Inform → Recommend → Execute as one horizontal permission rail: a sliding
 * marker tracks the active stop, the rail fills only up to it, and the panel
 * below swaps with a direction-aware slide so moving forward/backward reads
 * differently. Standard ARIA tabs underneath — the rail is presentation on
 * top of accessible tab semantics, not a replacement for them.
 */
export function AuthorityTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  const active = authorityModes[activeIndex]!;
  const direction: Direction = activeIndex === previousIndex ? 0 : activeIndex > previousIndex ? 1 : -1;
  const railFillPercent = (activeIndex / (authorityModes.length - 1)) * 100;

  function select(index: number) {
    if (index === activeIndex) return;
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
    trackEvent("authority_mode_select", { mode: authorityModes[index]!.key });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % authorityModes.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + authorityModes.length) % authorityModes.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = authorityModes.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    select(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <div>
      {/* Decorative rail: track, fill, and three dots laid out with
          justify-between so the fill's 0/50/100% width always lines up with
          the dot it needs to reach — independent of the actual tab buttons'
          text-driven widths below. */}
      <div aria-hidden className="relative flex h-4 items-center justify-between">
        <span className="absolute inset-x-0 h-px bg-[var(--color-border-on-dark)]" />
        <span
          className="absolute left-0 h-px bg-[var(--color-signal)]"
          style={{
            width: `${railFillPercent}%`,
            transition: reducedMotion ? "width 180ms linear" : "width 300ms var(--ease-out)",
          }}
        />
        {authorityModes.map((mode, index) => (
          <span
            key={mode.key}
            className="relative z-10 h-[9px] w-[9px] rounded-full border-2 transition-colors duration-[var(--duration-state)]"
            style={{
              borderColor: index === activeIndex ? "var(--color-signal)" : "var(--color-border-on-dark)",
              backgroundColor: index < activeIndex ? "var(--color-status-resolved)" : "var(--color-canvas-dark)",
            }}
          />
        ))}
      </div>

      <div role="tablist" aria-label="Authority modes" className="mt-2 grid grid-cols-3 gap-3">
        {authorityModes.map((mode, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={mode.key}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`authority-tab-${mode.key}`}
              aria-selected={selected}
              aria-controls="authority-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "group flex min-h-11 items-start rounded-full px-3 py-1.5 text-left transition-colors duration-[var(--duration-state)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-soft)]",
                selected ? "bg-[var(--color-signal)]/15" : "bg-transparent",
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium leading-snug transition-colors duration-[var(--duration-state)] sm:text-base",
                  selected
                    ? "text-[var(--color-text-on-dark-primary)]"
                    : "text-[var(--color-text-on-dark-secondary)] group-hover:text-[var(--color-text-on-dark-primary)]",
                )}
              >
                {mode.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 min-h-[132px] overflow-hidden">
        <div
          key={active.key}
          id="authority-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`authority-tab-${active.key}`}
          className={reducedMotion ? "authority-panel-fade" : direction >= 0 ? "authority-panel-enter-forward" : "authority-panel-enter-back"}
        >
          <p className="max-w-[52ch] text-base leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            {active.description}
          </p>
          <div className="mt-5 border-t border-[var(--color-border-on-dark)] pt-4">
            <p className="label-mono text-[var(--color-text-on-dark-muted)]">Example</p>
            <p className="mt-1.5 text-sm font-medium text-[var(--color-text-on-dark-primary)]">{active.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

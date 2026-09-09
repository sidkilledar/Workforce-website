"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { confirmedCapabilities } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/motion";

type Direction = -1 | 0 | 1;
type Rect = { top: number; left: number; width: number; height: number };

// useLayoutEffect measures and positions the indicator before the browser
// paints (no flash of "no selection shown"); it's a no-op warning on the
// server, so fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Four confirmed capability tabs, scheduling first and visually dominant by
 * default. One shared active-tab indicator slides behind the selected tab
 * (measured from the tab's own layout, not guessed from column math — labels
 * are different lengths), and the panel below swaps with the same
 * direction-aware entrance the authority track uses, so the two tab systems
 * on this page move the same way.
 */
export function CapabilityTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [indicatorRect, setIndicatorRect] = useState<Rect | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const active = confirmedCapabilities[activeIndex]!;
  const direction: Direction = activeIndex === previousIndex ? 0 : activeIndex > previousIndex ? 1 : -1;

  function measure(index: number) {
    const button = buttonRefs.current[index];
    const tablist = tablistRef.current;
    if (!button || !tablist) return;
    const buttonBox = button.getBoundingClientRect();
    const tablistBox = tablist.getBoundingClientRect();
    setIndicatorRect({
      top: buttonBox.top - tablistBox.top,
      left: buttonBox.left - tablistBox.left,
      width: buttonBox.width,
      height: buttonBox.height,
    });
  }

  useIsomorphicLayoutEffect(() => {
    measure(activeIndex);
    // Re-measure on resize/wrap — below `sm` the tabs stack into a single
    // column, so the indicator has to track top/height, not just left/width.
    const handleResize = () => measure(activeIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  function select(index: number) {
    if (index === activeIndex) return;
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
    trackEvent("capability_tab_select", { capability: confirmedCapabilities[index]!.slug });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % confirmedCapabilities.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + confirmedCapabilities.length) % confirmedCapabilities.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = confirmedCapabilities.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    select(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] p-4 sm:p-6">
      <div ref={tablistRef} role="tablist" aria-label="Confirmed capabilities" className="relative grid gap-1 sm:grid-cols-4">
        {indicatorRect && (
          <div
            aria-hidden
            className="absolute rounded-[3px] bg-[var(--color-signal-strong)]"
            style={{
              top: indicatorRect.top,
              left: indicatorRect.left,
              width: indicatorRect.width,
              height: indicatorRect.height,
              transition: reducedMotion
                ? "none"
                : "top 260ms var(--ease-out), left 260ms var(--ease-out), width 260ms var(--ease-out), height 260ms var(--ease-out)",
            }}
          />
        )}
        {confirmedCapabilities.map((capability, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={capability.slug}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`capability-tab-${capability.slug}`}
              aria-selected={selected}
              aria-controls="capability-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "relative z-10 min-h-11 rounded-[3px] px-3 py-2.5 text-left text-sm font-medium transition-colors duration-[var(--duration-ui)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-strong)]",
                selected
                  ? "text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-black/[0.04] hover:text-[var(--color-text-primary)]",
              )}
            >
              {capability.tabLabel}
            </button>
          );
        })}
      </div>

      <div className="relative mt-6 min-h-[168px] overflow-hidden border-t border-[var(--color-border)] pt-6">
        <div
          key={active.slug}
          id="capability-panel"
          role="tabpanel"
          aria-labelledby={`capability-tab-${active.slug}`}
          className={reducedMotion ? "authority-panel-fade" : direction >= 0 ? "authority-panel-enter-forward" : "authority-panel-enter-back"}
        >
          <p className="max-w-[56ch] text-base leading-relaxed text-[var(--color-text-primary)]">{active.description}</p>
          {active.example && (
            <div className="ticket-slip mt-5 inline-flex px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">
              {active.example}
            </div>
          )}
          {active.qualifier && (
            <p className="mt-5 text-sm font-medium text-[var(--color-signal-strong)]">{active.qualifier}</p>
          )}
        </div>
      </div>
    </div>
  );
}

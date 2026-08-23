"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { audienceSegments, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type AudienceSegment = (typeof audienceSegments)[number];

/**
 * Three selectable industry lanes sharing one detail panel — not three
 * equal-sized cards. The tablist stays a single vertical column at every
 * width (nothing to reflow), so mobile gets the same stacked, accessible
 * pattern as desktop rather than a separate accordion.
 */
export function AudienceSegments() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = audienceSegments[activeIndex]!;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % audienceSegments.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + audienceSegments.length) % audienceSegments.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = audienceSegments.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <Section id={sectionIds.whoItsFor} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">Who It&apos;s For</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Built around the way shift-based operations actually run.
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-3 lg:grid-cols-[0.6fr_1.4fr] lg:gap-8">
          <div role="tablist" aria-label="Industry" aria-orientation="vertical" className="flex flex-col gap-2">
            {audienceSegments.map((segment, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={segment.slug}
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`audience-tab-${segment.slug}`}
                  aria-selected={selected}
                  aria-controls={`audience-panel-${segment.slug}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn(
                    "relative flex flex-col items-start gap-1 overflow-hidden rounded-[3px] border py-3 pl-5 pr-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal-strong)]",
                    selected
                      ? "border-[var(--color-border-strong)] bg-[var(--color-canvas-elevated)]"
                      : "border-transparent hover:bg-[var(--color-canvas-elevated)]/60",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-2 left-0 w-[3px] bg-[var(--color-signal)]"
                    style={{
                      transform: selected ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: "center",
                      transition: "transform 220ms var(--ease-out)",
                    }}
                  />
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{segment.name}</span>
                  <span className="text-[13px] leading-snug text-[var(--color-text-secondary)]">{segment.situation}</span>
                </button>
              );
            })}
          </div>

          <AudienceDetail segment={active} />
        </Reveal>
      </Container>
    </Section>
  );
}

function AudienceDetail({ segment }: { segment: AudienceSegment }) {
  return (
    <div
      key={segment.slug}
      id={`audience-panel-${segment.slug}`}
      role="tabpanel"
      aria-labelledby={`audience-tab-${segment.slug}`}
      className="dashboard-enter ticket-slip flex h-full flex-col justify-center gap-5 p-5 sm:p-6"
    >
      <div>
        <p className="label-mono text-[var(--color-text-muted)]">What this looks like</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {segment.traits.map((trait) => (
            <li
              key={trait}
              className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
            >
              {trait}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-dashed border-[var(--color-border-strong)] pt-5">
        <p className="label-mono text-[var(--color-signal-strong)]">Suggested workflow</p>
        <p className="mt-2 text-[15px] font-medium leading-relaxed text-[var(--color-text-primary)]">
          {segment.workflow.join(" → ")}
        </p>
      </div>
    </div>
  );
}

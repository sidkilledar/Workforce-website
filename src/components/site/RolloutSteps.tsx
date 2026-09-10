"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { implementationSteps } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The How-it-works left column: the four rollout steps as a single-open
 * accordion stepper on the charcoal (#23201a) surface. The open step gets the
 * solid sage fill and shows its description; the rest collapse to a title-only
 * row on a 5%-white card. This is an accordion (not a tabs widget): every
 * trigger is a normal Tab stop, with Up/Down/Home/End as an added convenience.
 * No analytics — the trackEvent name union is frozen.
 */
export function RolloutSteps() {
  const [openIndex, setOpenIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  function open(index: number) {
    setOpenIndex(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % implementationSteps.length;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + implementationSteps.length) % implementationSteps.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = implementationSteps.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    open(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <ul className="flex flex-col gap-4">
      {implementationSteps.map((step, index) => {
        const active = index === openIndex;
        const panelId = `rollout-step-panel-${step.number}`;
        return (
          <li key={step.number}>
            <Reveal delay={index * 80}>
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                aria-expanded={active}
                aria-controls={panelId}
                onClick={() => open(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-xl p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-soft)]",
                  !reducedMotion && "transition-colors duration-[var(--duration-state)]",
                  active ? "bg-[var(--color-signal)]" : "bg-white/5 hover:bg-white/10",
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 font-mono text-sm leading-5",
                    !reducedMotion && "transition-colors duration-[var(--duration-state)]",
                    active ? "text-white/60" : "text-[var(--color-signal)]",
                  )}
                >
                  {step.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-extrabold leading-7 text-[var(--color-text-on-dark-primary)]">
                    {step.title}
                  </span>
                  <span
                    id={panelId}
                    role="region"
                    aria-label={step.title}
                    hidden={!active}
                    className="mt-2 block text-sm leading-[1.625] text-white/70"
                  >
                    {step.description}
                  </span>
                </span>
              </button>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

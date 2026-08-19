"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ScrollStoryStep = {
  key: string;
  content: ReactNode;
};

/**
 * Pinned scroll-driven narrative: a sticky visual pane stays in view while
 * text steps pass underneath, each activating in turn as it crosses the
 * vertical center of the viewport. Falls back to a simple stacked layout
 * (no pinning) below the md breakpoint, per the mobile-first requirement
 * that pinned sequences become swipeable/stacked narratives on small screens.
 */
export function ScrollStory({
  steps,
  renderVisual,
  className,
  eyebrow,
  title,
  description,
}: {
  steps: ScrollStoryStep[];
  renderVisual: (activeIndex: number) => ReactNode;
  className?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const node of stepRefs.current) {
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className={className}>
      {(eyebrow || title || description) && (
        <div className="mx-auto mb-14 max-w-2xl text-center">
          {eyebrow && <p className="label-mono text-[var(--color-accent-cyan-ink)]">{eyebrow}</p>}
          {title && (
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{description}</p>
          )}
        </div>
      )}

      {/* Desktop / tablet: pinned visual + scroll-activated steps. */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className="relative">
          <div className="sticky top-24 py-12">{renderVisual(activeIndex)}</div>
        </div>
        <div>
          {steps.map((step, index) => (
            <div
              key={step.key}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              data-index={index}
              className={cn(
                "flex min-h-[70vh] flex-col justify-center transition-opacity duration-500",
                index === activeIndex ? "opacity-100" : "opacity-40",
              )}
            >
              {step.content}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked narrative, one visual state per step, no pinning. */}
      <div className="flex flex-col gap-6 md:hidden">
        {steps.map((step, index) => (
          <div key={step.key} className="flex flex-col gap-6">
            <div>{renderVisual(index)}</div>
            <div>{step.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// The vertical scroll distance required per panel transition, in viewport
// heights — deliberately decoupled from the panels' actual pixel width (a
// literal 1:1 scroll-to-pan mapping across N nearly-full-width panels would
// demand many viewport-heights of scrolling). Keeps the gallery short to
// scroll through regardless of how wide each panel renders.
const VH_PER_STEP = 0.35;

export type ScrollStoryStep = {
  key: string;
  content: ReactNode;
};

/**
 * The site's one pinned scroll narrative: a horizontal, scroll-jacked
 * gallery. The section pins in place and vertical scroll input translates a
 * horizontal track of panels (one per step) via ScrollTrigger — panel width
 * is CSS-percentage-based against the pinned viewport (no JS measurement to
 * go stale), and `invalidateOnRefresh` keeps the travel distance correct
 * across resizes. Releases once the last panel is reached. Falls back to a
 * normal vertical stacked layout (no pin, no horizontal translate) under
 * reduced motion and below the md breakpoint.
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
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !pinRef.current || !trackRef.current) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const pin = pinRef.current;
      const track = trackRef.current;
      const getDistance = () => track.scrollWidth - pin.clientWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * (steps.length - 1) * VH_PER_STEP}`,
          pin: true,
          scrub: 0.3,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(steps.length - 1, Math.round(self.progress * (steps.length - 1)));
            setActiveIndex((current) => (current === index ? current : index));
          },
        },
      });
    },
    { scope: pinRef, dependencies: [reducedMotion, steps.length] },
  );

  const header = (eyebrow || title || description) && (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && <p className="label-mono text-[var(--color-signal-strong)]">{eyebrow}</p>}
      {title && (
        <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          {title}
        </h2>
      )}
      {description && <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{description}</p>}
    </div>
  );

  if (reducedMotion) {
    return (
      <div className={className}>
        {header}
        <div className="flex flex-col gap-6">
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

  return (
    <div className={className}>
      {header}

      {/* Desktop / tablet: pinned horizontal gallery, one panel per step. */}
      <div ref={pinRef} className="hidden overflow-hidden md:block">
        <div ref={trackRef} className="flex" style={{ width: `${steps.length * 100}%` }}>
          {steps.map((step, index) => (
            <div key={step.key} className="flex-shrink-0 px-2" style={{ width: `${100 / steps.length}%` }}>
              <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
                <div>{renderVisual(index)}</div>
                <div>{step.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 hidden justify-center gap-2 md:flex" role="presentation" aria-hidden>
        {steps.map((step, index) => (
          <span
            key={step.key}
            className="h-1.5 w-1.5 rounded-full transition-colors duration-[var(--duration-ui)]"
            style={{
              backgroundColor: index === activeIndex ? "var(--color-signal-strong)" : "var(--color-border-strong)",
            }}
          />
        ))}
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

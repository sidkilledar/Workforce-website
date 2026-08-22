"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useDocumentVisible } from "@/lib/motion";

/**
 * One fixed, full-viewport film-grain texture — replaces the old per-section
 * .bg-noise/.bg-noise-dark layers. Drifts in discrete steps (a new random
 * offset every ~110ms) rather than smoothly, which reads as grain rather
 * than a floating gradient. Pauses when the tab is hidden. Reduced motion
 * drops to a single static frame at a lower opacity rather than animating.
 *
 * Always aria-hidden and inert to pointer/selection — purely atmospheric.
 */
export function GrainOverlay() {
  const reducedMotion = usePrefersReducedMotion();
  const documentVisible = useDocumentVisible();
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (reducedMotion || !documentVisible) return;
    const node = rectRef.current;
    if (!node) return;

    let timeoutId: number;
    function step() {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      node?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      timeoutId = window.setTimeout(step, 90 + Math.random() * 60);
    }
    step();

    return () => window.clearTimeout(timeoutId);
  }, [reducedMotion, documentVisible]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 select-none"
      style={{ opacity: reducedMotion ? 0.02 : 0.05, mixBlendMode: "overlay" }}
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <filter id="site-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect ref={rectRef} x="-4" y="-4" width="calc(100% + 8px)" height="calc(100% + 8px)" filter="url(#site-grain)" />
      </svg>
    </div>
  );
}

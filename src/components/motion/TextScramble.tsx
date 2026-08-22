"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DURATION_MS = 650; // within the 550–750ms range

/**
 * A short operational label (STATUS text, never a paragraph or the H1)
 * that resolves left-to-right through randomized glyphs on entrance or
 * whenever `text` changes — e.g. a pending/approved state flip. Each
 * character settles once; nothing reshuffles continuously.
 *
 * Screen readers only ever get the final string: the scrambling characters
 * are aria-hidden, with the real text present as a visually-hidden sibling,
 * so the accessible name never depends on animation timing.
 */
export function TextScramble({
  text,
  trigger = true,
  className,
  style,
}: {
  text: string;
  /** Gate on this (e.g. useInView's boolean) so it only plays once actually visible. */
  trigger?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const animating = trigger && !reducedMotion;
  const [display, setDisplay] = useState(text);

  // Only the animating case touches state (it has to, to paint each rAF
  // frame); the non-animating case renders `text` directly below instead of
  // syncing it into state.
  useEffect(() => {
    if (!animating) return;

    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const resolvedCount = Math.floor(progress * text.length);
      let next = "";
      for (let i = 0; i < text.length; i += 1) {
        if (i < resolvedCount || text[i] === " ") next += text[i];
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animating, text]);

  return (
    <span className={className} style={style}>
      <span aria-hidden="true">{animating ? display : text}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

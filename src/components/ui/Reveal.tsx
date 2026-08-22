"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/motion";

export type RevealVariant = "soft" | "clip" | "state" | "none";

const variantClass: Record<Exclude<RevealVariant, "none">, string> = {
  soft: "animate-reveal-soft",
  clip: "animate-reveal-clip",
  state: "animate-reveal-state",
};

/**
 * Reveals children once they scroll into view. `variant` picks the motion
 * that fits the content — "soft" for most copy/cards, "clip" for display
 * headings, "state" for quick in-place UI changes, "none" for content that
 * should never be animated (already-critical or duplicated elsewhere).
 * Reduced-motion users still get the visibility toggle; the global
 * stylesheet removes the transform/clip-path so nothing stays hidden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "soft",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const [ref, visible] = useInView<HTMLDivElement>();

  if (variant === "none") {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(!visible && "opacity-0", visible && variantClass[variant], className)}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

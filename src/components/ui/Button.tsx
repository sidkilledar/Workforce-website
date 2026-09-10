"use client";

import Link from "next/link";
import { useRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "cta";
type Size = "md" | "lg";

// Hover feedback runs on --duration-hover (240ms); press feedback is
// standardized across every variant at scale(0.97) over --duration-press
// (140ms), independent of hover timing.
// The focus ring uses signal-strong, not the brighter signal — against the
// paper ring-offset gap, bright signal only reaches ~2.8:1, under the
// WCAG 3:1 non-text-contrast minimum for UI indicators; signal-strong clears
// it (~5:1).
// Border-radius is per-variant (not in `base`) so the pill-shaped `cta`
// variant can opt into `rounded-full` while everything else keeps the sharp
// 3px corner.
const base =
  "relative inline-flex items-center justify-center gap-2 font-medium transition-[transform,filter,background-color,border-color] duration-[var(--duration-hover)] active:scale-[0.97] active:duration-[var(--duration-press)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

// Focus ring is per-variant: paper-surface variants use signal-strong on a
// paper ring-offset gap; `cta` sits on the sage/charcoal bands where
// signal-strong is near-invisible (~1.8:1 on sage), so it takes a near-white
// ring on a transparent offset (~4.4:1 on sage, high contrast on charcoal).
const PAPER_RING =
  "focus-visible:ring-[var(--color-signal-strong)] focus-visible:ring-offset-[var(--color-canvas)]";

const variants: Record<Variant, string> = {
  // Flat signal-strong fill — no gradient — clears WCAG AA 4.5:1 with white
  // text (deep sage #3f5648 reaches ~8:1); the lighter signal alone would not.
  primary:
    `rounded-[3px] bg-[var(--color-signal-strong)] text-white shadow-[0_10px_28px_-12px_rgba(63,86,72,0.55)] hover:brightness-110 ${PAPER_RING}`,
  /** Outline style for placement on a solid dark ink block (e.g. the Hero, Operating Loop). */
  secondary:
    `rounded-[3px] border border-border-on-dark text-[var(--color-text-on-dark-primary)] hover:border-[var(--color-text-on-dark-primary)] hover:bg-white/5 ${PAPER_RING}`,
  ghost: `rounded-[3px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] ${PAPER_RING}`,
  /** Solid paper, for placement directly on a solid dark ink block. */
  light: `rounded-[3px] bg-[var(--color-canvas-elevated)] text-[var(--color-text-primary)] hover:bg-white ${PAPER_RING}`,
  /** Cream pill with sage-strong text — the green-Figma CTA on sage/charcoal
   *  bands (navbar, hero, final CTA). Self-contained: it carries its own
   *  padding, so the `size` prop is not applied for this variant. */
  cta: "rounded-full bg-[var(--color-canvas-elevated)] text-[var(--color-signal-strong)] px-6 py-3 font-medium shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)] hover:brightness-[0.97] focus-visible:ring-[var(--color-text-on-dark-primary)] focus-visible:ring-offset-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Subtle cursor-following pull, reserved for primary hero/CTA buttons. */
  magnetic?: boolean;
  /** Trailing arrow, reserved for primary conversion CTAs. */
  arrow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="transition-transform duration-[var(--duration-hover)] group-hover:translate-x-0.5"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", className, magnetic = false, arrow = false } = props;
  const classes = cn(base, "group", variants[variant], variant === "cta" ? null : sizes[size], className);
  const magnetRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (!magnetic) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const node = magnetRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28}px)`;
  }

  function handleMouseLeave() {
    const node = magnetRef.current;
    if (!node) return;
    node.style.transform = "";
  }

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <Link
        ref={magnetRef}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={classes}
      >
        {children}
        {arrow && <ArrowIcon />}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _children, variant: _variant, size: _size, className: _className, magnetic: _magnetic, arrow: _arrow, ...buttonProps } =
    props as ButtonAsButton;

  return (
    <button
      ref={magnetRef}
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...buttonProps}
    >
      {children}
      {arrow && <ArrowIcon />}
    </button>
  );
}

"use client";

import Link from "next/link";
import { useRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-[3px] font-medium transition-[transform,filter,background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] focus-visible:ring-[var(--color-signal)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-signal)] text-[#fbf8f1] shadow-[0_10px_28px_-12px_rgba(255,78,31,0.55)] hover:bg-[var(--color-signal-strong)] active:scale-[0.98]",
  /** Outline style for placement on a solid dark ink block (e.g. the Hero, Operating Loop). */
  secondary:
    "border border-[var(--color-border-on-dark)] text-[var(--color-text-on-dark-primary)] hover:border-[var(--color-text-on-dark-primary)] hover:bg-white/5 active:translate-y-0",
  ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
  /** Solid paper, for placement directly on a solid dark ink block. */
  light:
    "bg-[var(--color-canvas-elevated)] text-[var(--color-text-primary)] hover:bg-white active:scale-[0.98]",
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
      className="transition-transform duration-200 group-hover:translate-x-0.5"
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
  const classes = cn(base, "group", variants[variant], sizes[size], className);
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

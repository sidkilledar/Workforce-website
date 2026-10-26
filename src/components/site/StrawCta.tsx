"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/** Booking link for the Straw homepage, wired to analytics. */
export function StrawCta({
  location,
  children,
  variant = "primary",
}: {
  location: string;
  children: string;
  variant?: "primary" | "light";
}) {
  return (
    <Link
      href="/demo"
      className={`straw-home__btn straw-home__btn--${variant}`}
      onClick={() => trackEvent("demo_cta_click", { location })}
    >
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

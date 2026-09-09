"use client";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

/**
 * The "Book a Demo" button, wired to analytics. A thin client boundary so
 * the surrounding marketing sections (BusinessHomepage) can stay server
 * components — only the click handler needs the client runtime.
 */
export function TrackedCta({
  location,
  variant = "primary",
  children,
}: {
  location: string;
  variant?: "primary" | "light";
  children: string;
}) {
  return (
    <Button
      href="/demo"
      variant={variant}
      size="lg"
      magnetic={variant === "primary"}
      arrow
      onClick={() => trackEvent("demo_cta_click", { location })}
    >
      {children}
    </Button>
  );
}

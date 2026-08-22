import { cn } from "@/lib/cn";

/**
 * Shared atmospheric background: a fine structural grid, nothing else. Grain
 * now comes from the single global GrainOverlay, not a per-section layer;
 * there is no glow blob — this identity uses one signal color deliberately,
 * spent on real state (a live diagram node, a button), never as ambient
 * decoration. "light" (default) is tuned for the paper canvas; "dark" is
 * tuned for the retained bold/dark sections (Hero, Operating Cycle, Command
 * Center, FinalCta).
 */
export function Atmosphere({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          isDark ? "bg-grid-dark" : "bg-grid",
          "absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black_10%,transparent_72%)]",
        )}
      />
    </div>
  );
}

import { cn } from "@/lib/cn";

/**
 * Shared atmospheric background: fine structural grid plus a low-opacity
 * paper-grain layer. "light" (default) is tuned for the site's paper canvas —
 * used behind PageHero on every inner page. "dark" is tuned for the retained
 * bold/dark sections (Hero, Operating Loop, FinalCta). No color blobs — this
 * identity uses one signal color deliberately, not a wash of accent gradients.
 */
export function Atmosphere({
  className,
  dense = false,
  variant = "light",
}: {
  className?: string;
  dense?: boolean;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          isDark ? "bg-grid-dark" : "bg-grid",
          "absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black_10%,transparent_72%)]",
        )}
      />
      <div className={cn(isDark ? "bg-noise-dark" : "bg-noise", "absolute inset-0")} />
      {dense && (
        <div
          className={cn(
            "animate-pulse-glow absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--color-signal)] blur-[160px]",
            isDark ? "opacity-[0.14]" : "opacity-[0.06]",
          )}
        />
      )}
    </div>
  );
}

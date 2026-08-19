import { cn } from "@/lib/cn";

/**
 * Shared atmospheric background: fine structural grid, drifting radial
 * gradient light, and a low-opacity noise layer. "light" (default) is tuned
 * for the site's light canvas — used behind PageHero on every inner page.
 * "dark" is tuned for the two retained bold/dark sections (Hero, FinalCta).
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
      <div
        className={cn(
          "animate-drift absolute left-1/2 top-[-15%] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[var(--color-accent-cobalt)] blur-[140px]",
          isDark ? "opacity-[0.34]" : "opacity-[0.12]",
        )}
      />
      <div
        className={cn(
          "animate-drift-slow absolute right-[-12%] top-[15%] h-[480px] w-[480px] rounded-full bg-[var(--color-accent-violet)] blur-[140px]",
          isDark ? "opacity-[0.3]" : "opacity-[0.1]",
        )}
      />
      {dense && (
        <div
          className={cn(
            "animate-drift absolute left-[-10%] bottom-[-10%] h-[440px] w-[440px] rounded-full bg-[var(--color-accent-cyan)] blur-[140px] [animation-delay:-6s]",
            isDark ? "opacity-[0.2]" : "opacity-[0.09]",
          )}
        />
      )}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--color-text-secondary)] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

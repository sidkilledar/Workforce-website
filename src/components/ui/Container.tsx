import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Component className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
}

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

export function GlassPanel({ children, className, as: Component = "div", ...rest }: GlassPanelProps) {
  return (
    <Component className={cn("glass-panel rounded-2xl", className)} {...rest}>
      {children}
    </Component>
  );
}

import type { ReactNode } from "react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-28">
      <Atmosphere className="opacity-70" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <Badge>{eyebrow}</Badge>}
          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

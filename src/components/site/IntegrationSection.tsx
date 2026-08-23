"use client";

import { integrationCategories, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/motion";

export function IntegrationSection() {
  return (
    <Section id={sectionIds.integration}>
      <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Keep your systems. Connect the operation.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            WorkforceOS is configured around your workflows, locations, and
            approval rules. Integration scope depends on what your current
            systems expose — we confirm that before implementation.
          </p>
          <p className="mt-5 text-sm font-medium text-[var(--color-signal-strong)]">
            Connect → map → set authority → run from one view
          </p>
        </Reveal>

        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {integrationCategories.map((category, index) => (
            <CategoryRow key={category.category} category={category} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CategoryRow({ category, index }: { category: (typeof integrationCategories)[number]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={inView ? "animate-reveal-soft grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-6" : "grid gap-1 py-4 opacity-0 sm:grid-cols-[150px_1fr] sm:gap-6"}
      style={inView ? { animationDelay: `${index * 60}ms` } : undefined}
    >
      <h3 className="font-display text-base font-semibold text-[var(--color-text-primary)]">{category.category}</h3>
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{category.purpose}</p>
    </div>
  );
}

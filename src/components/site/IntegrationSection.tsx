"use client";

import { implementationSteps, integrationCategories, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/motion";

export function IntegrationSection() {
  return (
    <Section id={sectionIds.integration}>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">Integration &amp; Customization</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            WorkforceOS fits your operation — not the other way around.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            Every implementation is configured around your workflows,
            terminology, systems, locations, and approval structure. This is
            how it gets built.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl gap-3">
          {implementationSteps.map((step, index) => (
            <StepRow key={step.number} step={step} index={index} />
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-12">
          <p className="label-mono text-center text-[var(--color-text-muted)]">
            Connected By Category — Not Unverified Vendor Claims
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {integrationCategories.map((category, index) => (
              <CategoryCard key={category.category} category={category} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function StepRow({ step, index }: { step: (typeof implementationSteps)[number]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={inView ? "animate-reveal-soft flex gap-5 border-t border-[var(--color-border)] py-5" : "flex gap-5 border-t border-[var(--color-border)] py-5 opacity-0"}
      style={inView ? { animationDelay: `${index * 60}ms` } : undefined}
    >
      <span className="ticket-number w-8 flex-shrink-0 pt-1">{step.number}</span>
      <div>
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">{step.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{step.description}</p>
      </div>
    </div>
  );
}

function CategoryCard({ category, index }: { category: (typeof integrationCategories)[number]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={inView ? "animate-reveal-soft ticket-slip p-5" : "ticket-slip p-5 opacity-0"}
      style={inView ? { animationDelay: `${index * 60}ms` } : undefined}
    >
      <h4 className="font-display text-base font-semibold text-[var(--color-text-primary)]">{category.category}</h4>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">{category.purpose}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {category.exampleInputs.map((input) => (
          <li key={input} className="label-mono rounded-[3px] bg-[var(--color-canvas-raised)] px-2 py-1 text-[var(--color-text-muted)]">
            {input}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs italic leading-relaxed text-[var(--color-text-muted)]">{category.implementationQualifier}</p>
    </div>
  );
}

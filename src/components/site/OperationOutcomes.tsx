import { operationOutcomes, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function OperationOutcomes() {
  return (
    <Section id={sectionIds.outcomes}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          <Reveal>
            <p className="label-mono text-[var(--color-signal-strong)]">One System, Not Five</p>
            <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              Absorbs the chaos. Keeps you in the loop.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              WorkforceOS replaces the usual patchwork — a scheduling app,
              Slack or Discord, and a stream of texts and emails — with one
              system that actually runs the day.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {operationOutcomes.map((outcome, index) => (
              <Reveal key={outcome.title} delay={index * 60} className="border-t border-[var(--color-border)] pt-5">
                <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {outcome.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

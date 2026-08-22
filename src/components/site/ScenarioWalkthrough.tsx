import { scenarioWalkthrough, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function ScenarioWalkthrough() {
  return (
    <Section id={sectionIds.scenario} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">A Call-Out, Start To Finish</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            One shift opens up. Here&apos;s the loop closing it.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            An illustrative example of how a call-out gets resolved — not a
            specific customer&apos;s data.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-2xl">
          {scenarioWalkthrough.map((step, index) => (
            <Reveal key={step.title} delay={index * 50} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="ticket-number flex-shrink-0 pt-1">{step.time}</span>
                {index < scenarioWalkthrough.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-[var(--color-border-strong)]" aria-hidden />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { implementationControl, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Native <details>/<summary> — keyboard and screen-reader accessible by
 * default, and fully readable/operable with JavaScript disabled.
 */
export function ImplementationControl() {
  return (
    <Section id={sectionIds.control} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="label-mono text-[var(--color-signal-strong)]">Implementation &amp; Control</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              WorkforceOS coordinates. Your managers still decide.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {implementationControl.map((topic, index) => (
            <Reveal key={topic.question} delay={index * 50}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-[var(--color-text-primary)] marker:content-none">
                  {topic.question}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                  >
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                  {topic.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

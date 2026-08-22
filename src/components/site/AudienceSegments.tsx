"use client";

import { audienceSegments, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/motion";

export function AudienceSegments() {
  return (
    <Section id={sectionIds.whoItsFor} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">Who It&apos;s For</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Built for teams staffed mostly by students and hourly workers.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {audienceSegments.map((segment) => (
            <SegmentCard key={segment.slug} segment={segment} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function SegmentCard({ segment }: { segment: (typeof audienceSegments)[number] }) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={inView ? "animate-reveal-soft ticket-slip p-6 pt-7" : "ticket-slip p-6 pt-7 opacity-0"}>
      <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">{segment.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{segment.situation}</p>

      <div className="mt-5 flex flex-col gap-1.5 border-t border-[var(--color-border)] pt-4">
        {segment.workflow.map((step, index) => (
          <div key={step} className="flex items-start gap-2.5">
            <div className="flex flex-col items-center pt-0.5">
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{
                  backgroundColor: index === segment.workflow.length - 1 ? "var(--color-signal)" : "var(--color-text-muted)",
                }}
              />
              {index < segment.workflow.length - 1 && (
                <span
                  aria-hidden
                  className="mt-1 w-px flex-1"
                  style={{
                    minHeight: "14px",
                    backgroundColor: "var(--color-border-strong)",
                    transform: inView ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "top",
                    transition: `transform var(--duration-entrance) var(--ease-out) ${index * 100}ms`,
                  }}
                />
              )}
            </div>
            <p className="label-mono pt-0 text-[var(--color-text-secondary)]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

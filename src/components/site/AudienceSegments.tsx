import { audienceSegments, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audienceSegments.map((segment, index) => (
            <Reveal
              key={segment.slug}
              delay={index * 60}
              className="ticket-slip p-6 pt-7"
            >
              <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                {segment.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {segment.situation}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

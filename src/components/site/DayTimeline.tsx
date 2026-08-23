"use client";

import { dayTimeline, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TimelineMoment } from "@/components/site/TimelineMoment";
import { useInView } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Three moments, not a pinned scroll story: shows that the five operational
 * areas work together across one day. Fully native document scroll — no
 * pin, no scrub, no horizontal hijacking. The connecting rule draws once
 * (scaleX desktop / scaleY mobile) the first time the section enters view.
 */
export function DayTimeline() {
  const [ref, active] = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <Section id={sectionIds.dayInOperation} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <p className="label-mono text-[var(--color-signal-strong)]">A Day With WorkforceOS</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            From morning briefing to close, the operation stays connected.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            An illustrative view of how WorkforceOS helps a manager move
            through the day with fewer systems to check and fewer
            exceptions to chase.
          </p>
        </Reveal>

        <div ref={ref}>
          {/* Desktop: three-column editorial sequence with a connecting rule. */}
          <div className="relative hidden md:grid md:grid-cols-3 md:gap-10 lg:gap-14">
            <div
              aria-hidden
              className={cn(
                "absolute left-0 right-0 top-[18px] h-px bg-[var(--color-border-strong)] animate-connector-grow",
                active && "is-active",
              )}
            />
            {dayTimeline.map((moment, index) => (
              <TimelineMoment key={moment.time} moment={moment} index={index} emphasized={index === 1} active={active} />
            ))}
          </div>

          {/* Mobile: vertical timeline, time markers left, content right. */}
          <div className="relative flex flex-col gap-10 md:hidden">
            <div
              aria-hidden
              className={cn(
                "absolute left-[19px] top-2 bottom-2 w-px bg-[var(--color-border-strong)] animate-rail-grow",
                active && "is-active",
              )}
            />
            {dayTimeline.map((moment, index) => (
              <TimelineMoment key={moment.time} moment={moment} index={index} active={active} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

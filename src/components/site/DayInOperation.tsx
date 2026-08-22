"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ScrollStory, type ScrollStoryStep } from "@/components/ui/ScrollStory";
import { dayInOperation, sectionIds, type AuthorityMode, type DayInOperationEvent } from "@/lib/site-config";

const authorityLabel: Record<AuthorityMode, string> = {
  inform: "Inform",
  recommend: "Recommend",
  execute: "Execute",
};

const authorityColor: Record<AuthorityMode, string> = {
  inform: "var(--color-status-resolved)",
  recommend: "var(--color-signal-strong)",
  execute: "var(--color-signal-strong)",
};

/**
 * The site's one pinned scroll narrative — a realistic cross-functional day
 * (briefing, sales signal, staffing, inventory, tasks, communication,
 * approval, end-of-shift summary), not another isolated call-out example.
 * Illustrative throughout; every event carries a real accessible summary in
 * its own text, not just position/color.
 */
export function DayInOperation() {
  const steps: ScrollStoryStep[] = dayInOperation.map((event, index) => ({
    key: event.time,
    content: (
      <div>
        <p className="label-mono text-[var(--color-signal-strong)]">
          {String(index + 1).padStart(2, "0")} / {String(dayInOperation.length).padStart(2, "0")}
        </p>
        <p className="label-mono mt-2 text-[var(--color-text-muted)]">
          {event.time} &middot; {event.source.toUpperCase()}
        </p>
        <h3 className="font-display mt-3 text-2xl font-semibold text-[var(--color-text-primary)] sm:text-3xl">
          {event.event}
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-text-secondary)]">{event.aiAction}</p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{event.result}</p>
      </div>
    ),
  }));

  return (
    <Section id={sectionIds.dayInOperation} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <ScrollStory
          eyebrow="A Day In The Operation"
          title="One operation, coordinated all day — not one isolated call-out."
          description="An illustrative day across labor, sales, inventory, tasks, and communication. Times and events are illustrative, not a real customer's data."
          steps={steps}
          renderVisual={(activeIndex) => <EventCard event={dayInOperation[activeIndex]!} />}
        />
      </Container>
    </Section>
  );
}

function EventCard({ event }: { event: DayInOperationEvent }) {
  return (
    <div className="paper-stack ticket-slip w-full max-w-sm p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="ticket-number">{event.time}</p>
        <span
          className="label-mono rounded-full px-2.5 py-1"
          style={{
            color: authorityColor[event.authorityMode],
            backgroundColor: "var(--color-signal-soft)",
          }}
        >
          {authorityLabel[event.authorityMode]}
        </span>
      </div>
      <p className="label-mono mt-4 text-[var(--color-text-muted)]">{event.source}</p>
      <p className="mt-2 text-base font-medium leading-snug text-[var(--color-text-primary)]">{event.event}</p>
      <div className="mt-4 border-t border-[var(--color-border)] pt-4">
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{event.aiAction}</p>
      </div>
    </div>
  );
}

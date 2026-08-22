import { capabilityStories, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, React.ReactNode> = {
  scheduling: (
    <>
      <rect x="2" y="3" width="16" height="14" rx="1" stroke="var(--color-signal-strong)" strokeWidth="1.6" />
      <path d="M2 8 H18 M7 3 V17" stroke="var(--color-signal-strong)" strokeWidth="1.6" />
    </>
  ),
  learns: (
    <path
      d="M3 11a7 7 0 1 1 2.1 5M3 11v5M3 11h5"
      stroke="var(--color-signal-strong)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  exceptions: (
    <>
      <circle cx="6" cy="10" r="3.4" stroke="var(--color-signal-strong)" strokeWidth="1.6" />
      <circle cx="14" cy="10" r="3.4" stroke="var(--color-signal-strong)" strokeWidth="1.6" />
      <path d="M9.4 10 H10.6" stroke="var(--color-signal-strong)" strokeWidth="1.6" strokeDasharray="1.5 1.5" />
    </>
  ),
  comms: (
    <>
      <path
        d="M2 6 H14 M14 6 L11 3 M14 6 L11 9"
        stroke="var(--color-signal-strong)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 14 H6 M6 14 L9 11 M6 14 L9 17"
        stroke="var(--color-signal-strong)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function CapabilityStories() {
  return (
    <Section id={sectionIds.whatItHandles}>
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">What It Handles</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Four jobs, run as one loop.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            Not a feature grid — each job is a trigger, an action WorkforceOS
            takes, and an outcome the manager sees.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityStories.map((story, index) => (
            <Reveal key={story.slug} delay={index * 70} className="ticket-slip flex flex-col p-6 pt-7">
              <p className="ticket-number absolute right-4 top-4">TICKET {story.ticketNumber}</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-[var(--color-signal-soft)]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  {icons[story.slug]}
                </svg>
              </div>
              <h3 className="font-display mt-5 text-[19px] font-semibold leading-snug text-[var(--color-text-primary)]">
                {story.title}
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="label-mono text-[var(--color-signal-strong)]">Trigger</dt>
                  <dd className="mt-1 leading-relaxed text-[var(--color-text-secondary)]">{story.trigger}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[var(--color-signal-strong)]">Action</dt>
                  <dd className="mt-1 leading-relaxed text-[var(--color-text-secondary)]">{story.action}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[var(--color-signal-strong)]">Outcome</dt>
                  <dd className="mt-1 leading-relaxed text-[var(--color-text-secondary)]">{story.outcome}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

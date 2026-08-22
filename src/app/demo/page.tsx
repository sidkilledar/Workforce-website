import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DemoForm } from "@/components/site/DemoForm";
import { customerProof, pilotCustomers, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "See how WorkforceOS schedules your staff and absorbs the daily chaos — call-outs, no-shows, headcount changes. Tell us about your operation and we'll follow up to schedule a walkthrough.",
  path: "/demo",
});

const nextSteps = [
  { title: "We review your request", description: "A real person looks at your operation, not a queue." },
  { title: "We schedule a walkthrough", description: "A short call, at a time that works for your team." },
  { title: "You see it on your operation", description: "Configured around how you actually run, not a generic demo." },
];

export default function DemoPage() {
  const testimonial = customerProof.find((customer) => customer.quote);

  return (
    <>
      <div className="border-b border-[var(--color-border)] px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {siteConfig.name}
        </Link>
      </div>

      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <Reveal className="max-w-xl">
            <p className="label-mono text-[var(--color-signal-strong)]">Book A Demo</p>
            <h1 className="font-display mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              See it run on your operation, not a generic walkthrough.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              Tell us about your operation and we&apos;ll walk through how
              WorkforceOS schedules your staff and absorbs the daily chaos —
              configured around how you already run, not a template.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <DemoForm />
          </Reveal>
        </div>

        <aside className="flex flex-col gap-8 lg:pt-2">
          {testimonial ? (
            <Reveal className="ticket-slip p-6">
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">
                {testimonial.attribution ?? testimonial.name}
              </p>
            </Reveal>
          ) : (
            <Reveal className="ticket-slip p-6">
              <p className="label-mono text-[var(--color-signal-strong)]">In Active Pilots</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {pilotCustomers.join(" and ")}.
              </p>
            </Reveal>
          )}

          {customerProof.length > 0 && (
            <Reveal delay={40} className="flex flex-wrap items-center gap-6">
              {customerProof.map((customer) => (
                <Image
                  key={customer.name}
                  src={customer.logoSrc}
                  alt={customer.name}
                  width={100}
                  height={28}
                  className="opacity-60 grayscale"
                />
              ))}
            </Reveal>
          )}

          <Reveal delay={80}>
            <p className="label-mono text-[var(--color-text-muted)]">What Happens Next</p>
            <ol className="mt-4 space-y-5 border-l border-[var(--color-border)] pl-5">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  <span className="ticket-number absolute -left-[26px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-canvas-raised)] text-[10px]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{step.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </aside>
      </Container>
    </>
  );
}

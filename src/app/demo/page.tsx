import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DemoForm } from "@/components/site/DemoForm";
import { customerProof, pilotImpact, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "See how WorkforceOS connects your systems, brings the operation into one dashboard, and lets AI coordinate daily work within the authority rules you control. Tell us about your operation and we'll follow up to schedule a walkthrough.",
  path: "/demo",
});

const nextSteps = [
  { title: "We review the context", description: "Your industry, team size, and highest-friction workflow shape the walkthrough." },
  { title: "We find a time", description: "A member of the WorkforceOS team follows up to schedule the conversation." },
  { title: "We map the workflow", description: "You see the signal, AI response, manager boundary, and likely integration path together." },
];

export default function DemoPage() {
  const testimonial = customerProof.find((customer) => customer.quote);

  return (
    <>
      <div className="border-b border-[var(--color-border)] px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {siteConfig.name}
        </Link>
      </div>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div>
          <Reveal className="max-w-xl">
            <h1 className="font-display text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
              Bring one difficult workflow. Leave knowing how WorkforceOS would run it.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Tell us where managers lose time today. We&apos;ll prepare a walkthrough around your systems, approval needs,
              and the operational outcome you want—not a generic product tour.
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
            <Reveal className="rounded-xl bg-[var(--color-canvas-dark)] p-6 text-[var(--color-text-on-dark-primary)]">
              <p className="text-3xl font-semibold tabular-nums">{pilotImpact.frontlineUsers}</p>
              <p className="mt-1 text-sm text-[var(--color-text-on-dark-secondary)]">
                frontline users across {pilotImpact.organizations} active customer pilots
              </p>
              <div className="mt-5 border-t border-[var(--color-border-on-dark)] pt-5">
                <p className="text-sm font-medium">Olive &amp; Vine</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">
                  10–15 operations hours saved each week.
                </p>
              </div>
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
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">What happens after you submit</h2>
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

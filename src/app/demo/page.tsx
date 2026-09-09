import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DemoForm } from "@/components/site/DemoForm";
import { customerProof, pilotImpact } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "Tell us about your team, the systems you use, and one recurring scheduling, coverage, or communication problem. We'll use that context to prepare a tailored WorkforceOS walkthrough.",
  path: "/demo",
});

const nextSteps = [
  { title: "We review your workflow", description: "Your team, current systems, and coordination burden shape the conversation." },
  { title: "We confirm the relevant systems and approval needs", description: "We identify the systems and operational constraints involved before proposing a pilot." },
  { title: "We schedule a tailored walkthrough", description: "You see the information flow, manager boundary, and practical first workflow together." },
  { title: "If there is a fit, we define a focused pilot starting point", description: "Not every submission needs a full technical integration plan up front." },
];

export default function DemoPage() {
  const testimonial = customerProof.find((customer) => customer.quote);

  return (
    <>
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div>
          <Reveal className="max-w-xl">
            <h1 className="font-display text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-5xl">
              Let&apos;s map one workflow your managers handle manually.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Tell us about your team, the systems you use, and one recurring scheduling, coverage, or communication
              problem. We&apos;ll use that context to prepare a relevant conversation.
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
                frontline users supported by active pilots
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

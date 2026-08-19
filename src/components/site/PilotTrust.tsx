import Image from "next/image";
import { customerProof } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";

/**
 * The logo/quote grid below only renders once approved names, logos,
 * testimonials, and written publication approval are added to
 * `customerProof` in site-config — the placeholder message always shows,
 * so enabling real proof later is additive, not a restructure.
 */
export function PilotTrust() {
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-accent-cyan-ink)]">IN ACTIVE CUSTOMER TESTING</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Built alongside real frontline operators.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Workforce OS is being tested with early customers and shaped around the
            realities of scheduling, coverage, communication, and daily operations.
          </p>
        </Reveal>

        {customerProof.length > 0 && (
          <>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {customerProof.map((customer) => (
                <Image
                  key={customer.name}
                  src={customer.logoSrc}
                  alt={customer.name}
                  width={140}
                  height={40}
                  className="opacity-70 grayscale"
                />
              ))}
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {customerProof
                .filter((customer) => customer.quote)
                .map((customer) => (
                  <GlassPanel key={customer.name} className="p-6">
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      &ldquo;{customer.quote}&rdquo;
                    </p>
                    <p className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">
                      {customer.attribution ?? customer.name}
                    </p>
                  </GlassPanel>
                ))}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}

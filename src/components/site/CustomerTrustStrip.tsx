import Image from "next/image";
import { customerProof, pilotCustomers, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Approved logos render once they land in `customerProof` — flex-wrap +
 * justify-center handles anywhere from 3 to 8 without awkward empty space.
 * Until then, named pilots stand in as plain text (a fact, not a
 * testimonial) rather than a vague "in testing" placeholder.
 */
export function CustomerTrustStrip() {
  return (
    <Section id={sectionIds.pilots} className="border-b border-[var(--color-border)] py-10 sm:py-12">
      <Container>
        <Reveal className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div>
            <p className="label-mono text-[var(--color-signal-strong)]">Active Pilots</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {customerProof.length > 0
                ? "Trusted by operators running WorkforceOS."
                : "WorkforceOS is being shaped with frontline teams in catering and campus recreation."}
            </p>
          </div>

          {customerProof.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {customerProof.map((customer) => (
                <Image
                  key={customer.name}
                  src={customer.logoSrc}
                  alt={customer.name}
                  width={140}
                  height={40}
                  className="opacity-60 grayscale"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {pilotCustomers.map((name) => (
                <span key={name} className="ticket-slip px-4 py-2 text-sm font-medium text-[var(--color-text-primary)]">
                  {name}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}

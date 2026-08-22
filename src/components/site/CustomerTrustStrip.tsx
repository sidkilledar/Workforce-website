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
    <Section id={sectionIds.pilots} className="py-16 sm:py-20">
      <Container>
        <Reveal className="text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">Active Pilots</p>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            {customerProof.length > 0
              ? "Trusted by operators running WorkforceOS."
              : "WorkforceOS is being shaped with frontline teams in catering and campus recreation."}
          </p>
        </Reveal>

        {customerProof.length > 0 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
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
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {pilotCustomers.map((name) => (
              <span key={name} className="ticket-slip px-4 py-2 text-sm font-medium text-[var(--color-text-primary)]">
                {name}
              </span>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

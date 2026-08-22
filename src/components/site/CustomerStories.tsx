import Image from "next/image";
import { customerProof, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Renders nothing — not an empty-state card — while `customerProof` has no
 * approved quotes. Once populated: one featured quote, then a supporting row.
 */
export function CustomerStories() {
  const quoted = customerProof.filter((customer) => customer.quote);
  if (quoted.length === 0) return null;

  const [featured, ...rest] = quoted;

  return (
    <Section id={sectionIds.stories}>
      <Container>
        <Reveal>
          <div className="ticket-slip mx-auto max-w-2xl px-8 pb-10 pt-8 text-center">
            {featured!.logoSrc && (
              <Image
                src={featured!.logoSrc}
                alt={featured!.name}
                width={120}
                height={34}
                className="mx-auto opacity-80"
              />
            )}
            <p className="font-display mt-6 text-2xl leading-snug text-[var(--color-text-primary)] sm:text-3xl">
              &ldquo;{featured!.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm font-medium text-[var(--color-text-secondary)]">
              {featured!.attribution ?? featured!.name}
            </p>
            {featured!.metric && (
              <p className="label-mono mt-2 text-[var(--color-signal-strong)]">{featured!.metric}</p>
            )}
          </div>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((customer, index) => (
              <Reveal key={customer.name} delay={index * 70} className="ticket-slip p-6 pt-7">
                <p className="ticket-number absolute right-4 top-4">#{String(index + 2).padStart(3, "0")}</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  &ldquo;{customer.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">
                  {customer.attribution ?? customer.name}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

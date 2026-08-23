import { pilotImpact, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function CustomerTrustStrip() {
  return (
    <Section id={sectionIds.pilots} className="border-b border-[var(--color-border)] py-12 sm:py-16">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-14">
          <div className="max-w-sm">
            <p className="font-display text-3xl font-semibold tracking-[-0.025em] text-[var(--color-text-primary)] sm:text-4xl">
              Built with real operations, not hypothetical workflows.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Two customer pilots bring WorkforceOS into the daily work of more than 1,000 frontline users across their teams.
            </p>

            <dl className="mt-6 flex gap-8 border-t border-[var(--color-border)] pt-5">
              <div>
                <dt className="text-xs text-[var(--color-text-muted)]">Customer pilots</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums text-[var(--color-text-primary)]">
                  {pilotImpact.organizations}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text-muted)]">Frontline users</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums text-[var(--color-text-primary)]">
                  {pilotImpact.frontlineUsers}
                </dd>
              </div>
            </dl>
          </div>

          <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {pilotImpact.customers.map((customer) => (
              <article key={customer.name} className="grid gap-3 py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
                <div>
                  <h2 className="text-base font-semibold text-[var(--color-text-primary)]">{customer.name}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">{customer.context}</p>
                </div>
                <p className="max-w-[58ch] text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {customer.result}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

import type { Industry } from "@/lib/site-config";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FinalCta } from "@/components/site/FinalCta";

export function IndustryDetail({ industry }: { industry: Industry }) {
  return (
    <>
      <PageHero
        eyebrow={industry.name}
        title={industry.heroDescription.split(".")[0] + "."}
        description={industry.heroDescription}
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                What makes this operation hard to staff
              </h2>
              <ul className="mt-6 space-y-4">
                {industry.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent-cobalt)]"
                    />
                    <span className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                How Workforce OS helps
              </h2>
              <div className="mt-6 space-y-4">
                {industry.highlights.map((highlight) => (
                  <GlassPanel key={highlight.title} className="p-6">
                    <h3 className="text-base font-medium text-[var(--color-text-primary)]">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {highlight.description}
                    </p>
                  </GlassPanel>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

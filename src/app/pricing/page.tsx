import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "WorkforceOS is configured for each organization's locations, team structure, and operational needs.",
  path: "/pricing",
});

const factors = [
  {
    title: "Number of locations or sites",
    description: "Pricing scales with how many sites you're coordinating, not a flat per-seat fee.",
  },
  {
    title: "People scheduled",
    description: "We account for the number of staff being forecasted, scheduled, and coordinated.",
  },
  {
    title: "Capabilities you need",
    description: "Start with the parts of the operating loop that matter most and expand from there.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Built around how your operation runs."
        description="WorkforceOS is configured for each organization's locations, team structure, and operational needs."
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {factors.map((factor, index) => (
              <Reveal key={factor.title} delay={index * 80}>
                <GlassPanel className="h-full p-6">
                  <h2 className="text-base font-medium text-[var(--color-text-primary)]">{factor.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {factor.description}
                  </p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240} className="mx-auto mt-14 max-w-2xl">
            <GlassPanel className="p-10 text-center sm:p-14">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                Talk to Our Team
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--color-text-secondary)]">
                Book a demo and we&apos;ll put together pricing based on your locations,
                team size, and the capabilities you need first.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/demo" size="lg" magnetic>
                  Talk to Our Team
                </Button>
              </div>
            </GlassPanel>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

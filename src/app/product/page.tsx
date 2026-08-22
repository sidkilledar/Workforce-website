import type { Metadata } from "next";
import { capabilities } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { OperationsPanel } from "@/components/site/OperationsPanel";
import { CapabilityVisual } from "@/components/site/CapabilityVisual";
import { FinalCta } from "@/components/site/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Product",
  description:
    "Forecasting, smart scheduling, shift coverage, approvals, team communication, task coordination, and operational follow-ups — one operating system for frontline businesses.",
  path: "/product",
});

const bootState = {
  caption: "LIVE OPERATING VIEW",
  pulse: "resolved" as const,
  forecastLabel: "Balanced this week",
  coverageLabel: "Fully staffed",
  coverageStatus: "resolved" as const,
  approvalStatus: "approved" as const,
  taskStatus: "done" as const,
  highlightCell: null,
};

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="One system for the work behind every shift."
        description="WorkforceOS connects forecasting, scheduling, coverage, approvals, communication, and follow-ups so managers stop reassembling the picture by hand."
      />

      <Section className="pt-0">
        <Container>
          <Reveal className="mx-auto max-w-4xl">
            <OperationsPanel state={bootState} />
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="space-y-4">
            {capabilities.map((capability, index) => (
              <Reveal key={capability.slug} delay={(index % 4) * 60}>
                <GlassPanel
                  id={capability.slug}
                  className="grid gap-6 p-8 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:items-center sm:p-10 lg:grid-cols-[200px_minmax(0,1fr)_260px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="label-mono text-[var(--color-accent-cobalt-soft)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-medium text-[var(--color-text-primary)]">{capability.name}</h2>
                  </div>
                  <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                    {capability.description}
                  </p>
                  <CapabilityVisual slug={capability.slug} className="hidden h-40 lg:block" />
                </GlassPanel>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

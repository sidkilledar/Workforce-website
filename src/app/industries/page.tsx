import type { Metadata } from "next";
import Link from "next/link";
import { industries, type Industry } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/site/FinalCta";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "Workforce OS serves restaurants, multi-location chains, catering operations, college campuses, and other shift-based organizations.",
  path: "/industries",
});

const tintGlow: Record<Industry["tint"], string> = {
  violet: "var(--color-accent-violet)",
  cobalt: "var(--color-accent-cobalt)",
  cyan: "var(--color-accent-cyan)",
};

const tintText: Record<Industry["tint"], string> = {
  violet: "text-[var(--color-accent-violet)]",
  cobalt: "text-[var(--color-accent-cobalt)]",
  cyan: "text-[var(--color-accent-cyan-ink)]",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for businesses that run by the hour."
        description="Restaurants, multi-location chains, catering teams, college campuses, and other shift-based organizations all run on the same underlying engine, configured around how they operate."
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 80}>
                <Link href={`/industries/${industry.slug}`} className="group block h-full">
                  <div className="glass-panel relative h-full overflow-hidden rounded-2xl p-8 transition-all group-hover:-translate-y-1 group-hover:border-[var(--color-border-strong)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-[70px] transition-opacity group-hover:opacity-35"
                      style={{ background: tintGlow[industry.tint] }}
                    />
                    <h2 className="relative text-xl font-medium text-[var(--color-text-primary)]">{industry.name}</h2>
                    <p className="relative mt-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {industry.summary}
                    </p>
                    <span className={cn("relative mt-5 inline-block text-sm font-medium", tintText[industry.tint])}>
                      Explore {industry.shortName.toLowerCase()} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

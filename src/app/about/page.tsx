import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FinalCta } from "@/components/site/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Workforce OS is building the AI operations manager for frontline businesses — starting with the people who run operations every day.",
  path: "/about",
});

const principles = [
  {
    title: "Operators first",
    description:
      "Every feature starts from a real shift, a real call-out, or a real schedule — not a theoretical workflow. We build alongside the operators piloting Workforce OS today.",
  },
  {
    title: "Automate the busywork, not the judgment",
    description:
      "Workforce OS handles forecasting, drafting, and routing so managers spend their time on the decisions that actually need a person.",
  },
  {
    title: "Earn trust before scale",
    description:
      "We're intentionally in a pilot stage with a small set of operators, refining the product against real operations before expanding further.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Building the operating system frontline businesses deserve"
        description="Shift-based operations run a huge share of the economy, and most still run on spreadsheets, group chats, and a manager's memory. Workforce OS exists to replace that with one operating layer."
      />

      <Section className="pt-0">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              Why we&apos;re building this
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Restaurants, catering teams, campus operations, and countless other
              organizations run on shifts, not salaries — yet the software supporting
              them has lagged far behind the tools built for office work. Forecasting
              lives in a manager&apos;s head. Coverage gets solved in a group chat. Approvals
              stall because there&apos;s no clear system of record.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Workforce OS is our answer: an AI operations manager that forecasts
              demand, plans labor, builds schedules, and keeps every shift covered — so
              the people running these operations can spend their time leading a team,
              not fighting a spreadsheet.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-[var(--color-canvas-raised)] pt-0">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              How we build
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 80}>
                <GlassPanel className="h-full p-6">
                  <h3 className="text-base font-medium text-[var(--color-text-primary)]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {principle.description}
                  </p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              What&apos;s next
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Workforce OS is currently in a working pilot with early operators across
              restaurants and adjacent shift-based businesses. We&apos;re deliberately
              staying close to that group while we harden the product, before opening
              access more broadly.
            </p>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

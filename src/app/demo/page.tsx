import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DemoForm } from "@/components/site/DemoForm";

export const metadata: Metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "See how Workforce OS forecasts demand, plans labor, and keeps every shift covered for your operation. Tell us about your team and we'll follow up to schedule a walkthrough.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="See what Workforce OS could run for you."
        description="Tell us a bit about your team and we'll follow up to schedule a walkthrough tailored to how you staff and run shifts."
      />

      <Section className="pt-0">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <DemoForm />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

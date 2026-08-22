import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { ProblemSection } from "@/components/site/ProblemSection";
import { IntegrationSection } from "@/components/site/IntegrationSection";
import { CommandCenter } from "@/components/site/CommandCenter";
import { OperatingPillars } from "@/components/site/OperatingPillars";
import { AiAssistant } from "@/components/site/AiAssistant";
import { OperatingCycle } from "@/components/site/OperatingCycle";
import { DayInOperation } from "@/components/site/DayInOperation";
import { InsightsSection } from "@/components/site/InsightsSection";
import { AuthoritySection } from "@/components/site/AuthoritySection";
import { AudienceSegments } from "@/components/site/AudienceSegments";
import { CustomerTrustStrip } from "@/components/site/CustomerTrustStrip";
import { ImplementationControl } from "@/components/site/ImplementationControl";
import { FinalCta } from "@/components/site/FinalCta";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <IntegrationSection />
      <CommandCenter />
      <OperatingPillars />
      <AiAssistant />
      <OperatingCycle />
      <DayInOperation />
      <InsightsSection />
      <AuthoritySection />
      <AudienceSegments />
      <CustomerTrustStrip />
      <ImplementationControl />
      <FinalCta />
    </>
  );
}

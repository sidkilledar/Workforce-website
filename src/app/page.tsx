import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { ProblemSection } from "@/components/site/ProblemSection";
import { HowItWorksSection } from "@/components/site/HowItWorksSection";
import { CoreCapabilities } from "@/components/site/CoreCapabilities";
import { AdaptiveScenario } from "@/components/site/AdaptiveScenario";
import { IndustriesShowcase } from "@/components/site/IndustriesShowcase";
import { ManagerExperience } from "@/components/site/ManagerExperience";
import { PilotTrust } from "@/components/site/PilotTrust";
import { ImplementationJourney } from "@/components/site/ImplementationJourney";
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
      <HowItWorksSection />
      <CoreCapabilities />
      <AdaptiveScenario />
      <IndustriesShowcase />
      <ManagerExperience />
      <PilotTrust />
      <ImplementationJourney />
      <FinalCta />
    </>
  );
}

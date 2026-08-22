import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { CustomerTrustStrip } from "@/components/site/CustomerTrustStrip";
import { ProblemSection } from "@/components/site/ProblemSection";
import { OperatingLoop } from "@/components/site/OperatingLoop";
import { CapabilityStories } from "@/components/site/CapabilityStories";
import { ScenarioWalkthrough } from "@/components/site/ScenarioWalkthrough";
import { OperationOutcomes } from "@/components/site/OperationOutcomes";
import { CustomerStories } from "@/components/site/CustomerStories";
import { AudienceSegments } from "@/components/site/AudienceSegments";
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
      <CustomerTrustStrip />
      <ProblemSection />
      <OperatingLoop />
      <CapabilityStories />
      <ScenarioWalkthrough />
      <OperationOutcomes />
      <CustomerStories />
      <AudienceSegments />
      <ImplementationControl />
      <FinalCta />
    </>
  );
}

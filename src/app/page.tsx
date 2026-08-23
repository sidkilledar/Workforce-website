import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { ProblemSection } from "@/components/site/ProblemSection";
import { ConnectedOperationsShowcase } from "@/components/site/ConnectedOperationsShowcase";
import { AuthoritySection } from "@/components/site/AuthoritySection";
import { CustomerTrustStrip } from "@/components/site/CustomerTrustStrip";
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
      <ConnectedOperationsShowcase />
      <AuthoritySection />
      <FinalCta />
    </>
  );
}

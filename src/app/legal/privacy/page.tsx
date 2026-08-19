import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalPlaceholder } from "@/components/site/LegalPlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Workforce OS collects, uses, and protects your information.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return <LegalPlaceholder title="Privacy Policy" lastUpdated="Pending legal review" />;
}

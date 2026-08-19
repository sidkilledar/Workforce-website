import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalPlaceholder } from "@/components/site/LegalPlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of Workforce OS.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return <LegalPlaceholder title="Terms of Service" lastUpdated="Pending legal review" />;
}

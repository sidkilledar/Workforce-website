import type { Metadata } from "next";
import { industries } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";
import { IndustryDetail } from "@/components/site/IndustryDetail";

const industry = industries.find((item) => item.slug === "other")!;

export const metadata: Metadata = buildMetadata({
  title: industry.name,
  description: industry.summary,
  path: "/industries/other",
});

export default function OtherIndustriesPage() {
  return <IndustryDetail industry={industry} />;
}

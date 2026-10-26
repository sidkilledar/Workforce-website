import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/site/IndustryPage";
import { buildMetadata } from "@/lib/metadata";
import { strawIndustries } from "@/lib/straw-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return strawIndustries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = strawIndustries.find((item) => item.slug === slug);
  if (!industry) return {};

  return buildMetadata({
    title: industry.name,
    description: industry.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryRoute({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = strawIndustries.find((item) => item.slug === slug);
  if (!industry) notFound();

  return (
    <IndustryPage
      industry={industry}
      others={strawIndustries.filter((item) => item.slug !== industry.slug)}
    />
  );
}

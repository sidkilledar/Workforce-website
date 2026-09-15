import type { Metadata } from "next";
import { BusinessHomepage } from "@/components/site/BusinessHomepage";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.tagline,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return <BusinessHomepage />;
}

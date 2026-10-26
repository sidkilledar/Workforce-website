import type { MetadataRoute } from "next";
import { strawIndustries } from "@/lib/straw-content";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/demo",
    ...strawIndustries.map((industry) => `/industries/${industry.slug}`),
    "/legal/privacy",
    "/legal/terms",
  ];

  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/demo" ? 0.8 : route.startsWith("/industries/") ? 0.7 : 0.3,
  }));
}

import type { MetadataRoute } from "next";
import { industries, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/product",
    "/industries",
    "/about",
    "/pricing",
    "/demo",
    "/legal/privacy",
    "/legal/terms",
  ];

  const industryRoutes = industries.map((industry) => `/industries/${industry.slug}`);

  const routes = [...staticRoutes, ...industryRoutes];

  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

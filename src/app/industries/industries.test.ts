import { describe, expect, it, vi } from "vitest";
import nextConfig from "../../../next.config";
import sitemap from "../sitemap";
import { strawIndustries } from "@/lib/straw-content";
import { industrySetupSteps } from "@/components/site/IndustryPage";

vi.mock("@/components/site/StrawProductDemo", () => ({
  StrawProductDemo: () => null,
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const slugs = ["restaurants", "catering", "campus"];

describe("industry content", () => {
  it("has exactly the three valid industries", () => {
    expect(strawIndustries.map((i) => i.slug).sort()).toEqual([...slugs].sort());
  });
  it("has three workflows and a proof for each", () => {
    for (const i of strawIndustries) {
      expect(i.workflows).toHaveLength(3);
      expect(i.proof.headline).toBeTruthy();
    }
  });
  it("has four setup steps", () => {
    expect(industrySetupSteps).toHaveLength(4);
  });
});

describe("industry route", () => {
  it("generates static params for the three slugs only", async () => {
    const mod = await import("./[industry]/page");
    expect(mod.generateStaticParams().map((p) => p.industry).sort()).toEqual(
      [...slugs].sort(),
    );
    expect(mod.dynamicParams).toBe(false);
  });
  it("produces unique metadata with canonical paths", async () => {
    const mod = await import("./[industry]/page");
    const metas = await Promise.all(
      slugs.map((industry) =>
        mod.generateMetadata({ params: Promise.resolve({ industry }) }),
      ),
    );
    expect(new Set(metas.map((m) => String(m.title))).size).toBe(3);
    expect(new Set(metas.map((m) => m.description)).size).toBe(3);
    metas.forEach((m, i) =>
      expect(m.alternates?.canonical).toContain(`/industries/${slugs[i]}`),
    );
  });
  it("returns 404 for unknown slugs", async () => {
    const mod = await import("./[industry]/page");
    expect(
      await mod.generateMetadata({ params: Promise.resolve({ industry: "x" }) }),
    ).toEqual({});
    await expect(
      mod.default({ params: Promise.resolve({ industry: "x" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
  it("renders booking CTAs to /demo", async () => {
    const { renderToStaticMarkup } = await import("react-dom/server");
    const mod = await import("./[industry]/page");
    const html = renderToStaticMarkup(
      await mod.default({ params: Promise.resolve({ industry: "campus" }) }),
    );
    expect(html.match(/href="\/demo"/g)?.length).toBe(2);
    expect(html).toContain("Book a personalized demo");
    expect(html).toContain("/industries/restaurants");
    expect(html).toContain("/industries/catering");
  });
});

describe("sitemap and redirects", () => {
  it("lists the industry pages", () => {
    const urls = sitemap().map((e) => e.url);
    for (const s of slugs) {
      expect(urls.some((u) => u.endsWith(`/industries/${s}`))).toBe(true);
    }
  });
  it("redirects only the bare /industries path and legacy slugs", async () => {
    const redirects = await nextConfig.redirects!();
    const sources = redirects.map((r) => r.source);
    expect(sources).not.toContain("/industries/:path*");
    expect(redirects.find((r) => r.source === "/product")?.destination).toBe(
      "/#product",
    );
    expect(redirects.find((r) => r.source === "/industries")?.destination).toBe(
      "/#industries",
    );
    for (const s of slugs) {
      expect(sources).not.toContain(`/industries/${s}`);
    }
    expect(sources).toEqual(expect.arrayContaining(["/product", "/pricing", "/about"]));
  });
});

import { describe, expect, it } from "vitest";
import {
  ctaNav,
  navAnchors,
  secondaryCtaNav,
  footerContent,
  integrationCopy,
  siteConfig,
  frictionWorkflows,
  footerNav,
} from "./site-config";
import { strawIndustries } from "./straw-content";
import { coverageScenario, workflowSteps } from "./operations-scenario";

describe("redesign content integrity", () => {
  it("contains no named customers", () => {
    const source = JSON.stringify([siteConfig, footerContent, strawIndustries]);
    for (const name of ["Oli" + "ve & Vine", "Myla" + "pore", "UC Da" + "vis"]) {
      expect(source).not.toContain(name);
    }
  });
  it("describes integrations without limiting them to POS or HR", () => {
    expect(integrationCopy).toBe(
      "Use Straw's built-in tools, connect the systems you already use, or combine both. We assess compatibility and any custom requirements during setup.",
    );
  });
  it("keeps catering messaging behind approval", () => {
    const catering = strawIndustries.find((i) => i.slug === "catering")!;
    const change = catering.workflows.find((w) => w.title === "Headcount changes")!;
    expect(change.description).toContain("for approval, then messages");
  });
  it("brands the public site as Straw", () => {
    expect(siteConfig.name).toBe("Straw");
    expect(siteConfig.description).not.toContain("WorkforceOS");
  });
  it("uses broad frontline positioning in metadata", () => {
    expect(siteConfig.description).toContain("frontline businesses");
    expect(siteConfig.description).not.toContain("for restaurants");
  });
  it("keeps navigation and footer destinations consistent", () => {
    expect(navAnchors).toEqual([
      { label: "Product", href: "#product" },
      { label: "Industries", href: "#industries" },
      { label: "How it works", href: "#how-it-works" },
    ]);
    expect(ctaNav).toEqual({
      label: "Book a personalized demo",
      href: "/demo",
    });
    expect(secondaryCtaNav).toEqual({
      label: "Explore Straw",
      href: "/#product",
    });
    expect(footerNav[0].links.map((link) => link.href)).toEqual(
      navAnchors.map((link) => `/${link.href}`),
    );
  });
  it("keeps acceptance separate from assignment and approval", () => {
    expect(workflowSteps[3].state).toContain("awaiting approval");
    expect(workflowSteps[5].state).toContain("Assigned");
    expect(coverageScenario.request).toContain(
      "review before you are assigned",
    );
  });
  it("lets requesters describe all operating areas", () => {
    const values = frictionWorkflows.map((item) => item.value);
    for (const value of [
      "scheduling",
      "communication",
      "forecasting",
      "inventory",
      "tasks",
    ]) {
      expect(values).toContain(value);
    }
  });
});

import { describe, expect, it } from "vitest";
import {
  navAnchors,
  pilotCustomers,
  proofSection,
  siteConfig,
  frictionWorkflows,
  footerNav,
} from "./site-config";
import { coverageScenario, workflowSteps } from "./operations-scenario";

describe("redesign content integrity", () => {
  it("keeps named stories aligned with the pilot count", () => {
    expect(proofSection.cards.map((story) => story.name)).toEqual([
      ...pilotCustomers,
    ]);
    expect(new Set(pilotCustomers).size).toBe(3);
  });
  it("uses broad frontline positioning in metadata", () => {
    expect(siteConfig.description).toContain("frontline businesses");
    expect(siteConfig.description).not.toContain("for restaurants");
  });
  it("keeps navigation and footer destinations consistent", () => {
    expect(navAnchors.map((link) => link.label)).toEqual([
      "Platform",
      "Workflows",
      "Integrations",
      "Results",
    ]);
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

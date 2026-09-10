import { describe, expect, it } from "vitest";
import {
  audienceEnvironments,
  authorityModes,
  confirmedCapabilities,
  connectedSystems,
  heroWorkflow,
  implementationControl,
  implementationSteps,
  patchworkSources,
  pilotImpact,
} from "@/lib/site-config";

// Legal / compliance-exposure claims only. The product's operational scope is
// deliberately broad now — forecasting, prediction, inventory, and POS/payroll
// connection are all in-scope and described directly. This guard only keeps
// out language that would create a regulatory or contractual liability
// (guarantees, certifications, named compliance regimes).
const bannedTerms = ["guarantee", "certification", "certified", "hipaa", "soc 2", "pci compliant"];

function assertNoUnsupportedClaims(text: string, context: string) {
  const lower = text.toLowerCase();
  for (const term of bannedTerms) {
    expect(lower, `${context} should not mention "${term}"`).not.toContain(term);
  }
}

describe("heroWorkflow", () => {
  it("has all required text fields, non-empty", () => {
    for (const field of ["eventLabel", "recommendation", "reason", "resolvedResult", "disclosure"] as const) {
      expect(heroWorkflow[field].trim().length, field).toBeGreaterThan(0);
    }
    expect(heroWorkflow.resolvedDetails.length).toBeGreaterThan(0);
  });

  it("has exactly the five dispatch steps, in order", () => {
    expect(heroWorkflow.steps.map((step) => step.id)).toEqual([
      "callout",
      "availability",
      "replacement",
      "approval",
      "resolved",
    ]);
  });

  it("every step has non-empty time, label, and detail", () => {
    for (const step of heroWorkflow.steps) {
      expect(step.time.trim().length, step.id).toBeGreaterThan(0);
      expect(step.label.trim().length, step.id).toBeGreaterThan(0);
      expect(step.detail.trim().length, step.id).toBeGreaterThan(0);
    }
  });

  it("orders candidates so the eligible match lands last, not first", () => {
    const lastCandidate = heroWorkflow.candidates.at(-1);
    expect(lastCandidate?.status).toBe("available");
  });

  it("stays within the approved claim boundaries", () => {
    const combined = [
      heroWorkflow.recommendation,
      heroWorkflow.reason,
      ...heroWorkflow.steps.map((step) => step.detail),
    ].join(" ");
    assertNoUnsupportedClaims(combined, "heroWorkflow");
  });

  it("is marked as illustrative", () => {
    expect(heroWorkflow.disclosure.toLowerCase()).toContain("illustrative");
  });
});

describe("confirmedCapabilities", () => {
  it("has exactly the six operating areas, scheduling first", () => {
    expect(confirmedCapabilities.map((capability) => capability.slug)).toEqual([
      "scheduling",
      "exceptions",
      "communication",
      "forecasting",
      "inventory",
      "workflows",
    ]);
  });

  it("every capability has a non-empty tab label and description", () => {
    for (const capability of confirmedCapabilities) {
      expect(capability.tabLabel.trim().length, capability.slug).toBeGreaterThan(0);
      expect(capability.description.trim().length, capability.slug).toBeGreaterThan(0);
    }
  });

  it("stays within the approved claim boundaries", () => {
    for (const capability of confirmedCapabilities) {
      const combined = [capability.description, capability.example, capability.qualifier].filter(Boolean).join(" ");
      assertNoUnsupportedClaims(combined, `confirmedCapabilities.${capability.slug}`);
    }
  });
});

describe("connectedSystems", () => {
  it("lists the systems WorkforceOS connects across", () => {
    expect(connectedSystems.systems.length).toBeGreaterThan(0);
  });
});

describe("authorityModes", () => {
  it("has exactly Inform, Recommend, Execute", () => {
    expect(authorityModes.map((mode) => mode.key)).toEqual(["inform", "recommend", "execute"]);
  });

  it("shares one consistent example scenario across all three modes", () => {
    const combined = authorityModes.map((mode) => mode.example.toLowerCase()).join(" ");
    expect(combined).toContain("jordan");
  });
});

describe("implementationSteps", () => {
  it("has exactly four steps, numbered in order", () => {
    expect(implementationSteps.map((step) => step.number)).toEqual(["01", "02", "03", "04"]);
  });
});

describe("audienceEnvironments", () => {
  it("marks only the pilot-backed entries as pilots", () => {
    const pilots = audienceEnvironments.filter((environment) => environment.kind === "pilot");
    expect(pilots.map((environment) => environment.detail)).toEqual(["Olive & Vine", "UC Davis Rec Sports"]);
  });

  it("labels every non-pilot entry as a target environment, not an existing customer", () => {
    const targets = audienceEnvironments.filter((environment) => environment.kind === "target");
    expect(targets.length).toBeGreaterThan(0);
    for (const target of targets) {
      expect(target.detail).toBeUndefined();
    }
  });
});

describe("patchworkSources", () => {
  it("has exactly four disconnected sources for one open shift", () => {
    expect(patchworkSources.length).toBe(4);
  });
});

describe("pilotImpact", () => {
  it("names the pilot customers and results in exactly this one place", () => {
    expect(pilotImpact.customers.map((customer) => customer.name)).toEqual(["Olive & Vine", "UC Davis Rec Sports"]);
    for (const customer of pilotImpact.customers) {
      expect(customer.result.trim().length, customer.name).toBeGreaterThan(0);
    }
  });
});

describe("implementationControl", () => {
  it("stays within the approved claim boundaries", () => {
    for (const topic of implementationControl) {
      assertNoUnsupportedClaims(`${topic.question} ${topic.answer}`, topic.question);
    }
  });
});

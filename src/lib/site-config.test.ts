import { describe, expect, it } from "vitest";
import {
  aiAssistantExamples,
  audienceSegments,
  authorityLevels,
  dayTimeline,
  implementationControl,
  insightExamples,
  integrationCategories,
  operatingCycleStages,
  operationalAreas,
  patchworkSources,
} from "@/lib/site-config";

// Claims the product does not make. Kept as a guard so future edits don't
// quietly reintroduce forecasting/labor-optimization/certification/task-
// management/predictive-accuracy/vendor-specific language into the approved
// five-pillar scope.
const bannedTerms = [
  "forecast",
  "labor optimization",
  "certification",
  "certified",
  "task management",
  "guarantee",
  "real-time",
  "automated purchasing",
  "supplier integration",
  "loss prevention",
];

function assertNoUnsupportedClaims(text: string, context: string) {
  const lower = text.toLowerCase();
  for (const term of bannedTerms) {
    expect(lower, `${context} should not mention "${term}"`).not.toContain(term);
  }
}

describe("operationalAreas", () => {
  it("has exactly the five confirmed areas, in order", () => {
    expect(operationalAreas.map((area) => area.slug)).toEqual(["labor", "sales", "inventory", "tasks", "communication"]);
  });

  it("indexes areas 01 through 05", () => {
    expect(operationalAreas.map((area) => area.index)).toEqual(["01", "02", "03", "04", "05"]);
  });

  it("every area has all required text fields, non-empty", () => {
    for (const area of operationalAreas) {
      for (const field of ["name", "question", "summary", "signal", "context", "recommendation", "reason", "outcome"] as const) {
        expect(area[field].trim().length, `${area.slug}.${field}`).toBeGreaterThan(0);
      }
      expect(area.connectedSystems.length, `${area.slug}.connectedSystems`).toBeGreaterThan(0);
    }
  });

  it("has a valid authority mode for every area", () => {
    for (const area of operationalAreas) {
      expect(["inform", "recommend", "execute"]).toContain(area.authorityMode);
    }
  });

  it("stays within the approved claim boundaries", () => {
    for (const area of operationalAreas) {
      const combined = [area.signal, area.context, area.recommendation, area.reason, area.outcome].join(" ");
      assertNoUnsupportedClaims(combined, `operationalAreas.${area.slug}`);
    }
  });

  it("limits labor's exception handling to backfill, reassignment, notification, or approval", () => {
    const labor = operationalAreas.find((area) => area.slug === "labor");
    expect(labor).toBeDefined();
    const text = `${labor!.recommendation} ${labor!.reason} ${labor!.outcome}`.toLowerCase();
    expect(text).toMatch(/backfill|reassign|shift|approv|coverage/);
  });

  it("frames sales as an inform-level signal, not autonomous forecasting or a decision made for the manager", () => {
    const sales = operationalAreas.find((area) => area.slug === "sales");
    expect(sales).toBeDefined();
    expect(sales!.authorityMode).toBe("inform");
    expect(sales!.outcome.toLowerCase()).toContain("manager");
  });

  it("workspace kind matches the area slug it belongs to", () => {
    for (const area of operationalAreas) {
      expect(area.workspace.kind, area.slug).toBe(area.slug);
    }
  });
});

describe("operatingCycleStages", () => {
  it("has exactly Connect, Understand, Act, Improve in order", () => {
    expect(operatingCycleStages.map((stage) => stage.key)).toEqual(["connect", "understand", "act", "improve"]);
  });

  it("describes Improve as learning patterns, not unsupervised self-modification", () => {
    const improve = operatingCycleStages.find((stage) => stage.key === "improve");
    expect(improve).toBeDefined();
    const text = improve!.description.toLowerCase();
    // The copy should disclaim autonomous rule-rewriting, not claim it.
    expect(text).toMatch(/not a rule.*rewriting itself|not.*self-modif/);
  });
});

describe("dayTimeline", () => {
  it("has exactly three moments (start, respond, close)", () => {
    expect(dayTimeline.length).toBe(3);
  });

  it("covers more than three distinct connected systems across the day (cross-functional, not one call-out)", () => {
    const systems = new Set(dayTimeline.flatMap((moment) => moment.connectedSystems));
    expect(systems.size).toBeGreaterThan(3);
  });

  it("every moment has a non-empty outcome and a valid authority mode", () => {
    for (const moment of dayTimeline) {
      expect(moment.outcome.trim().length, `${moment.time} outcome`).toBeGreaterThan(0);
      expect(["inform", "recommend", "execute"]).toContain(moment.authorityMode);
    }
  });

  it("keeps the whole timeline concise (roughly 150 words or fewer across titles and descriptions)", () => {
    const wordCount = dayTimeline
      .map((moment) => `${moment.title} ${moment.description}`)
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    expect(wordCount).toBeLessThanOrEqual(150);
  });
});

describe("aiAssistantExamples", () => {
  it("covers every response type at least once", () => {
    const types = new Set(aiAssistantExamples.map((example) => example.responseType));
    expect(types).toEqual(new Set(["answers", "recommends", "executes", "requests-approval"]));
  });

  it("every example has a non-empty prompt and response", () => {
    for (const example of aiAssistantExamples) {
      expect(example.prompt.trim().length).toBeGreaterThan(0);
      expect(example.response.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("integrationCategories", () => {
  it("covers POS, scheduling, inventory, communication, and operational systems", () => {
    expect(integrationCategories.map((category) => category.category)).toEqual([
      "POS",
      "Scheduling",
      "Inventory",
      "Communication",
      "Operational systems",
    ]);
  });

  it("every category states an implementation qualifier rather than a fixed compatibility claim", () => {
    for (const category of integrationCategories) {
      expect(category.implementationQualifier.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("authorityLevels", () => {
  it("has exactly Inform, Recommend, Execute", () => {
    expect(authorityLevels.map((level) => level.key)).toEqual(["inform", "recommend", "execute"]);
  });
});

describe("insightExamples", () => {
  it("every example is qualitative, not a savings figure", () => {
    for (const insight of insightExamples) {
      expect(insight.qualitativeFinding.trim().length).toBeGreaterThan(0);
      expect(insight.qualitativeFinding).not.toMatch(/\$[\d,]+|%\s*(savings|reduction|increase)/i);
    }
  });
});

describe("audienceSegments", () => {
  it("has a non-empty workflow sequence for every segment", () => {
    for (const segment of audienceSegments) {
      expect(segment.workflow.length, `${segment.slug} workflow`).toBeGreaterThanOrEqual(2);
      for (const step of segment.workflow) {
        expect(step.trim().length, `${segment.slug} workflow step`).toBeGreaterThan(0);
      }
    }
  });
});

describe("patchworkSources", () => {
  it("has more than four disconnected sources", () => {
    expect(patchworkSources.length).toBeGreaterThan(4);
  });
});

describe("implementationControl", () => {
  it("stays within the approved claim boundaries", () => {
    for (const topic of implementationControl) {
      assertNoUnsupportedClaims(`${topic.question} ${topic.answer}`, topic.question);
    }
  });
});

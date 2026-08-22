import { describe, expect, it } from "vitest";
import {
  aiAssistantExamples,
  audienceSegments,
  authorityLevels,
  dayInOperation,
  implementationControl,
  insightExamples,
  integrationCategories,
  operatingCycleStages,
  operatingPillars,
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

describe("operatingPillars", () => {
  it("has exactly the five confirmed pillars", () => {
    expect(operatingPillars.map((pillar) => pillar.slug)).toEqual(["labor", "sales", "inventory", "tasks", "communication"]);
  });

  it("every pillar has all seven required fields, non-empty", () => {
    for (const pillar of operatingPillars) {
      for (const field of ["title", "signals", "connectedData", "aiActions", "managerControl", "outcome", "example"] as const) {
        expect(pillar[field].trim().length, `${pillar.slug}.${field}`).toBeGreaterThan(0);
      }
    }
  });

  it("stays within the approved claim boundaries", () => {
    for (const pillar of operatingPillars) {
      const combined = [pillar.signals, pillar.connectedData, pillar.aiActions, pillar.managerControl, pillar.outcome, pillar.example].join(
        " ",
      );
      assertNoUnsupportedClaims(combined, `operatingPillars.${pillar.slug}`);
    }
  });

  it("limits exception handling in the labor pillar to backfill, reassignment, notification, or approval", () => {
    const labor = operatingPillars.find((pillar) => pillar.slug === "labor");
    expect(labor).toBeDefined();
    const text = `${labor!.aiActions} ${labor!.managerControl}`.toLowerCase();
    expect(text).toMatch(/backfill|reassign|notif|approval/);
  });

  it("frames sales insight as surfacing, not autonomous forecasting", () => {
    const sales = operatingPillars.find((pillar) => pillar.slug === "sales");
    expect(sales).toBeDefined();
    expect(sales!.managerControl.toLowerCase()).toContain("manager");
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

describe("dayInOperation", () => {
  it("has more than one event and covers more than one source (cross-functional, not one call-out)", () => {
    expect(dayInOperation.length).toBeGreaterThan(4);
    const sources = new Set(dayInOperation.map((event) => event.source));
    expect(sources.size).toBeGreaterThan(3);
  });

  it("every event has a non-empty result and a valid authority mode", () => {
    for (const event of dayInOperation) {
      expect(event.result.trim().length, `${event.time} result`).toBeGreaterThan(0);
      expect(["inform", "recommend", "execute"]).toContain(event.authorityMode);
    }
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

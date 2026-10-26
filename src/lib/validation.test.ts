import { describe, expect, it } from "vitest";
import { demoRequestDefaultValues, demoRequestSchema, parseAppUrl, parseBookingUrl } from "@/lib/validation";

const validPayload = {
  ...demoRequestDefaultValues,
  name: "Jamie Rivera",
  email: "jamie@example.com",
  company: "Rivera Restaurant Group",
  role: "Director of Operations",
  industry: "restaurant-groups",
  workflowExample: "Shift swaps and handoffs across our cafés.",
  consent: true,
};

describe("demoRequestSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = demoRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing name", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, name: "" });
    expect(result.success).toBe(false);
  });

  it("requires consent to be true", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
  });

  it("accepts an empty optional message", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, message: "" });
    expect(result.success).toBe(true);
  });

  it("requires organization type and a description of what to help with", () => {
    expect(demoRequestSchema.safeParse({ ...validPayload, industry: "" }).success).toBe(false);
    expect(demoRequestSchema.safeParse({ ...validPayload, workflowExample: "" }).success).toBe(false);
  });

  it("accepts a submission with no current tools or team size", () => {
    expect(
      demoRequestSchema.safeParse({ ...validPayload, currentTools: "", hourlyEmployees: "" }).success,
    ).toBe(true);
  });

  it("rejects a workflow example over the length limit", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, workflowExample: "a".repeat(601) });
    expect(result.success).toBe(false);
  });

  it("still parses successfully when the honeypot field is filled", () => {
    // Schema validation stays permissive here — the API route is responsible
    // for silently dropping submissions where the honeypot is filled, rather
    // than surfacing a validation error to the (likely automated) submitter.
    const result = demoRequestSchema.safeParse({
      ...validPayload,
      company_website: "https://spambot.example",
    });
    expect(result.success).toBe(true);
  });
});

describe("parseBookingUrl", () => {
  it("accepts https URLs", () => {
    expect(parseBookingUrl("https://cal.example.com/straw")).toBe("https://cal.example.com/straw");
  });

  it.each([undefined, "", "   ", "http://cal.example.com", "javascript:alert(1)", "not a url", "//cal.example.com", "https://user:pw@cal.example.com"])(
    "rejects unsafe or malformed value %j",
    (value) => {
      expect(parseBookingUrl(value)).toBeNull();
    },
  );
});

describe("parseAppUrl", () => {
  it("accepts https URLs", () => {
    expect(parseAppUrl("https://app.example.com")).toBe("https://app.example.com/");
  });

  it.each([undefined, "", "http://app.example.com", "javascript:alert(1)", "not a url", "https://user:pw@app.example.com"])(
    "hides login for unsafe or unset value %j",
    (value) => {
      expect(parseAppUrl(value)).toBeNull();
    },
  );
});

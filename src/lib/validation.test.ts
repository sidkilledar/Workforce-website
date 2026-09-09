import { describe, expect, it } from "vitest";
import { demoRequestDefaultValues, demoRequestSchema } from "@/lib/validation";

const validPayload = {
  ...demoRequestDefaultValues,
  name: "Jamie Rivera",
  email: "jamie@example.com",
  company: "Rivera Restaurant Group",
  role: "Director of Operations",
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

  it("accepts a submission with no workflow example or current tools", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, workflowExample: "", currentTools: "" });
    expect(result.success).toBe(true);
  });

  it("accepts a submission with a workflow example and current tools", () => {
    const result = demoRequestSchema.safeParse({
      ...validPayload,
      workflowExample: "A closer calls out three hours before service.",
      currentTools: "Scheduling software, Slack, spreadsheets",
    });
    expect(result.success).toBe(true);
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

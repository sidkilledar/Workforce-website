import { describe, expect, it } from "vitest";
import { demoRequestDefaultValues, demoRequestSchema } from "@/lib/validation";

const validPayload = {
  ...demoRequestDefaultValues,
  name: "Jamie Rivera",
  email: "jamie@example.com",
  phone: "555-123-4567",
  company: "Rivera Restaurant Group",
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

  it("rejects a phone number with letters", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, phone: "call-me-maybe" });
    expect(result.success).toBe(false);
  });

  it("accepts an empty optional phone number", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, phone: "" });
    expect(result.success).toBe(true);
  });

  it("requires consent to be true", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
  });

  it("accepts an empty optional message", () => {
    const result = demoRequestSchema.safeParse({ ...validPayload, message: "" });
    expect(result.success).toBe(true);
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

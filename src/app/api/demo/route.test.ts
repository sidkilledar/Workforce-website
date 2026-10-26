import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const sendNotification = vi.fn();
const sendConfirmation = vi.fn();

vi.mock("@/lib/email", () => ({
  sendDemoRequestNotification: (...args: unknown[]) => sendNotification(...args),
  sendDemoRequestConfirmation: (...args: unknown[]) => sendConfirmation(...args),
}));

import { POST } from "@/app/api/demo/route";

function makeRequest(body: unknown, ip = `1.2.3.${Math.floor(Math.random() * 255)}`) {
  return new NextRequest("http://localhost/api/demo", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Jamie Rivera",
  email: "jamie@example.com",
  company: "Rivera Restaurant Group",
  role: "Director of Operations",
  industry: "restaurant-groups",
  locations: "2–5 locations",
  hourlyEmployees: "25–100",
  frictionWorkflow: "scheduling",
  currentTools: "Scheduling software, POS, and team chat",
  workflowExample: "Shift swaps and handoffs across our cafés.",
  message: "",
  consent: true,
  company_website: "",
};

beforeEach(() => {
  sendNotification.mockReset().mockResolvedValue(undefined);
  sendConfirmation.mockReset().mockResolvedValue(undefined);
});

describe("POST /api/demo", () => {
  it("sends notification and confirmation emails for a valid request", async () => {
    const response = await POST(makeRequest(validPayload));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.status).toBe("success");
    expect(sendNotification).toHaveBeenCalledTimes(1);
    expect(sendConfirmation).toHaveBeenCalledTimes(1);
  });

  it("requires organization type and what the visitor wants help with", async () => {
    const response = await POST(makeRequest({ ...validPayload, industry: "", workflowExample: "" }));
    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.fieldErrors.industry).toBeDefined();
    expect(json.fieldErrors.workflowExample).toBeDefined();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("passes qualification context to the notification", async () => {
    await POST(makeRequest(validPayload));
    expect(sendNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        industry: "restaurant-groups",
        hourlyEmployees: "25–100",
        workflowExample: "Shift swaps and handoffs across our cafés.",
      }),
    );
  });

  it("returns validation errors for missing fields without sending email", async () => {
    const response = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.fieldErrors.email).toBeDefined();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without sending email", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, company_website: "https://spambot.example" }),
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.status).toBe("success");
    expect(sendNotification).not.toHaveBeenCalled();
    expect(sendConfirmation).not.toHaveBeenCalled();
  });

  it("returns 502 when email sending fails", async () => {
    sendNotification.mockRejectedValueOnce(new Error("Resend down"));
    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(502);
  });

  it("rate limits repeated requests from the same client", async () => {
    const ip = "9.9.9.9";
    let last;
    for (let i = 0; i < 6; i += 1) {
      last = await POST(makeRequest(validPayload, ip));
    }
    expect(last!.status).toBe(429);
  });
});

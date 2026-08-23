import { NextResponse, type NextRequest } from "next/server";
import { demoRequestSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendDemoRequestConfirmation, sendDemoRequestNotification } from "@/lib/email";

export const runtime = "nodejs";

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(identifier);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        status: "rate_limited",
        message: "You've submitted a few requests already. Please try again shortly.",
      },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "invalid", message: "Malformed request body." },
      { status: 400 },
    );
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { status: "invalid", message: "Please check the form and try again.", fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot: silently accept the submission without sending anything.
  if (parsed.data.company_website) {
    return NextResponse.json({ status: "success" }, { status: 200 });
  }

  try {
    await sendDemoRequestNotification(parsed.data);
    await sendDemoRequestConfirmation(parsed.data);
  } catch (error) {
    console.error("Failed to send demo request email", error);
    return NextResponse.json(
      {
        status: "error",
        message: "We couldn't send your request right now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ status: "success" }, { status: 200 });
}

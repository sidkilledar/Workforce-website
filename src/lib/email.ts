import { Resend } from "resend";
import type { DemoRequestInput } from "@/lib/validation";
import { demoIndustries, frictionWorkflows } from "@/lib/site-config";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(apiKey);
}

function industryLabel(slug: string) {
  return demoIndustries.find((industry) => industry.value === slug)?.label ?? slug;
}

function frictionWorkflowLabel(value: string) {
  return frictionWorkflows.find((item) => item.value === value)?.label ?? value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendDemoRequestNotification(data: DemoRequestInput) {
  const resend = getResendClient();
  const fromAddress = process.env.RESEND_FROM_EMAIL;
  const salesInbox = process.env.SALES_INBOX_EMAIL;

  if (!fromAddress || !salesInbox) {
    throw new Error("RESEND_FROM_EMAIL or SALES_INBOX_EMAIL is not configured.");
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Work email", data.email],
    ["Company", data.company],
    ["Role", data.role],
    ["Industry", industryLabel(data.industry)],
    ["Locations", data.locations],
    ["Hourly employees", data.hourlyEmployees],
    ["Biggest friction", frictionWorkflowLabel(data.frictionWorkflow)],
    ["Current systems", data.currentSystems],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#666;font-size:13px;">${escapeHtml(
          label,
        )}</td><td style="padding:6px 12px;font-size:14px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  await resend.emails.send({
    from: fromAddress,
    to: salesInbox,
    replyTo: data.email,
    subject: `New demo request: ${data.company}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;">
        <h2 style="margin-bottom:4px;">New demo request</h2>
        <p style="color:#666;margin-top:0;">Submitted via the WorkforceOS website.</p>
        <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
        ${
          data.message
            ? `<p style="margin-top:16px;"><strong>Message</strong><br />${escapeHtml(
                data.message,
              ).replace(/\n/g, "<br />")}</p>`
            : ""
        }
      </div>
    `,
  });
}

export async function sendDemoRequestConfirmation(data: DemoRequestInput) {
  const resend = getResendClient();
  const fromAddress = process.env.RESEND_FROM_EMAIL;

  if (!fromAddress) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const firstName = data.name.trim().split(/\s+/)[0] ?? data.name;

  await resend.emails.send({
    from: fromAddress,
    to: data.email,
    subject: "We received your WorkforceOS demo request",
    html: `
      <div style="font-family:sans-serif;max-width:560px;">
        <h2>Thanks, ${escapeHtml(firstName)}.</h2>
        <p>
          We received your request for a WorkforceOS demo for ${escapeHtml(
            data.company,
          )}. Our team will reach out at ${escapeHtml(
            data.email,
          )} shortly to find a time that works.
        </p>
        <p>In the meantime, feel free to reply to this email with any questions.</p>
        <p style="color:#666;font-size:12px;margin-top:32px;">
          WorkforceOS &middot; This message was sent because you requested a demo on our website.
        </p>
      </div>
    `,
  });
}

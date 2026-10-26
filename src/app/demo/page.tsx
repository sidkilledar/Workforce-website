import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { DemoForm } from "@/components/site/DemoForm";
import { parseBookingUrl } from "@/lib/validation";
import "./demo.css";

export const metadata: Metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "Share a little context, then choose a time. We start with product examples and a sample walkthrough, then focus on your operation and the tools you use.",
  path: "/demo",
});

// Evaluated per request so DEMO_BOOKING_URL changes don't need a rebuild.
export const dynamic = "force-dynamic";

const steps = [
  ["Product examples", "A quick look at how Straw works across real frontline operations."],
  ["A sample walkthrough", "See Straw handle a typical task through the app, iMessage, and WhatsApp."],
  ["Your operation", "We look at your team, your current tools, and whether you'd start fresh, connect them, or do both."],
];

export default function DemoPage() {
  // Server-only read; only a validated https URL ever reaches the client.
  const bookingUrl = parseBookingUrl(process.env.DEMO_BOOKING_URL);

  return (
    <div className="straw-booking">
      <div className="straw-booking-grid">
        <div>
          <p className="straw-booking-eyebrow">Book a demo</p>
          <h1>See Straw work around your operation.</h1>
          <p className="straw-booking-lede">
            Tell us about your operation first, then choose a meeting time. We
            set Straw up for you, and scope any custom features together in the
            meeting.
          </p>
          <DemoForm bookingUrl={bookingUrl} />
        </div>
        <aside className="straw-aside">
          <h2>What the meeting covers</h2>
          <ol>
            {steps.map(([title, body], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}

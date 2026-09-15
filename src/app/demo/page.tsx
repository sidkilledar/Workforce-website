import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { DemoForm } from "@/components/site/DemoForm";
import { pilotCustomers } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Request a Demo",
  description:
    "Bring one recurring operational problem. We will prepare a WorkforceOS walkthrough around your systems, your people, and your approval rules.",
  path: "/demo",
});
export default function DemoPage() {
  return (
    <div className="op-demo-page">
      <div className="op-container op-demo-grid">
        <div>
          <p className="op-eyebrow">Let’s look at your operation</p>
          <h1>
            Start with the work
            <br />
            you keep doing by hand.
          </h1>
          <p className="op-demo-lede">
            Tell us a little about your team. We’ll reach out to arrange a
            walkthrough around your workflow.
          </p>
          <DemoForm />
        </div>
        <aside className="op-demo-aside">
          <span className="op-meta">A conversation built around you</span>
          <h2>
            One problem.
            <br />A useful next step.
          </h2>
          <ol>
            {[
              [
                "Your current workflow",
                "Where information lives and where the handoffs slow down.",
              ],
              [
                "The response",
                "What WorkforceOS can coordinate, and where a manager approves.",
              ],
              [
                "A practical starting point",
                "The systems, rules, and scope for a focused pilot.",
              ],
            ].map(([title, body], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="op-demo-proof">
            <strong>{pilotCustomers.length} active pilots</strong>
            <p>
              Built with teams in catering, restaurant groups, and campus
              recreation.
            </p>
          </div>
          <p className="op-small">
            Submitting requests a conversation. We’ll confirm a time with you
            before anything is booked.
          </p>
        </aside>
      </div>
    </div>
  );
}

import Link from "next/link";
import { TrackedCta } from "./TrackedCta";
import { EventRecord } from "./OperationPrimitives";
import { ConfigurationExample, ModuleFrame } from "./OperationsInteractive";
import { coverageScenario as event } from "@/lib/operations-scenario";
import {
  implementationControl,
  pilotCustomers,
  proofSection,
} from "@/lib/site-config";

const capabilities = [
  ["Scheduling", "Coverage requests, eligibility, manager approval"],
  ["Communication", "Outreach, responses, escalation"],
  ["Inventory", "Stock thresholds, replenishment tasks"],
  ["Forecasting", "Demand compared against scheduled coverage"],
  ["Tasks", "Ownership, deadlines, escalation"],
  ["Configuration", "Rules, approvals, and terminology per operation"],
  ["Integrations", "Existing systems, read and write-back where supported"],
  ["AI control", "Suggest, require approval, or run within approved rules"],
] as const;

function Hero() {
  return (
    <section className="op-hero" id="hero">
      <div className="op-container op-hero-copy-wide">
        <p className="op-eyebrow">
          For restaurants, catering, and campus operations
        </p>
        <h1>
          See what needs attention.{" "}
          <strong>Coordinate what happens next.</strong>
        </h1>
        <p className="op-hero-intro">
          One system for scheduling, communication, inventory, and tasks —
          built around your rules and your managers’ approvals.
        </p>
        <div className="op-hero-actions">
          <TrackedCta location="hero" variant="cta">
            Request a Demo
          </TrackedCta>
          <a href="#how-it-works" className="op-hero-link">
            Explore a workflow <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
function CapabilityList() {
  return (
    <section className="op-section op-capabilities-list" id="capability-list">
      <div className="op-container">
        <p className="op-eyebrow">Everything the operation touches</p>
        <div className="op-capabilities-grid">
          {capabilities.map(([label, detail]) => (
            <div key={label} className="op-capability-row">
              <strong>{label}</strong>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProofStrip() {
  return (
    <section className="op-proof-strip" aria-label="Pilot overview">
      <div className="op-container">
        <div>
          <strong>{pilotCustomers.length} active pilots</strong>
          <p>Built alongside operating teams</p>
        </div>
        <div>
          <strong>Across industries</strong>
          <p>Catering, restaurants, campus recreation</p>
        </div>
        <div>
          <strong>One workflow to start</strong>
          <p>Configured around your operation</p>
        </div>
      </div>
    </section>
  );
}
function CoordinationProblem() {
  return (
    <section className="op-section" id="problem">
      <div className="op-container op-problem-grid">
        <div>
          <p className="op-eyebrow">The coordination problem</p>
          <h2>
            The gap is small.
            <br />
            The chase isn’t.
          </h2>
          <p className="op-intro">
            One call-out. Four places to check. A manager holding the whole
            response together.
          </p>
          <p className="op-muted">
            The issue stays open until someone completes every handoff.
          </p>
        </div>
        <div
          className="op-coordination"
          aria-label="A manager manually checks the schedule, contacts available people, follows up in messages, and updates the approval"
        >
          <div className="op-map-record">
            <span className="op-meta">Schedule</span>
            <strong>Closing shift: 1 role open</strong>
            <span className="op-manual">Check ↓</span>
          </div>
          <div className="op-map-record">
            <span className="op-meta">Availability</span>
            <strong>Who can actually cover?</strong>
            <span className="op-manual">Contact ↓</span>
          </div>
          <div className="op-manager">
            <span className="op-avatar">M</span>
            <strong>Manager</strong>
            <span className="op-meta">{event.id}</span>
          </div>
          <div className="op-map-record">
            <span className="op-meta">Messages</span>
            <strong>“Have you heard back?”</strong>
            <span className="op-manual">Follow up ↓</span>
          </div>
          <div className="op-map-record">
            <span className="op-meta">Approval</span>
            <strong>Confirm. Then update everyone.</strong>
            <span className="op-manual">Update ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function PlatformExplanation() {
  return (
    <section className="op-section op-platform" id="capabilities">
      <div className="op-container">
        <div className="op-section-heading">
          <p className="op-eyebrow">The platform</p>
          <h2>
            Your tools talk.
            <br />
            WorkforceOS listens, decides, and acts.
          </h2>
          <p className="op-intro">
            It reads your schedule, sales, and messages, checks them against
            your rules, and tells the right person what to do next.
          </p>
        </div>
        <div className="op-platform-flow">
          <div className="op-source-list">
            <p className="op-meta">What it reads</p>
            {[
              "Schedules & availability",
              "Sales & demand",
              "Inventory & stock",
              "Messages & responses",
            ].map((x, i) => (
              <div key={x}>
                <span className="op-source-symbol" aria-hidden>
                  {["▦", "↗", "≡", "↳"][i]}
                </span>
                {x}
              </div>
            ))}
          </div>
          <div className="op-connector" aria-hidden>
            →
          </div>
          <div className="op-platform-core">
            <span className="op-platform-brand">WorkforceOS</span>
            <ol>
              <li>Spots the gap</li>
              <li>Checks it against your rules</li>
              <li>Contacts or acts on it</li>
              <li>Logs what happened</li>
            </ol>
          </div>
          <div className="op-connector" aria-hidden>
            →
          </div>
          <div className="op-output-list">
            <p className="op-meta">What happens next</p>
            {[
              "Right people contacted",
              "Approval recorded",
              "Relevant systems updated",
              "Outcome tracked",
            ].map((x) => (
              <div key={x}>
                <span aria-hidden>✓</span>
                {x}
              </div>
            ))}
          </div>
        </div>
        <div className="op-capability-index">
          {[
            "Scheduling",
            "Communication",
            "Forecasting",
            "Inventory",
            "Exceptions",
            "Workflows",
          ].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <p className="op-small">
          Connections and write-back actions depend on your systems and the
          workflow configured during setup.
        </p>
      </div>
    </section>
  );
}
function ModuleShowcase() {
  return (
    <section className="op-section op-dark" id="how-it-works">
      <div className="op-container">
        <div className="op-section-heading">
          <p className="op-eyebrow">Watch it work</p>
          <h2>
            Don’t just spot the gap.
            <br />
            <strong>Get it solved.</strong>
          </h2>
          <p className="op-intro">
            Scheduling, communication, inventory, tasks, and the rules that
            govern them — five parts of one operation. Click through each
            one to see exactly what happens.
          </p>
        </div>
        <ModuleFrame />
        <p className="op-demo-summary">
          Detect the issue → check eligibility → contact the team → record
          acceptance → get approval → confirm assignment.
        </p>
      </div>
    </section>
  );
}
function Configuration() {
  return (
    <section className="op-section" id="ai-control">
      <div className="op-container">
        <div className="op-section-heading">
          <p className="op-eyebrow">Configuration &amp; control</p>
          <h2>
            Fits the way
            <br />
            your operation works.
          </h2>
          <p className="op-intro">
            No two operations run the same way. We set up the roles, rules,
            approvals, and escalation paths with your team — compare two
            examples below.
          </p>
        </div>
        <ConfigurationExample />
      </div>
    </section>
  );
}
const integrations = [
  {
    category: "Scheduling",
    input: "Shifts, roles, availability",
    output: "Assignments and schedule updates where supported",
    method: "Supported API",
    status: "Confirm your system",
  },
  {
    category: "Sales / POS",
    input: "Sales and demand signals",
    output: "No write-back assumed",
    method: "Supported API",
    status: "Confirm your system",
  },
  {
    category: "Communication",
    input: "Operational responses",
    output: "Requests and updates on configured channels",
    method: "Supported API",
    status: "Channel setup required",
  },
  {
    category: "Payroll, HR, inventory",
    input: "Scheduled files or exports",
    output: "Write-back assessed separately",
    method: "File-based import",
    status: "Mapping during setup",
  },
  {
    category: "Custom systems",
    input: "Agreed operational data",
    output: "Scoped to your workflow",
    method: "Assessed connection",
    status: "Technical assessment",
  },
];
function Integrations() {
  return (
    <section className="op-section op-integrations" id="connected">
      <div className="op-container">
        <div className="op-section-heading">
          <p className="op-eyebrow">Integrations</p>
          <h2>
            Start with the tools
            <br />
            you already use.
          </h2>
          <p className="op-intro">
            Connection methods vary by system. We confirm the information
            available and the actions supported before scoping your pilot.
          </p>
        </div>
        <div className="op-integration-flow">
          <span>Information in</span>
          <span aria-hidden>→</span>
          <strong>WorkforceOS</strong>
          <span aria-hidden>→</span>
          <span>Supported updates out</span>
        </div>
        <div
          className="op-integration-table"
          role="table"
          aria-label="Integration methods and setup scope"
        >
          <div className="op-integration-row op-table-head" role="row">
            {[
              "System category",
              "Information received",
              "Updates supported",
              "Connection / status",
            ].map((x) => (
              <div role="columnheader" key={x}>
                {x}
              </div>
            ))}
          </div>
          {integrations.map((row) => (
            <div className="op-integration-row" role="row" key={row.category}>
              <div role="cell">
                <span className="op-mobile-label">System category</span>
                <strong>{row.category}</strong>
              </div>
              <div role="cell">
                <span className="op-mobile-label">Information received</span>
                {row.input}
              </div>
              <div role="cell">
                <span className="op-mobile-label">Updates supported</span>
                {row.output}
              </div>
              <div role="cell">
                <span className="op-mobile-label">Connection / status</span>
                <strong>{row.method}</strong>
                <small>{row.status}</small>
              </div>
            </div>
          ))}
        </div>
        <Link className="op-inline-link" href="/demo">
          Discuss your current tools <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}
function CaseStories() {
  return (
    <section className="op-section" id="proof">
      <div className="op-container">
        <div className="op-section-heading">
          <p className="op-eyebrow">Results across industries</p>
          <h2>
            Real operations.
            <br />
            Less work between the work.
          </h2>
          <p className="op-intro">
            Three active pilots, shaped around the teams running them. These are
            the outcomes they report.
          </p>
        </div>
        <div className="op-stories">
          {proofSection.cards.map((story, index) => (
            <article
              key={story.name}
              className={`op-story ${index === 0 ? "op-story-featured" : ""}`}
            >
              <p className="op-meta">{story.context}</p>
              <h3>{story.name}</h3>
              {index === 0 ? (
                <>
                  <p className="op-story-number">
                    10-15 <span>hours / week</span>
                  </p>
                  <p>
                    Saved by the operations team on scheduling, staffing, and
                    daily coordination.
                  </p>
                  <div className="op-story-process">
                    <span>Schedule</span>
                    <span aria-hidden>→</span>
                    <span>Staff</span>
                    <span aria-hidden>→</span>
                    <span>Coordinate</span>
                  </div>
                </>
              ) : (
                <p className="op-story-result">{story.result}</p>
              )}
              <p className="op-story-note">{story.note.replace(" — ", ": ")}</p>
            </article>
          ))}
        </div>
        <p className="op-small op-proof-qualification">
          Pilot-reported outcomes, specific to each operation. Results are not a
          promise for every team. Customer quotes and logos will be added when
          cleared for publication.
        </p>
      </div>
    </section>
  );
}
const rollout = [
  [
    "Choose the first problem",
    "Start with the recurring coordination work that costs your team time.",
    "A defined workflow",
  ],
  [
    "Confirm the information",
    "Review your systems, data, and the actions the workflow needs.",
    "A connection scope",
  ],
  [
    "Configure the rules",
    "Set eligibility, approvals, response windows, and escalation owners.",
    "An agreed operating boundary",
  ],
  [
    "Pilot, measure, expand",
    "Start with one team. Review completed work before adding more.",
    "A measured next step",
  ],
];
function Rollout() {
  return (
    <section className="op-section op-rollout-section" id="implementation">
      <div className="op-container">
        <div className="op-section-heading">
          <h2>
            One useful workflow.
            <br />A practical place to start.
          </h2>
        </div>
        <ol className="op-rollout">
          {rollout.map(([title, description, output], i) => (
            <li key={title}>
              <span className="op-rollout-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="op-rollout-output">{output}</span>
            </li>
          ))}
        </ol>
        <p className="op-small">
          Pilot timing and integration scope are confirmed after reviewing your
          current systems.
        </p>
      </div>
    </section>
  );
}
function Faq() {
  return (
    <section className="op-section" id="faq">
      <div className="op-container op-faq-grid">
        <h2>
          A few things
          <br />
          you may be wondering.
        </h2>
        <div>
          {implementationControl
            .filter((_, i) => [1, 2, 3, 4].includes(i))
            .map((item) => (
              <details className="op-faq-item" key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden>+</span>
                </summary>
                <p>{item.answer.replaceAll(" — ", ". ")}</p>
              </details>
            ))}
        </div>
      </div>
    </section>
  );
}
function FinalCta() {
  return (
    <section className="op-section op-final" id="final-cta">
      <div className="op-container op-final-grid">
        <div>
          <h2>
            Bring us the problem
            <br />
            you keep chasing.
          </h2>
          <p className="op-intro">
            We’ll walk through your workflow, the systems it needs, and where
            your team stays in control.
          </p>
          <TrackedCta location="final_cta" variant="cta">
            Request a Demo
          </TrackedCta>
          <p className="op-hero-reassurance">
            Tell us a little about your team. We’ll reach out to arrange a
            walkthrough.
          </p>
        </div>
        <div>
          <EventRecord completed />
          <p className="op-final-caption">
            Illustrative outcome / The same request, resolved.
          </p>
        </div>
      </div>
    </section>
  );
}
export function BusinessHomepage() {
  return (
    <div className="operations-site">
      <Hero />
      <ProofStrip />
      <CoordinationProblem />
      <PlatformExplanation />
      <CapabilityList />
      <ModuleShowcase />
      <Configuration />
      <Integrations />
      <CaseStories />
      <Rollout />
      <Faq />
      <FinalCta />
    </div>
  );
}

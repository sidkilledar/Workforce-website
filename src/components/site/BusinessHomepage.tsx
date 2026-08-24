import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LoopDiagram } from "@/components/site/LoopDiagram";
import {
  audienceSegments,
  implementationControl,
  operationalAreas,
  pilotImpact,
} from "@/lib/site-config";

/** Renders a copy fragment's em-dash clauses as comma clauses, without
    leaving a stray space behind (a plain replaceAll("—", ",") would). */
function deEmDash(text: string) {
  return text.replace(/\s*—\s*/g, ", ");
}

const manualSteps = [
  "Check the schedule",
  "Read team messages",
  "Confirm availability",
  "Find an eligible response",
  "Update the system",
  "Notify everyone affected",
];

const workflowSteps = [
  {
    number: "01",
    title: "Connect",
    detail: "Staffing, sales, inventory, tasks, and team updates arrive in one operating layer.",
    mode: "Inputs",
  },
  {
    number: "02",
    title: "Understand",
    detail: "WorkforceOS identifies the exceptions, dependencies, and operational context that matter now.",
    mode: "Inform",
  },
  {
    number: "03",
    title: "Prepare",
    detail: "A specific response is prepared with its reason, impact, and affected systems attached.",
    mode: "Recommend",
  },
  {
    number: "04",
    title: "Approve",
    detail: "The manager reviews sensitive decisions while routine, pre-authorized work can continue.",
    mode: "Human control",
  },
  {
    number: "05",
    title: "Coordinate",
    detail: "Approved changes reach the relevant schedule, task list, inventory record, or team channel.",
    mode: "Execute",
  },
  {
    number: "06",
    title: "Record",
    detail: "The action and outcome become part of the operation's shared history.",
    mode: "Audit",
  },
];

const implementationSteps = [
  ["Choose one workflow", "Start with the coordination work creating the clearest daily burden."],
  ["Confirm compatibility", "Review the systems, data access, roles, and approval requirements involved."],
  ["Run with visibility", "Validate the information and recommendations before enabling operational actions."],
  ["Set the boundary", "Decide which actions inform, recommend, or execute for each workflow."],
  ["Measure and expand", "Add another workflow only after the first one demonstrates practical value."],
] as const;

export function BusinessHomepage() {
  return (
    <>
      <Hero />
      <PilotProof />
      <CoordinationCost />
      <Workflow />
      <Capabilities />
      <IntegrationAndControl />
      <Implementation />
      <Audience />
      <Faq />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-canvas)]">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative grid min-h-[calc(100dvh-7rem)] items-center gap-10 py-12 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="max-w-3xl">
          <p className="label-mono text-[var(--color-signal-strong)]">One operating layer for every shift</p>
          <h1 className="mt-5 max-w-[12ch] text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--color-text-primary)] sm:text-6xl lg:text-[4.8rem]">
            Run the whole operation from one connected view.
          </h1>
          <p className="mt-7 max-w-[62ch] text-lg leading-relaxed text-[var(--color-text-secondary)]">
            WorkforceOS connects labor, sales, inventory, tasks, and communication so managers can see what needs attention and coordinate the response from one place.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Button href="/demo" size="lg" arrow>Request a tailored demo</Button>
            <Button href="#how-it-works" variant="ghost" size="lg">See a workflow</Button>
          </div>
        </div>

        <OperatingLayerVisual />
      </Container>
    </section>
  );
}

function OperatingLayerVisual() {
  const inputs = ["Labor", "Sales", "Inventory", "Tasks", "Team channels"];
  const outputs = ["Priorities", "Recommendations", "Approvals", "Coordinated actions"];

  return (
    <div
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-dark)] p-5 text-[var(--color-text-on-dark-primary)] shadow-[0_28px_70px_-36px_rgba(20,25,30,0.55)] sm:p-7"
      aria-label="Illustrative WorkforceOS operating layer"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border-on-dark)] pb-5">
        <div>
          <p className="text-sm font-semibold">Live operation</p>
          <p className="mt-1 text-xs text-[var(--color-text-on-dark-muted)]">All locations · Illustrative product model</p>
        </div>
        <span className="text-xs font-medium text-[var(--color-signal-soft)]">Manager controlled</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[0.8fr_1.15fr_0.9fr] sm:items-stretch">
        <div className="space-y-2">
          <p className="label-mono mb-3 text-[var(--color-text-on-dark-muted)]">Connected systems</p>
          {inputs.map((input) => (
            <div key={input} className="ticket-slip-dark px-3 py-3 text-sm text-[var(--color-text-on-dark-secondary)]">
              {input}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-[var(--color-canvas-elevated)] p-5 text-[var(--color-text-primary)]">
          <p className="text-xs font-medium text-[var(--color-signal-strong)]">WorkforceOS</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">One prioritized operating picture</h2>
          <div className="mt-6 space-y-4">
            <div className="border-t border-[var(--color-border)] pt-4">
              <p className="text-xs text-[var(--color-text-muted)]">Needs attention</p>
              <p className="mt-2 text-sm font-medium">Demand, coverage, stock, and unfinished work reviewed together</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <p className="text-xs text-[var(--color-text-muted)]">Next response</p>
              <p className="mt-2 text-sm font-medium">Context and authority determine what happens next</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="label-mono mb-3 text-[var(--color-text-on-dark-muted)]">Operational outcomes</p>
          {outputs.map((output, index) => (
            <div
              key={output}
              className={`ticket-slip-dark px-3 py-3 text-sm ${index === 2 ? "border-[var(--color-signal)] bg-[var(--color-signal)]/10 text-[var(--color-text-on-dark-primary)]" : "text-[var(--color-text-on-dark-secondary)]"}`}
            >
              {output}
            </div>
          ))}
          <div className="ticket-slip-dark px-3 py-4">
            <p className="text-2xl font-semibold">10 to 15</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-on-dark-muted)]">operations hours saved weekly in one active pilot</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PilotProof() {
  return (
    <section id="customer-results" className="border-b border-[var(--color-border)] bg-[var(--color-canvas-raised)]">
      <Container className="grid gap-8 py-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">Active customer pilots</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Two organizations collectively operate workforces totaling more than 1,000 people.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
          {pilotImpact.customers.map((customer) => (
            <article key={customer.name} className="bg-[var(--color-canvas-elevated)] p-6">
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">{customer.name}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{customer.context} · Active pilot</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{customer.result}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CoordinationCost() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Your software records the work. Managers still coordinate it by hand.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            The cost is not one bad system. It is the time spent moving between accurate systems to reach one operational decision.
          </p>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {manualSteps.map((step, index) => (
              <li key={step} className="ticket-slip px-4 py-5">
                <span className="font-mono text-xs text-[var(--color-signal-strong)]">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 max-w-[15ch] text-sm font-medium leading-snug">{step}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl bg-[var(--color-canvas-dark)] p-7 text-[var(--color-text-on-dark-primary)] sm:p-10 lg:flex lg:items-center lg:gap-10">
            <div className="lg:flex-1">
              <p className="text-sm text-[var(--color-text-on-dark-muted)]">With WorkforceOS</p>
              <p className="mt-5 max-w-[18ch] text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                One managed workflow from issue to outcome.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  ["See", "The relevant context arrives together."],
                  ["Decide", "The next step includes its reason and boundary."],
                  ["Coordinate", "Approved changes reach every affected system."],
                ].map(([title, detail]) => (
                  <div key={title} className="border-t border-[var(--color-border-on-dark)] pt-4">
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div aria-hidden className="mt-10 hidden shrink-0 justify-self-center lg:mt-0 lg:block">
              <LoopDiagram mode="hero" size={160} stageCodes={["C", "U", "A", "R"]} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Workflow() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-[var(--color-canvas-elevated)] py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="label-mono text-[var(--color-signal-strong)]">One operating model, end to end</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Every signal follows a controlled path to action.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            The same operating model applies to staffing gaps, demand changes, inventory exceptions, unfinished work, and approval requests.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <li
              key={step.number}
              className={`min-h-64 rounded-2xl border p-6 ${index === 2 || index === 3 ? "border-[var(--color-canvas-dark)] bg-[var(--color-canvas-dark)] text-[var(--color-text-on-dark-primary)]" : "border-[var(--color-border)] bg-[var(--color-canvas)]"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className={`font-mono text-xs ${index === 2 || index === 3 ? "text-[var(--color-text-on-dark-muted)]" : "text-[var(--color-text-muted)]"}`}>{step.number}</span>
                <span className={`text-xs font-medium ${index === 2 || index === 3 ? "text-[var(--color-signal-soft)]" : "text-[var(--color-signal-strong)]"}`}>{step.mode}</span>
              </div>
              <h3 className="mt-16 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${index === 2 || index === 3 ? "text-[var(--color-text-on-dark-secondary)]" : "text-[var(--color-text-secondary)]"}`}>{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["Demand and labor", "Sales activity changes", "Review coverage before service"],
            ["Inventory and tasks", "Stock falls below threshold", "Create or assign the required work"],
            ["Communication and approvals", "A decision is waiting", "Approve once with the context attached"],
          ].map(([title, trigger, outcome]) => (
            <article key={title} className="ticket-slip p-5">
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="label-mono mt-4 text-[var(--color-text-muted)]">Trigger</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{trigger}</p>
              <p className="label-mono mt-4 text-[var(--color-text-muted)]">Operational response</p>
              <p className="mt-1 text-sm font-medium">{outcome}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="use-cases" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Start with one burden. Expand from there.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            Each operating area follows the same pattern: detect the issue, attach the context, prepare the response, and respect the authority boundary.
          </p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-2xl bg-[var(--color-signal-soft)] p-7 sm:p-9">
            <p className="text-sm font-medium text-[var(--color-signal-strong)]">Connected operations</p>
            <h3 className="mt-5 max-w-[15ch] text-3xl font-semibold tracking-[-0.035em]">One operating layer across the daily work</h3>
            <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Start where coordination costs the most time, then connect adjacent workflows without replacing the systems already in use.
            </p>
          </article>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
            {operationalAreas.map((area, index) => (
              <article
                key={area.slug}
                className={`bg-[var(--color-canvas-elevated)] p-6 ${index === operationalAreas.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <p className="text-xs text-[var(--color-text-muted)]">{area.question}</p>
                <h3 className="mt-3 text-lg font-semibold">{area.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{deEmDash(area.outcome)}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function IntegrationAndControl() {
  return (
    <section id="integrations" className="scroll-mt-24 bg-[var(--color-canvas-raised)] py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Keep the systems your team already uses.</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            WorkforceOS connects to selected scheduling, POS, inventory, task, and team communication systems. Compatibility is confirmed before a pilot is proposed.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["Scheduling", "POS and sales", "Inventory", "Tasks", "Team channels"].map((system) => (
              <div key={system} className="ticket-slip px-4 py-5 text-sm font-medium">
                {system}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[var(--color-text-muted)]">
            Vendor names are published only after compatibility and publication approval are confirmed.
          </p>
        </div>
        <div id="ai-control" className="scroll-mt-24 rounded-2xl bg-[var(--color-canvas-dark)] p-7 text-[var(--color-text-on-dark-primary)] sm:p-10">
          <p className="text-sm text-[var(--color-text-on-dark-muted)]">Authority, configured per workflow</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">You decide where AI stops.</h2>
          <div className="mt-10 space-y-8">
            {[
              ["Inform", "Summarize what needs attention without changing anything."],
              ["Recommend", "Prepare the action and wait for a manager's approval."],
              ["Execute", "Complete a pre-authorized routine action and record the result."],
            ].map(([title, detail], index) => (
              <div key={title} className="grid grid-cols-[32px_1fr] gap-4 border-t border-[var(--color-border-on-dark)] pt-5">
                <span className="font-mono text-xs text-[var(--color-signal-soft)]">0{index + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ticket-slip-dark mt-10 p-5 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            Managers can require approval for sensitive actions, override recommendations, and review the recorded outcome.
          </div>
        </div>
      </Container>
    </section>
  );
}

function Implementation() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Prove one workflow before changing more.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            The rollout begins with a practical coordination problem, not a company-wide software replacement.
          </p>
        </div>
        <ol className="mt-14 grid gap-0 overflow-hidden rounded-2xl border border-[var(--color-border)] lg:grid-cols-5">
          {implementationSteps.map(([title, detail], index) => (
            <li key={title} className="border-b border-[var(--color-border)] bg-[var(--color-canvas-elevated)] p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <span className="font-mono text-xs text-[var(--color-signal-strong)]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-base font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Audience() {
  return (
    <section id="audience" className="scroll-mt-24 bg-[var(--color-canvas-elevated)] py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="label-mono text-[var(--color-signal-strong)]">Built for shift-based operations</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Different operating models. The same coordination burden.</h2>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {audienceSegments.map((segment, index) => (
            <article key={segment.slug} className={`rounded-2xl p-7 ${index === 1 ? "bg-[var(--color-canvas-dark)] text-[var(--color-text-on-dark-primary)]" : "border border-[var(--color-border)] bg-[var(--color-canvas)]"}`}>
              <h3 className="text-2xl font-semibold tracking-tight">{segment.name}</h3>
              <p className={`mt-4 text-sm leading-relaxed ${index === 1 ? "text-[var(--color-text-on-dark-secondary)]" : "text-[var(--color-text-secondary)]"}`}>{deEmDash(segment.situation)}</p>
              <p className={`mt-8 text-xs font-medium ${index === 1 ? "text-[var(--color-signal-soft)]" : "text-[var(--color-signal-strong)]"}`}>A practical first workflow</p>
              <p className="mt-2 text-sm font-medium">{segment.workflow.slice(0, 3).join(" → ")}</p>
              <Link href="/demo" className={`mt-7 inline-flex min-h-11 items-center text-sm font-semibold ${index === 1 ? "text-[var(--color-text-on-dark-primary)]" : "text-[var(--color-text-primary)]"}`}>
                Discuss this operation <span aria-hidden className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Faq() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Questions buyers ask first.</h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">Clear answers before a sales conversation.</p>
        </div>
        <div className="space-y-3">
          {implementationControl.map((item) => (
            <details key={item.question} className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] px-5 py-1">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-semibold marker:hidden">
                {item.question}
                <span aria-hidden className="text-xl font-normal text-[var(--color-signal-strong)] group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">{deEmDash(item.answer)}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-canvas-raised)] py-20 sm:py-28">
      <Container>
        <div className="rounded-2xl bg-[var(--color-canvas-dark)] px-7 py-14 text-[var(--color-text-on-dark-primary)] sm:px-12 sm:py-16 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-[17ch] text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Bring us the workflow consuming your managers&apos; time.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-on-dark-secondary)]">
              We will map how it works today, confirm the relevant systems, and identify a practical starting point for a pilot.
            </p>
          </div>
          <div className="mt-9 lg:mt-0">
            <Button href="/demo" variant="light" size="lg" arrow>Request a tailored demo</Button>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[var(--color-text-on-dark-muted)]">A workflow review first. No generic sales presentation.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroWorkflowDemo } from "@/components/site/HeroWorkflowDemo";
import { CapabilityTabs } from "@/components/site/CapabilityTabs";
import { AuthorityTabs } from "@/components/site/AuthorityTabs";
import { TrackedCta } from "@/components/site/TrackedCta";
import {
  additionalConnectedSignals,
  audienceEnvironments,
  audienceIntro,
  audienceQualifier,
  authorityTrustPoints,
  coordinationStages,
  ctaCopy,
  implementationControl,
  implementationHonestyNote,
  implementationSteps,
  patchworkSources,
  pilotImpact,
  sectionIds,
} from "@/lib/site-config";

export function BusinessHomepage() {
  return (
    <>
      <Hero />
      <PilotProof />
      <CoordinationTransition />
      <Capabilities />
      <AuthorityControl />
      <Implementation />
      <Audience />
      <Faq />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section
      id={sectionIds.hero}
      className="relative overflow-hidden bg-[var(--color-canvas-dark)] pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--color-border-on-dark)]" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(520px,1.14fr)] lg:gap-14">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="label-mono animate-reveal-soft text-[var(--color-signal-soft)]">
            AI operations for hourly, shift-based teams
          </p>
          <h1 className="font-display text-balance mt-5 text-4xl font-semibold leading-[1.05] text-[var(--color-text-on-dark-primary)] sm:text-6xl lg:text-[4.15rem]">
            <span className="block overflow-hidden">
              <span className="animate-reveal-clip block" style={{ animationDelay: "80ms" }}>
                Run every shift
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="animate-reveal-clip block" style={{ animationDelay: "180ms" }}>
                without chasing every update.
              </span>
            </span>
          </h1>

          <p
            className="animate-reveal-soft mx-auto mt-6 max-w-[58ch] text-balance text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)] sm:text-xl lg:mx-0"
            style={{ animationDelay: "300ms" }}
          >
            WorkforceOS brings schedules, staff availability, tasks, messages, and operating signals into one
            place—then helps your managers resolve call-outs, coverage gaps, and unfinished work before they
            disrupt the day.
          </p>

          <div
            className="animate-reveal-soft mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            style={{ animationDelay: "420ms" }}
          >
            <TrackedCta location="hero">{ctaCopy.primary}</TrackedCta>
            <Button href={`#${sectionIds.heroWorkflow}`} variant="secondary" size="lg">
              {ctaCopy.secondary}
            </Button>
          </div>

          <p
            className="label-mono animate-reveal-soft mx-auto mt-8 max-w-lg text-[var(--color-text-on-dark-muted)] lg:mx-0"
            style={{ animationDelay: "520ms" }}
          >
            Connect existing tools · Set approval rules · Start with one workflow
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          <div aria-hidden className="absolute -inset-8 bg-[var(--color-signal)] opacity-[0.055] blur-3xl" />
          <HeroWorkflowDemo />
        </div>
      </Container>
    </section>
  );
}

function PilotProof() {
  return (
    <section id={sectionIds.pilots} className="scroll-mt-24 border-b border-[var(--color-border)] bg-[var(--color-canvas-raised)] py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Already working inside real shift-based operations.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
            WorkforceOS is being developed through active customer pilots spanning more than 1,000 frontline users.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10 grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-start lg:gap-14">
          <dl className="flex gap-10 border-t border-[var(--color-border)] pt-5 lg:flex-col lg:gap-6 lg:border-t-0 lg:pt-0">
            <div>
              <dt className="text-xs text-[var(--color-text-muted)]">Active customer pilots</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums text-[var(--color-text-primary)]">
                {pilotImpact.organizations}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--color-text-muted)]">Frontline users</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums text-[var(--color-text-primary)]">
                {pilotImpact.frontlineUsers}
              </dd>
            </div>
          </dl>

          <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
            {pilotImpact.customers.map((customer) => (
              <article key={customer.name} className="bg-[var(--color-canvas-elevated)] p-6 sm:p-7">
                <p className="text-lg font-semibold text-[var(--color-text-primary)]">{customer.name}</p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">{customer.context}</p>
                <p className="mt-4 text-base font-medium leading-relaxed text-[var(--color-text-primary)]">
                  {customer.result}
                </p>
                <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                  <p className="label-mono text-[var(--color-text-muted)]">{customer.noteLabel}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">{customer.note}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function CoordinationTransition() {
  return (
    <section id={sectionIds.problem} className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
            Your tools record the day. Your managers still have to run it.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            The schedule, messages, availability, and task list each contain part of the answer. Managers still
            spend their shifts connecting that information and deciding what happens next.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_auto_0.95fr] lg:items-stretch lg:gap-8">
          <div>
            <p className="label-mono text-[var(--color-text-muted)]">One open shift, four disconnected sources</p>
            <ol className="mt-5 grid grid-cols-2 gap-3">
              {patchworkSources.map((item) => (
                <li key={item.source} className="ticket-slip px-4 py-5">
                  <p className="ticket-number">{item.source}</p>
                  <p className="mt-2.5 text-sm font-medium leading-snug">{item.label}</p>
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden className="hidden items-center justify-center lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-elevated)] text-[var(--color-signal-strong)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="rounded-2xl bg-[var(--color-canvas-dark)] p-6 text-[var(--color-text-on-dark-primary)] sm:p-8">
            <p className="label-mono text-[var(--color-signal-soft)]">With WorkforceOS</p>
            <ol className="mt-5 space-y-4">
              {coordinationStages.map((stage, index) => (
                <li key={stage} className="flex items-center gap-3 border-t border-[var(--color-border-on-dark)] pt-4 first:border-t-0 first:pt-0">
                  <span className="label-mono flex-shrink-0 text-[var(--color-text-on-dark-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">{stage}</p>
                </li>
              ))}
            </ol>
            <p className="mt-7 border-t border-[var(--color-border-on-dark)] pt-5 text-base font-medium leading-relaxed text-[var(--color-text-on-dark-primary)]">
              WorkforceOS turns scattered updates into one coordinated next step.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Capabilities() {
  return (
    <section id={sectionIds.capabilities} className="scroll-mt-24 bg-[var(--color-canvas-elevated)] py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
            One operating layer for the work between your systems.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            Start with the workflow creating the most manager effort. WorkforceOS connects the relevant data,
            handles the coordination, and expands as your team becomes comfortable.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <CapabilityTabs />
        </Reveal>

        <Reveal delay={160} className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)] p-6 sm:p-7">
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{additionalConnectedSignals.intro}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {additionalConnectedSignals.signals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-[var(--color-border-strong)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]"
              >
                {signal}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function AuthorityControl() {
  return (
    <section id={sectionIds.authority} className="scroll-mt-24 bg-[var(--color-canvas-dark)] py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--color-text-on-dark-primary)] sm:text-5xl">
            Automate the routine. Keep consequential decisions with managers.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            Every workflow has its own authority rule. WorkforceOS can surface an issue, prepare a recommended
            response, or complete an approved routine action—and managers can review the history or override it.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <AuthorityTabs />
        </Reveal>

        <Reveal delay={160} className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--color-border-on-dark)] pt-6 sm:max-w-md">
          {authorityTrustPoints.map((point) => (
            <div key={point.label}>
              <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">{point.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-on-dark-muted)]">{point.detail}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function Implementation() {
  return (
    <section id={sectionIds.implementation} className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
            A practical path to your first workflow.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            The rollout begins with one recurring coordination problem, not a company-wide software replacement.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mt-12 grid gap-0 overflow-hidden rounded-2xl border border-[var(--color-border)] lg:grid-cols-4">
            {implementationSteps.map((step) => (
              <li
                key={step.number}
                className="border-b border-[var(--color-border)] bg-[var(--color-canvas-elevated)] p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="font-mono text-xs text-[var(--color-signal-strong)]">{step.number}</span>
                <h3 className="mt-8 text-base font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">{implementationHonestyNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Audience() {
  return (
    <section id={sectionIds.audience} className="scroll-mt-24 bg-[var(--color-canvas-raised)] py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="label-mono text-[var(--color-signal-strong)]">Who it&apos;s for</p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
            {audienceIntro}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audienceEnvironments.map((environment) => (
            <div
              key={environment.name}
              className={
                environment.kind === "pilot"
                  ? "rounded-xl border border-[var(--color-signal-strong)]/30 bg-[var(--color-canvas-elevated)] p-5"
                  : "rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] p-5"
              }
            >
              <p className="text-base font-medium text-[var(--color-text-primary)]">{environment.name}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                {environment.kind === "pilot" ? `Active pilot · ${environment.detail}` : "Target operating environment"}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">{audienceQualifier}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Faq() {
  return (
    <section id={sectionIds.faq} className="scroll-mt-24 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Questions buyers ask first.</h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
            Clear answers before a sales conversation.
          </p>
        </Reveal>
        <Reveal delay={80} className="space-y-3">
          {implementationControl.map((item) => (
            <details key={item.question} className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] px-5 py-1">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-semibold marker:hidden">
                {item.question}
                <span aria-hidden className="text-xl font-normal text-[var(--color-signal-strong)] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function FinalCta() {
  const outcomes = [
    "A walkthrough based on your actual workflow",
    "A clear manager-approval boundary",
    "The systems and information required",
    "A practical starting point for a pilot",
  ];

  return (
    <section id={sectionIds.finalCta} className="scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-canvas-raised)] py-20 sm:py-28">
      <Container>
        <Reveal className="rounded-2xl bg-[var(--color-canvas-dark)] px-7 py-14 text-[var(--color-text-on-dark-primary)] sm:px-12 sm:py-16 lg:grid lg:grid-cols-[1.1fr_auto] lg:items-start lg:gap-16">
          <div>
            <h2 className="font-display text-balance max-w-[19ch] text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">
              Show us the shift your managers have to rescue every week.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-on-dark-secondary)]">
              We&apos;ll map how the exception appears today, what information is needed to resolve it, and where
              WorkforceOS can remove coordination work.
            </p>
          </div>
          <div className="mt-9 lg:mt-0">
            <TrackedCta location="final_cta" variant="light">
              {ctaCopy.primary}
            </TrackedCta>
            <ul className="mt-6 space-y-2.5">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 text-xs leading-relaxed text-[var(--color-text-on-dark-muted)]">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-signal-soft)]" aria-hidden />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

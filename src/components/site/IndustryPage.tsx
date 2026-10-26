import Link from "next/link";
import { StrawProductDemo } from "@/components/site/StrawProductDemo";
import type { strawIndustries } from "@/lib/straw-content";
import "@/app/industries/industry.css";

type Industry = (typeof strawIndustries)[number];

export const industrySetupSteps = [
  {
    title: "Meet",
    description:
      "We talk through how your team schedules, communicates, and tracks work today.",
  },
  {
    title: "Set up your workspace",
    description:
      "We set up Straw's built-in tools, connect the systems you already use, or combine both.",
  },
  {
    title: "Configure rules",
    description:
      "You confirm the rules and context Straw should remember, and which actions need approval.",
  },
  {
    title: "Launch together",
    description:
      "Your team uses Straw in the app, iMessage, or WhatsApp, with access based on role. Custom features are scoped together.",
  },
] as const;

const proofNotes: Partial<Record<Industry["slug"], string>> = {
  campus:
    "This describes scheduling scale in campus recreation, not the number of active software users.",
};

function BookingLink({ children }: { children: string }) {
  return (
    <Link href="/demo" className="straw-industry__cta">
      {children}
    </Link>
  );
}

export function IndustryPage({
  industry,
  others,
}: {
  industry: Industry;
  others: Industry[];
}) {
  const proofNote = proofNotes[industry.slug];

  return (
    <div className="straw-industry">
      <section className="straw-industry__hero">
        <div className="straw-industry__container">
          <p className="straw-industry__eyebrow">{industry.name}</p>
          <h1>{industry.headline}</h1>
          <p className="straw-industry__lede">{industry.description}</p>
          <BookingLink>Book a personalized demo</BookingLink>
        </div>
      </section>

      <section className="straw-industry__section" aria-labelledby="workflows">
        <div className="straw-industry__container">
          <h2 id="workflows">Practical workflows</h2>
          <ul className="straw-industry__grid">
            {industry.workflows.map((workflow) => (
              <li key={workflow.title} className="straw-industry__panel">
                <h3>{workflow.title}</h3>
                <p>{workflow.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="straw-industry__section" aria-labelledby="explorer">
        <div className="straw-industry__container">
          <h2 id="explorer">See it work</h2>
          <p className="straw-industry__note">
            Names and numbers in this demo are illustrative samples.
          </p>
          <StrawProductDemo
            variant="explorer"
            initialWorkflow={industry.demoWorkflow}
          />
        </div>
      </section>

      <section className="straw-industry__section" aria-labelledby="proof">
        <div className="straw-industry__container">
          <figure className="straw-industry__proof">
            <h2 id="proof">{industry.proof.headline}</h2>
            <p>{industry.proof.description}</p>
            {proofNote ? <figcaption>{proofNote}</figcaption> : null}
          </figure>
        </div>
      </section>

      <section className="straw-industry__section" aria-labelledby="setup">
        <div className="straw-industry__container">
          <h2 id="setup">Setup is done for you</h2>
          <ol className="straw-industry__grid straw-industry__steps">
            {industrySetupSteps.map((step, index) => (
              <li key={step.title} className="straw-industry__panel">
                <span className="straw-industry__step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="straw-industry__section" aria-labelledby="others">
        <div className="straw-industry__container">
          <h2 id="others">Also built for</h2>
          <ul className="straw-industry__grid straw-industry__grid--two">
            {others.map((other) => (
              <li key={other.slug} className="straw-industry__panel">
                <h3>
                  <Link href={`/industries/${other.slug}`}>{other.name}</Link>
                </h3>
                <p>{other.headline}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="straw-industry__final">
        <div className="straw-industry__container">
          <h2>See Straw on your own workflows</h2>
          <BookingLink>Book a personalized demo</BookingLink>
        </div>
      </section>
    </div>
  );
}

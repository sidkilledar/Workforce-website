import "./straw-home.css";
import Link from "next/link";
import { strawIndustries } from "@/lib/straw-content";
import { ArtSlot } from "./HomeArt";
import { StrawCta } from "./StrawCta";
import { StrawHeroConversation } from "./StrawHeroConversation";

const annotations = [
  { id: "staffing", title: "Staffing", body: "Schedules and coverage." },
  { id: "inventory", title: "Inventory", body: "Stock levels and replenishment." },
  { id: "forecasting", title: "Forecasting", body: "Upcoming demand and staffing needs." },
  {
    id: "tasks",
    title: "Tasks & communication",
    body: "Owners, progress, updates, and follow-up.",
  },
];

const capabilities = [
  ["Staffing", "Build schedules and coordinate coverage when plans change."],
  ["Communication", "Reach the right people and follow up until it is settled."],
  ["Inventory", "Understand stock and coordinate replenishment."],
  ["Forecasting", "Anticipate demand and the staffing it calls for."],
  ["Tasks", "Know who owns the work and what remains."],
];

const adoption = [
  {
    title: "Start fresh",
    body: "Begin in a Straw workspace, with built-in tools for the work you coordinate today.",
    examples: ["Schedules", "Stock counts", "Tasks", "Team messages"],
  },
  {
    title: "Keep your systems",
    body: "Connect the software you already use. Straw works alongside it and keeps the context.",
    examples: ["Scheduling software", "Inventory sheets", "Messaging tools", "Team records"],
  },
  {
    title: "Mix and match",
    body: "Use Straw's tools for some work and your own software for the rest, with records working together.",
    examples: ["Straw schedules", "Your stock sheets", "Shared tasks", "One conversation"],
  },
];

const handbook = [
  { label: "Staffing rule", value: "Two supervisors on Fridays" },
  { label: "Access", value: "Manager permissions" },
  { label: "Instruction status", value: "Confirmed and saved", confirmed: true },
];

const memoryPoints = [
  "New ongoing instructions are confirmed before Straw saves them.",
  "Access follows organizational roles.",
  "Actions can require approval, or run automatically where you configure it.",
];

const useCases: Record<string, string> = {
  restaurants: "Keep the floor staffed, stocked, and on task.",
  catering: "Staff every event, even when headcounts change.",
  campus: "Schedule student teams around real lives.",
};

const evidence: Record<string, string> = {
  restaurants: "Restaurant managers report more time on the floor.",
  catering: "A catering team reports 10–15 operations hours saved weekly.",
  campus: "Campus recreation schedules hundreds of employees.",
};

const steps = [
  ["Meet", "We learn how your team schedules, communicates, and tracks work."],
  ["Set up your workspace", "We set up built-in tools and connect any systems you want to keep."],
  ["Configure rules", "You confirm the rules, roles, and approvals Straw should follow."],
  ["Launch together", "We walk your managers through it and roll out at your pace."],
];

const faqs = [
  [
    "What does Straw do?",
    "Straw is an AI assistant manager. It helps schedule your team, track inventory, anticipate demand, and follow up on tasks, and it remembers how your organization works.",
  ],
  [
    "What if we have no existing software?",
    "You can start with Straw's built-in tools. We set up your workspace with you.",
  ],
  [
    "Can we keep our current systems?",
    "Yes. You can connect systems you already use, or combine them with Straw's tools. We assess compatibility and any custom requirements during setup.",
  ],
  [
    "Can we use everything through text?",
    "Everything you can do in the app can also be done through iMessage or WhatsApp.",
  ],
  [
    "Who controls access and approvals?",
    "You do. Access follows organizational roles, and actions can require approval or run automatically when configured.",
  ],
  [
    "Who handles setup?",
    "We do. Setup is done for you, and any custom features are scoped together before work begins.",
  ],
];

function Hero() {
  return (
    <section className="straw-home__hero" id="hero">
      <div className="straw-home__container straw-home__hero-copy">
        <h1>
          Your AI assistant manager.
          <span>For the whole operation.</span>
        </h1>
        <p className="straw-home__lead">
          Straw helps schedule your team, track inventory, anticipate demand,
          and follow up on work. Use our built-in tools, connect yours, or
          combine both—all accessible in the app or through text.
        </p>
        <div className="straw-home__actions">
          <StrawCta location="hero">Book a personalized demo</StrawCta>
          <a href="#conversation" className="straw-home__link">
            See Straw in action
          </a>
        </div>
        <p className="straw-home__audience">
          For restaurants &amp; cafés · catering &amp; events · campus departments
          &amp; recreation
        </p>
      </div>
    </section>
  );
}

function Conversation() {
  return (
    <section className="straw-home__conversation" id="conversation">
      <div className="straw-home__container">
        <StrawHeroConversation />
      </div>
    </section>
  );
}

function Operation() {
  return (
    <section className="straw-home__section" id="product">
      <div className="straw-home__container">
        <h2 className="straw-home__title">
          More than scheduling. The work around it, too.
        </h2>
        <div className="straw-home__scene">
          <ArtSlot name="operationWide" className="straw-home__scene-wide" />
          <ArtSlot name="operationMobile" className="straw-home__scene-mobile" />
          <ul className="straw-home__annotations">
            {annotations.map((a) => (
              <li key={a.id} className={`straw-home__annotation straw-home__annotation--${a.id}`}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <ul className="straw-home__capabilities">
          {capabilities.map(([title, body]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Adoption() {
  return (
    <section className="straw-home__section straw-home__tint" id="connected">
      <div className="straw-home__container">
        <h2 className="straw-home__title">
          Start with Straw. Bring your tools. Or both.
        </h2>
        <ArtSlot name="adoption" className="straw-home__wide-art" />
        <ol className="straw-home__adoption">
          {adoption.map((a) => (
            <li key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              <ul className="straw-home__examples" aria-label={`${a.title}: examples`}>
                {a.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="straw-home__small">
          Software categories are generic examples. Connection compatibility and
          custom requirements are assessed during setup.
        </p>
      </div>
    </section>
  );
}

function Memory() {
  return (
    <section className="straw-home__section" id="memory">
      <div className="straw-home__container straw-home__memory">
        <div className="straw-home__memory-copy">
          <h2 className="straw-home__title">It knows how your operation works.</h2>
          <ul className="straw-home__points">
            {memoryPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="straw-home__handbook">
          <ArtSlot name="handbook" />
          <dl className="straw-home__records" aria-label="Example records, sample data">
            {handbook.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>
                  {r.confirmed ? <span aria-hidden>✓ </span> : null}
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="straw-home__section straw-home__tint" id="industries">
      <div className="straw-home__container">
        <h2 className="straw-home__title">
          Different teams. The same daily coordination.
        </h2>
        <ul className="straw-home__industries">
          {strawIndustries.map((i) => (
            <li key={i.slug}>
              <Link href={`/industries/${i.slug}`} className="straw-home__industry">
                <ArtSlot name={i.slug} />
                <h3>{i.name}</h3>
                <p>{useCases[i.slug]}</p>
                <p className="straw-home__evidence">{evidence[i.slug]}</p>
                <span className="straw-home__link">
                  See how it works <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="straw-home__small">
          Results are customer-reported and specific to each operation.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="straw-home__section" id="how-it-works">
      <div className="straw-home__container">
        <h2 className="straw-home__title">We set it up with you.</h2>
        <ol className="straw-home__steps">
          {steps.map(([title, body], i) => (
            <li key={title}>
              <span className="straw-home__step-number" aria-hidden>
                {i + 1}
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <p className="straw-home__small">
          Setup is done for you. Connections are optional, and custom features
          are agreed before work begins.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="straw-home__section straw-home__tint" id="faq">
      <div className="straw-home__container straw-home__faq">
        <h2 className="straw-home__title">Questions</h2>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="straw-home__final">
      <div className="straw-home__container">
        <h2>Give your managers more time for people.</h2>
        <StrawCta location="final" variant="light">
          Book a personalized demo
        </StrawCta>
      </div>
    </section>
  );
}

export function BusinessHomepage() {
  return (
    <div className="straw-home">
      <Hero />
      <Conversation />
      <Operation />
      <Adoption />
      <Memory />
      <Industries />
      <HowItWorks />
      <Faq />
      <FinalCta />
    </div>
  );
}

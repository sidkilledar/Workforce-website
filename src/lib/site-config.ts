const DEFAULT_SITE_URL = "https://www.workforceos.com";

// Validates that the env var is actually a well-formed absolute URL rather
// than just checking truthiness — a blank, whitespace-only, or otherwise
// malformed value (any of which Vercel project settings can produce) falls
// back to the default instead of reaching `new URL(path, siteConfig.url)`
// downstream and crashing static generation with ERR_INVALID_URL.
function resolveSiteUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!candidate) return DEFAULT_SITE_URL;
  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "WorkforceOS",
  tagline: "One place to see, understand, and run the whole operation.",
  description:
    "WorkforceOS is an operational intelligence platform for restaurants. It connects the POS, scheduling, payroll, inventory, and communication systems you already use and turns them into one configurable manager dashboard — built around scheduling and team communication, backed by labor forecasting and inventory — so managers can see what's happening, predict what's next, and coordinate the response from one place.",
  url: resolveSiteUrl(),
  ogImage: "/opengraph-image",
  email: "hello@workforceos.com",
} as const;

// Named, factual pilot mentions — not testimonials. No quotes or logos are
// attached to these until Olive & Vine and UC Davis Rec Sports approve
// something for publication. Named plainly, and only inside the pilot proof
// section — the announcement bar and hero reference the aggregate figures
// instead, per the messaging acceptance rule that names/results appear in
// exactly one homepage section.
export const pilotCustomers = ["Olive & Vine", "Mylapore", "UC Davis Rec Sports"] as const;

export type PilotCustomer = {
  name: string;
  context: string;
  result: string;
  noteLabel: string;
  note: string;
};

// NOTE: only the aggregate fields (`organizations`, `frontlineUsers`) are ever
// rendered — /demo consumes `pilotImpact.frontlineUsers` and nothing else.
// `customers` below duplicates the pilot names, per-customer results, and the
// "10–15 hours" figure that live in `proofSection.cards`, which is the ONLY
// homepage section allowed to surface them. Keep the two lists in sync, and do
// NOT render `pilotImpact.customers` anywhere — doing so breaks the
// single-section pilot-fact guardrail. The `customers` array is retained only
// because the site-config test asserts the names + a non-empty result here.
export const pilotImpact = {
  organizations: 3,
  frontlineUsers: "1,000+",
  customers: [
    {
      name: "Olive & Vine",
      context: "Catering and event operations",
      result: "Saves the operations team 10–15 hours every week",
      noteLabel: "Supported workflow",
      note: "Scheduling, staffing, and daily coordination",
    },
    {
      name: "Mylapore",
      context: "12-location restaurant group",
      // TODO(pilot): replace with the confirmed weekly hours figure, phrased
      // like Olive & Vine's ("Saves ... 10–15 hours every week").
      result: "Reports hours saved on scheduling and coverage each week, across all 12 locations",
      noteLabel: "Supported workflow",
      note: "Scheduling, coverage, WhatsApp shift updates, and labor forecasting",
    },
    {
      name: "UC Davis Rec Sports",
      context: "Student-powered campus operations",
      result: "Reports easier scheduling, communication, and emergency coverage",
      noteLabel: "How it learns",
      note: "WorkforceOS learns how their recurring events are staffed from shift history",
    },
  ] satisfies PilotCustomer[],
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const sectionIds = {
  announcement: "announcement",
  hero: "hero",
  heroWorkflow: "hero-workflow",
  pilots: "pilots",
  connected: "connected",
  problem: "problem",
  capabilities: "capabilities",
  intelligence: "intelligence",
  howItWorks: "how-it-works",
  authority: "ai-control",
  implementation: "implementation",
  proof: "proof",
  faq: "faq",
  finalCta: "final-cta",
  /** @deprecated Green-layout renames this section to `proof`. Retained only
   *  so the pre-redesign BusinessHomepage keeps compiling until its section
   *  rebuild lands; do not use in new work. */
  audience: "audience",
} as const;

// Anchors into the landing page's sections. Section ids match sectionIds
// above. Used from any route as `/#id` (Header prefixes the leading `/` when
// not already on the homepage) so the same links work from `/demo` too.
// Kept intentionally short — three questions a visitor actually has, not an
// exhaustive site map.
export const navAnchors: NavLink[] = [
  { label: "Platform", href: `#${sectionIds.capabilities}` },
  { label: "How it works", href: `#${sectionIds.howItWorks}` },
  { label: "AI control", href: `#${sectionIds.authority}` },
];

export const ctaCopy = {
  primary: "Request a Demo",
  secondary: "See it resolve a call-out",
} as const;

export const ctaNav: NavLink = { label: ctaCopy.primary, href: "/demo" };

// Deliberately narrow: the footer keeps only what's live — legal pages and
// the one conversion path — per the brief's instruction not to expose
// unfinished routes.
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "How it works", href: `/#${sectionIds.howItWorks}` },
      { label: "Capabilities", href: `/#${sectionIds.capabilities}` },
      { label: "AI control", href: `/#${sectionIds.authority}` },
      { label: "Pilot results", href: `/#${sectionIds.proof}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export type Announcement = {
  message: string;
  href: string;
};

// Optional narrow utility banner. Set to null to remove it without touching
// header layout. Outcome-led rather than a repeat of the pilot names — it
// links into the pilot proof section so the claim supports credibility there
// instead of behaving like a second sales CTA competing with "Book a Demo".
export const announcement: Announcement | null = {
  message: "Now running in active restaurant pilots — see the results.",
  href: `#${sectionIds.proof}`,
};

// LinkedIn presence isn't live yet — the footer renders this as a visible,
// non-navigating placeholder rather than a real (unverified) URL.
export const socialLinks = {
  linkedinPlaceholder: false,
} as const;

export type AuthorityMode = "inform" | "recommend" | "execute";

// ---------------------------------------------------------------------------
// Hero workflow — one concrete "Act" sequence the site demonstrates as a
// dispatch timeline: call-out → availability checked → eligible replacement
// identified → manager approval → resolved. It's the exceptions example that
// runs inside HowItWorks; the broader platform (forecasting, inventory,
// cross-system connection) is described in its own sections.
// ---------------------------------------------------------------------------

export type DispatchStepId = "callout" | "availability" | "replacement" | "approval" | "resolved";

export type DispatchStep = {
  id: DispatchStepId;
  time: string;
  label: string;
  detail: string;
};

export type DispatchCandidateStatus = "available" | "tentative" | "unavailable";

export type DispatchCandidate = {
  name: string;
  status: DispatchCandidateStatus;
  note: string;
};

export type HeroWorkflow = {
  eventLabel: string;
  disclosure: string;
  steps: DispatchStep[];
  /** Ordered so the eligible match (Jordan) lands last — the "active signal"
   *  visibly moves onto their row rather than starting there. */
  candidates: DispatchCandidate[];
  recommendation: string;
  reason: string;
  approveLabel: string;
  reviewLabel: string;
  resolvedResult: string;
  resolvedDetails: string[];
};

export const heroWorkflow: HeroWorkflow = {
  eventLabel: "Thursday dinner shift",
  disclosure: "Illustrative workflow based on current WorkforceOS capabilities",
  steps: [
    { id: "callout", time: "3:42 PM", label: "Call-out received", detail: "Closer called out for tonight's closing shift." },
    {
      id: "availability",
      time: "3:42 PM",
      label: "Availability checked",
      detail: "Checking submitted availability for eligible replacements.",
    },
    {
      id: "replacement",
      time: "3:43 PM",
      label: "Jordan identified",
      detail: "Jordan is available and eligible for the 5–9 PM closing shift.",
    },
    {
      id: "approval",
      time: "3:43 PM",
      label: "Manager approval required",
      detail: "Coverage request routed to the configured approval rule.",
    },
    { id: "resolved", time: "3:44 PM", label: "Shift updated and team notified", detail: "Schedule updated. Team notified." },
  ],
  candidates: [
    { name: "Alex", status: "tentative", note: "Tentative — pending confirmation." },
    { name: "Sam", status: "unavailable", note: "Unavailable — already scheduled tonight." },
    { name: "Jordan", status: "available", note: "Available for the 5–9 PM closing shift." },
  ],
  recommendation: "Jordan is available and eligible for the 5–9 PM closing shift.",
  reason: "Based on submitted availability and the approval rule configured for this shift type.",
  approveLabel: "Approve coverage",
  reviewLabel: "Review options",
  resolvedResult: "Shift filled",
  resolvedDetails: ["Schedule updated", "Team notified"],
};

// ---------------------------------------------------------------------------
// Patchwork problem — reduced to the four sources a manager reconciles by
// hand for one open shift, replacing the earlier six-source version that
// repeated the hero's full system list.
// ---------------------------------------------------------------------------

export type PatchworkSource = {
  source: string;
  label: string;
};

export const patchworkSources: PatchworkSource[] = [
  { source: "SCHEDULING", label: "Built in its own app" },
  { source: "POS & SALES", label: "Locked in another dashboard" },
  { source: "INVENTORY", label: "Tracked in a spreadsheet" },
  { source: "MESSAGES", label: "Scattered across texts and chat" },
];

export const coordinationStages = ["See the exception", "Prepare the response", "Update the team"] as const;

// ---------------------------------------------------------------------------
// Confirmed capabilities — the six operating areas WorkforceOS handles from
// one manager dashboard. Array order is the source of truth (and the test's
// asserted order); the Features grid renders them in `featureSection.
// displayOrder`. Cross-system connection is described in `connectedSystems`.
// ---------------------------------------------------------------------------

export type CapabilitySlug =
  | "scheduling"
  | "exceptions"
  | "communication"
  | "forecasting"
  | "inventory"
  | "workflows";

/** Icon key for the green-layout Feature card — one inline SVG per value. */
export type CapabilityIcon = CapabilitySlug;

export type ConfirmedCapability = {
  slug: CapabilitySlug;
  tabLabel: string;
  description: string;
  example?: string;
  qualifier?: string;
  /** Green-layout Feature-card fields (FeatureGrid). Additive — the tested
   *  `description`/`example`/`qualifier` stay the enforced-compliant source. */
  eyebrow: string;
  cardTitle: string;
  cardBody: string;
  bullets: [string, string, string];
  icon: CapabilityIcon;
};

export const confirmedCapabilities: ConfirmedCapability[] = [
  {
    slug: "scheduling",
    tabLabel: "Scheduling & staffing",
    description:
      "Build and fill shifts around submitted availability, roles, and qualifications, with one view of open roles, coverage, and assignments.",
    eyebrow: "Scheduling & staffing",
    cardTitle: "Build and fill shifts around real availability",
    cardBody:
      "Schedules are built from the availability, roles, and qualifications your team actually has, in one view that shows open roles, coverage, and every assignment.",
    bullets: [
      "One place to see open roles, who's assigned, and who's still available",
      "Respects availability, qualifications, and the staffing rules you set",
      "Built for rosters that turn over every term or season",
    ],
    icon: "scheduling",
  },
  {
    slug: "exceptions",
    tabLabel: "Day-to-day exceptions",
    description:
      "Call-outs, no-shows, and headcount changes resolve through backfill, reassignment, notification, or an approval request.",
    eyebrow: "Call-outs & exceptions",
    cardTitle: "Absorb the daily chaos",
    cardBody:
      "When someone calls out, a shift goes uncovered, or headcount changes, WorkforceOS checks who's eligible, prepares the coverage move, and routes it to your approver — the schedule updates and the right people are notified.",
    bullets: [
      "Backfill, reassignment, or a notification — whichever the situation calls for",
      "Nothing changes until it clears the approval rule you set",
      "If no one can cover it, it tells the manager — it doesn't hide the gap",
    ],
    icon: "exceptions",
  },
  {
    slug: "communication",
    tabLabel: "Employee communication",
    description:
      "Messages and notifications attach to the schedule event, task, or shift they relate to, so the team sees updates in context.",
    eyebrow: "Employee communication",
    cardTitle: "Keep communication in context",
    cardBody:
      "Messages and notifications attach to the shift, task, or event they're about. When a schedule changes or an issue comes up, the right people hear about it — without a separate chat app.",
    bullets: [
      "Every update sits on the shift or task it affects",
      "Targeted notifications — no all-staff blast",
      "Managers get follow-ups, not a scroll of group chat",
    ],
    icon: "communication",
  },
  {
    slug: "forecasting",
    tabLabel: "Labor forecasting",
    description:
      "Projects labor demand per shift and role from sales history, staffing patterns, and the calendar, and flags likely staffing gaps.",
    eyebrow: "Labor forecasting",
    cardTitle: "Know the labor you'll need before the shift",
    cardBody:
      "WorkforceOS reads your sales history, staffing patterns, and the calendar to project the labor each shift and role will need — so managers staff to demand instead of to last week's guess.",
    bullets: [
      "Labor demand projected per shift and per role",
      "Flags likely staffing gaps before they happen",
      "Learns your operation's own patterns, not a generic model",
    ],
    icon: "forecasting",
  },
  {
    slug: "inventory",
    tabLabel: "Inventory tracking",
    description:
      "Tracks stock levels across locations, raises low-stock and reorder alerts, and reads inventory against projected demand.",
    eyebrow: "Inventory tracking",
    cardTitle: "Track stock against what you expect to sell",
    cardBody:
      "See what's on hand, what's running low, and how inventory lines up with projected demand — with alerts before a shortage reaches service.",
    bullets: [
      "Stock levels across locations in one view",
      "Low-stock and reorder alerts",
      "Inventory read against expected demand, not just a count",
    ],
    icon: "inventory",
  },
  {
    slug: "workflows",
    tabLabel: "Operational workflows",
    description:
      "Configurable sequences — coverage, opening/closing, approvals, escalations, event staffing — that run to the authority boundary you set.",
    eyebrow: "Operational workflows",
    cardTitle: "Automate the routines your operation runs on",
    cardBody:
      "Build the sequences your business actually follows — call-out coverage, opening and closing checks, approvals, escalations, event staffing — and let WorkforceOS run them to the boundary you set.",
    bullets: [
      "Configurable steps, approvals, and escalations",
      "Different rules per role, location, or shift type",
      "Recommend, approve, or automatic — your choice per step",
    ],
    icon: "workflows",
  },
];

export const connectedSystems = {
  label: "Works with the tools you already run",
  intro:
    "WorkforceOS reads from your existing stack — no rip-and-replace. How each system connects depends on what it exposes:",
  tiers: [
    { label: "Direct connections", detail: "Scheduling, POS, and communication tools with a supported API." },
    { label: "Imports", detail: "Payroll, HR, and inventory data brought in by scheduled file or export." },
    { label: "Scoped in a pilot", detail: "Custom and internal systems we assess and connect during onboarding." },
  ],
  systems: ["POS & sales", "Scheduling & time", "Payroll & HR", "Inventory", "Communication", "Custom & internal tools"],
  note: "We publish a system as supported once a pilot is running on that connection — not before.",
} as const;

// ---------------------------------------------------------------------------
// Intelligence layer — the "does more than display data" differentiator:
// Connect → Understand → Predict → Act.
// ---------------------------------------------------------------------------

export const intelligenceLayer = {
  headingLight: "It doesn't just show you data.",
  headingBold: "It helps you run the operation.",
  intro:
    "WorkforceOS reads the operational picture across your systems and turns it into what a manager actually needs: what's happening now, what's coming next, what needs attention, and what to do about it.",
  steps: [
    {
      key: "connect",
      title: "Connect",
      body: "Pull the signals that matter from the POS, scheduling, payroll, inventory, and communication tools you already run.",
    },
    {
      key: "understand",
      title: "Understand",
      body: "See the whole operation in one place — labor, sales, coverage, inventory, tasks, and exceptions, side by side.",
    },
    {
      key: "predict",
      title: "Predict",
      body: "Project labor demand, spot likely staffing gaps and stock shortages, and surface risks before the shift starts.",
    },
    {
      key: "act",
      title: "Act",
      body: "Coordinate the response through configurable workflows — WorkforceOS recommends, waits for approval, or runs it, however you set it.",
    },
  ],
  examples: [
    "Demand is trending above plan → WorkforceOS flags a likely staffing gap for dinner service.",
    "Stock is moving faster than expected → it surfaces the shortage risk against projected sales.",
    "An employee calls out → it finds eligible coverage and starts the workflow you configured.",
  ],
} as const;

// ---------------------------------------------------------------------------
// Configurability — one platform shaped to each operation's own roles, rules,
// and language.
// ---------------------------------------------------------------------------

export const configurability = {
  headingLight: "Configured around how",
  headingBold: "your operation already works.",
  intro:
    "Every operation has its own roles, rules, and language. WorkforceOS is shaped to yours — one platform, not a separate build for every location.",
  items: [
    { label: "Roles & permissions", detail: "Who sees what, and who can approve what." },
    { label: "Staffing rules", detail: "Qualifications, overtime limits, availability, seniority." },
    { label: "Approval chains", detail: "What needs a sign-off, and whose." },
    { label: "Terminology", detail: "Your names for shifts, roles, locations, and teams." },
    { label: "Dashboards", detail: "The metrics each manager and location actually needs." },
    { label: "Workflows", detail: "The sequences and escalations your business follows." },
  ],
} as const;

// ---------------------------------------------------------------------------
// Authority modes — one consistent example across all three, so the
// difference between modes is immediately comparable rather than requiring
// three unrelated scenarios to be mentally reconciled.
// ---------------------------------------------------------------------------

export type AuthorityModeConfig = {
  key: AuthorityMode;
  title: string;
  description: string;
  example: string;
};

export const authorityModes: AuthorityModeConfig[] = [
  {
    key: "inform",
    title: "Inform",
    description: "WorkforceOS surfaces an issue. Nothing changes without a manager acting on it.",
    example: "A closing shift is uncovered.",
  },
  {
    key: "recommend",
    title: "Recommend",
    description: "WorkforceOS prepares a response and waits for approval before anything happens.",
    example: "Jordan is available and eligible to cover it.",
  },
  {
    key: "execute",
    title: "Execute",
    description: "WorkforceOS completes an approved, routine action and records the result.",
    example: "Once approved, update the schedule and notify the team.",
  },
];

export const authorityTrustPoints = [
  { label: "Rules", detail: "Configured per workflow" },
  { label: "Oversight", detail: "Manager override" },
  { label: "History", detail: "Every action recorded" },
] as const;

// ---------------------------------------------------------------------------
// Implementation — four steps, replacing the earlier five-step list, plus an
// honesty note so scope/timing claims stay bounded to "confirmed after
// review" rather than a promised duration.
// ---------------------------------------------------------------------------

export type ImplementationStep = {
  number: string;
  title: string;
  description: string;
};

export const implementationSteps: ImplementationStep[] = [
  {
    number: "01",
    title: "Pick one workflow",
    description: "The recurring scheduling, coverage, or communication problem taking the most manager time.",
  },
  {
    number: "02",
    title: "Connect the information it needs",
    description: "Where your schedules, availability, and team updates live today.",
  },
  {
    number: "03",
    title: "Set the manager boundary",
    description: "Which actions WorkforceOS can complete, and which wait for a person.",
  },
  {
    number: "04",
    title: "Pilot, measure, expand",
    description:
      "Start with one team or location, measure manager time and completed handoffs, then add the next workflow.",
  },
];

export const implementationHonestyNote =
  "Integration scope and pilot timing are confirmed after we look at the systems you already run — not promised on a slide.";

// ---------------------------------------------------------------------------
// Audience environments — one horizontal industry strip. Pilot-backed
// examples for the first two; the rest are labeled as target operating
// environments, not existing customers.
// ---------------------------------------------------------------------------

export type AudienceEnvironment = {
  name: string;
  kind: "pilot" | "target";
  detail?: string;
};

export const audienceEnvironments: AudienceEnvironment[] = [
  { name: "Restaurants and catering", kind: "pilot", detail: "Olive & Vine" },
  { name: "Multi-location restaurant groups", kind: "pilot", detail: "Mylapore" },
  { name: "Campus and recreation operations", kind: "pilot", detail: "UC Davis Rec Sports" },
  { name: "Hospitality", kind: "target" },
  { name: "Retail", kind: "target" },
  { name: "Events and venues", kind: "target" },
  { name: "Other multi-location hourly teams", kind: "target" },
];

export const audienceIntro = "Built for operations where people work hourly, schedules change, and communication affects execution.";

export const audienceQualifier =
  "Best suited to teams with recurring shifts, changing availability, and managers coordinating work across multiple tools.";

// ---------------------------------------------------------------------------
// Implementation and control (FAQ) — trimmed to the questions not already
// answered by the dedicated AI Control and Implementation sections, so no
// major claim repeats a third time on the page.
// ---------------------------------------------------------------------------

export type ImplementationTopic = {
  question: string;
  answer: string;
};

export const implementationControl: ImplementationTopic[] = [
  {
    question: "We already have a scheduling app and a group chat — why is this different?",
    answer:
      "WorkforceOS replaces that split: the schedule, the availability, and the shift messages live in one place, and it actively resolves call-outs instead of just recording them. It's configured around the tools you already use, not a rip-and-replace.",
  },
  {
    question: "What happens when no one is available to cover a shift?",
    answer:
      "It tells the manager that no eligible replacement was found rather than leaving the shift silently uncovered. The decision on what to do next stays with a person.",
  },
  {
    question: "Does this take decisions away from our managers?",
    answer:
      "No. For every workflow you choose whether WorkforceOS only surfaces an issue, prepares a response for approval, or completes a routine action you've pre-approved — and a manager can override any of it. Every action is recorded.",
  },
  {
    question: "Which systems does this actually connect to?",
    answer:
      "Scheduling, POS, and communication tools with a supported API connect directly. Payroll, HR, and inventory data come in by scheduled file or export. Custom and internal systems are assessed and connected during onboarding. We publish a system as supported once a pilot is running on that connection — not before.",
  },
  {
    question: "What does this cost?",
    answer:
      "We haven't published a price list — cost is scoped with each pilot based on your locations and the workflow you start with. You'll hear a real number during the demo, before anything is signed.",
  },
  {
    question: "Is our data safe, and who can see it?",
    answer:
      "Your operational data is used only to run your workflows — it isn't shared with other customers or sold. Access inside our team is limited to the people working on your account. We're early enough that we haven't completed a formal third-party security review yet, and we'll say so plainly if that comes up during a pilot conversation.",
  },
  {
    question: "What happens if something breaks after we're live?",
    answer:
      "You reach the same people who built your pilot, not a ticket queue. At this stage that's a direct line, not a tiered support system — which also means we hear about problems fast.",
  },
];

export const locationBands = ["1 location", "2–5 locations", "6–20 locations", "20+ locations"] as const;

export const hourlyEmployeeBands = ["Fewer than 25", "25–100", "101–500", "500+"] as const;

// The recurring workflow a demo requester is trying to solve — mirrors the
// language a manager would actually use, not the product's internal names.
export const frictionWorkflows = [
  { value: "scheduling", label: "Building or filling schedules" },
  { value: "call-outs", label: "Call-outs and emergency coverage" },
  { value: "availability", label: "Staff availability" },
  { value: "shift-changes", label: "Shift changes and approvals" },
  { value: "communication", label: "Team communication" },
  { value: "tasks", label: "Unfinished tasks or handoffs" },
  { value: "other", label: "Another recurring workflow" },
] as const;

export const demoIndustries = [
  { value: "catering", label: "Catering and event staffing" },
  { value: "restaurant-groups", label: "Restaurant group" },
  { value: "campus-sports", label: "Campus sports and recreation" },
  { value: "other", label: "Another shift-based team" },
] as const;

export type CustomerProofItem = {
  name: string;
  logoSrc: string;
  quote?: string;
  attribution?: string;
  /** Optional approved result (e.g. "Cut coverage gaps in half"). Never fabricated. */
  metric?: string;
};

// Empty until customer names, logos, testimonials, and written publication
// approval are supplied. Every component gated on this renders nothing (not
// empty placeholder cards) while it stays empty.
export const customerProof: CustomerProofItem[] = [];

// ===========================================================================
// GREEN-LAYOUT SECTION CONTENT
// ---------------------------------------------------------------------------
// One export per homepage section of the green Figma redesign. Copy is
// verbatim from the redesign brief (already guardrail-checked). Two-weight
// headings are split into `headingLight` / `headingBold`; consumers render
// them in the order the section calls for (noted per export).
// Pilot NAMES + per-customer RESULTS + the "10–15 hours" figure appear ONLY
// in `proofSection`; every other section uses the aggregate.
// ===========================================================================

export type HeroStat = { value: string; label: string };

/** Section 1 — Hero (sage band). Headline renders light line then bold line. */
export const heroContent = {
  eyebrow: "Operational intelligence for restaurants",
  headlineLight: "See what needs attention.",
  headlineBold: "Coordinate what happens next.",
  subhead:
    "WorkforceOS puts restaurant scheduling and team communication first, with labor forecasting and inventory built in — so managers can spot staffing gaps and coordinate the response, with control over every action.",
  primaryCta: "Request a Demo",
  secondaryCta: "See how it works",
  microline: "Connects your existing tools · Configurable to your rules · You set what AI can do",
  stats: [
    { value: "1,000+", label: "Frontline users on active pilots" },
    { value: "3", label: "Active pilots" },
    { value: "6", label: "Operating areas in one view" },
    { value: "1", label: "Operating layer across your apps" },
  ] satisfies HeroStat[],
} as const;

export type HeroDashboardMetric = {
  label: string;
  value: string;
  delta: string;
  /** Render the delta in sage rather than muted ink. */
  deltaAccent?: boolean;
};

export type HeroDashboardExceptionTone = "sage" | "neutral" | "amber";

export type HeroDashboardException = {
  id: string;
  label: string;
  status: string;
  tone: HeroDashboardExceptionTone;
};

/** Section 1 — data for <BrowserMock/> (Hero right column). Shift-ops data,
 *  no banned terms. Structure/spacing/type come from the Figma spec. */
export const heroDashboard = {
  url: "app.workforceos.com",
  sectionLabel: "Today — overview",
  metrics: [
    { label: "Sales today", value: "$18,420", delta: "+12% vs plan", deltaAccent: true },
    { label: "Labor", value: "26.4%", delta: "On target" },
    { label: "Coverage", value: "98%", delta: "2 roles open" },
  ] satisfies HeroDashboardMetric[],
  chart: {
    title: "Labor vs. demand",
    days: ["M", "T", "W", "T", "F", "S", "S"],
    /** Bar heights (0–100). Index 5 (Sat) is the sage accent bar. */
    values: [68, 74, 70, 88, 82, 96, 60],
    accentIndex: 5,
  },
  exceptions: {
    title: "Needs attention",
    viewAllLabel: "View all →",
    rows: [
      { id: "FORECAST", label: "Dinner rush projected +18%", status: "Add 2", tone: "amber" },
      { id: "INVENTORY", label: "Chicken — low vs. tonight", status: "Reorder", tone: "amber" },
      { id: "SHIFT-1183", label: "Close — bar uncovered", status: "Covered", tone: "sage" },
    ] satisfies HeroDashboardException[],
  },
  /** Icon rail, top to bottom; index 0 is active (sage rounded square). */
  iconRail: ["grid", "menu", "bar-chart", "layout-grid", "clock"],
  ariaLabel: "Illustrative WorkforceOS dashboard with sample data",
  sampleDataLabel: "Illustrative — sample data",
} as const;

/** Section 2 — LogoBar / pilot strip (charcoal). Aggregate only, no names. */
export const logoStrip = {
  label: "Being built with active restaurant operations",
  aggregate: "3 active pilots · 1,000+ frontline users · restaurants, catering & campus recreation",
  tell: "Named pilots, not stock logos — see who below.",
} as const;

/** Section 4 — Features (cream band). Heading renders light line then bold
 *  line. Cards render in `displayOrder` (persuasion leads with call-outs);
 *  the `confirmedCapabilities` array itself keeps its tested order. */
export const featureSection = {
  headingLight: "Restaurant operations intelligence,",
  headingBold: "built around scheduling and communication.",
  intro:
    "Scheduling and team communication come first — backed by labor forecasting, inventory, operational workflows, and day-to-day exceptions, all in the same dashboard.",
  displayOrder: [
    "scheduling",
    "communication",
    "exceptions",
    "forecasting",
    "inventory",
    "workflows",
  ] satisfies CapabilitySlug[],
  footerNote:
    "Every area is configured to your roles, rules, and workflows — and you decide which actions WorkforceOS recommends, which need manager approval, and which run automatically.",
} as const;

/** Section 5 — How it works (charcoal). Heading renders light line then bold
 *  line. `subheadEmphasis` is the substring to wrap in <strong>. */
export const howItWorksSection = {
  headingLight: "A practical path to",
  headingBold: "your first workflow.",
  subhead:
    "You connect the systems you already use, choose the dashboards and rules that fit your operation, and set the manager boundary.",
  subheadEmphasis: "set the manager boundary.",
} as const;

/** Section 6 — AI control (charcoal). Heading renders light line then bold line. */
export const aiControlSection = {
  headingLight: "You set what it's",
  headingBold: "allowed to do.",
  intro:
    "For every workflow, WorkforceOS can surface an issue and wait, prepare a response and wait for your approval, or complete a routine action you've already approved and log it. Managers can override anything.",
} as const;

export type ProofCard = {
  name: string;
  context: string;
  result: string;
  note: string;
};

/** Section 7 — Proof (cream band). THE ONLY section with pilot names, their
 *  per-customer results, and the "10–15 hours" figure. Heading renders bold
 *  line then light line. Also drives / mirrors `pilotImpact.customers`. */
export const proofSection = {
  headingBold: "Three operations are",
  headingLight: "already running on it.",
  intro:
    "WorkforceOS is being built with active pilots — more than 1,000 frontline users across their teams. Here's what each one reports.",
  cards: [
    {
      name: "Olive & Vine",
      context: "Catering and event operations",
      result: "Saves the operations team 10–15 hours every week",
      note: "Supported workflow — scheduling, staffing, and daily coordination",
    },
    {
      name: "Mylapore",
      context: "12-location restaurant group",
      // TODO(pilot): replace with the confirmed weekly hours figure.
      result: "Reports hours saved on scheduling and coverage each week, across all 12 locations",
      note: "Supported workflow — scheduling, coverage, WhatsApp shift updates, and labor forecasting",
    },
    {
      name: "UC Davis Rec Sports",
      context: "Student-powered campus operations",
      result: "Reports easier scheduling, communication, and emergency coverage",
      note: "WorkforceOS learns how their recurring events are staffed from shift history",
    },
  ] satisfies ProofCard[],
  aggregate: "3 active pilots · 1,000+ frontline users · restaurants, catering & campus recreation",
  transparencyNote:
    "Each result is what the pilot reported to us. Approved quotes and logos from Olive & Vine, Mylapore, and UC Davis Rec Sports will be added here as they're cleared for publication.",
} as const;

/** Section 8 — FAQ (paper). List is `implementationControl`. */
export const faqSection = {
  heading: "Questions buyers ask first.",
} as const;

/** Section 9 — Final CTA (sage band). Heading renders bold line then light line. */
export const finalCtaSection = {
  headingBold: "Show us the shift your team",
  headingLight: "rescues every week.",
  body:
    "Bring a real example — a Friday call-out, a game-day scramble, a rotation nobody wants to own. In the demo we'll map how it plays out today, what information WorkforceOS needs to resolve it, and where the coordination work goes away.",
  bullets: [
    "A walkthrough built on your actual workflow, not a generic tour",
    "The manager-approval boundary drawn for your operation",
    "The systems and data a pilot would need",
    "A scoped starting point — one workflow, one location",
  ],
  reassurance:
    "No rip-and-replace. WorkforceOS is configured around the tools you already use, and starts with one workflow.",
} as const;

// ---------------------------------------------------------------------------
// Company — who is building WorkforceOS. Kept factual and small: the pilots
// are named in `proofSection`; this section is about the team and how it
// works. Named bios and photos are added here once cleared — the same
// publication rule applied to pilot quotes.
// ---------------------------------------------------------------------------

export const companySection = {
  label: "Who's building this",
  heading: "Built with operators, against real shifts.",
  body: "WorkforceOS is developed alongside the three operations running on it today — a catering company, a 12-location restaurant group, and a campus recreation department. Changes ship against live pilot workflows every week, not a roadmap deck.",
  points: [
    { label: "Where it started", detail: "Coordinating student-staffed campus recreation shifts, catering events, and multi-site restaurant staffing." },
    { label: "How the team works", detail: "Weekly build cycles with pilot managers, measured on manager hours saved." },
    { label: "Team", detail: "Founder and engineering bios publish here as roles are filled." },
  ],
} as const;

/** Section 10 — Footer (charcoal). `legalLine` is the sentence after the
 *  "© {year} WorkforceOS." prefix. */
export const footerContent = {
  descriptor: "An operational intelligence platform for restaurants.",
  legalLine: "Built with active pilots in restaurants, catering, and campus recreation.",
  legalLinks: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ] satisfies NavLink[],
} as const;

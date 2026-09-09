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
  tagline: "Run every shift without chasing every update.",
  description:
    "WorkforceOS brings schedules, staff availability, tasks, messages, and operating signals into one place, then helps managers resolve call-outs, coverage gaps, and unfinished work before they disrupt the day.",
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
export const pilotCustomers = ["Olive & Vine", "UC Davis Rec Sports"] as const;

export type PilotCustomer = {
  name: string;
  context: string;
  result: string;
  noteLabel: string;
  note: string;
};

export const pilotImpact = {
  organizations: 2,
  frontlineUsers: "1,000+",
  customers: [
    {
      name: "Olive & Vine",
      context: "Catering and event operations",
      result: "10–15 operations-team hours saved each week",
      noteLabel: "Supported workflow",
      note: "Scheduling, staffing, and daily coordination",
    },
    {
      name: "UC Davis Rec Sports",
      context: "Student-powered campus operations",
      result: "Easier scheduling, communication, and emergency coverage",
      noteLabel: "Learning value",
      note: "Recognizes how recurring events are staffed from shift history",
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
  problem: "problem",
  capabilities: "capabilities",
  authority: "ai-control",
  implementation: "implementation",
  audience: "audience",
  faq: "faq",
  finalCta: "final-cta",
} as const;

// Anchors into the landing page's sections. Section ids match sectionIds
// above. Used from any route as `/#id` (Header prefixes the leading `/` when
// not already on the homepage) so the same links work from `/demo` too.
// Kept intentionally short — three questions a visitor actually has, not an
// exhaustive site map.
export const navAnchors: NavLink[] = [
  { label: "How It Works", href: `#${sectionIds.capabilities}` },
  { label: "Use Cases", href: `#${sectionIds.audience}` },
  { label: "AI Control", href: `#${sectionIds.authority}` },
];

export const ctaCopy = {
  primary: "Book a Demo",
  secondary: "See a Workflow",
} as const;

export const ctaNav: NavLink = { label: ctaCopy.primary, href: "/demo" };

// Deliberately narrow: the footer keeps only what's live — legal pages and
// the one conversion path — per the brief's instruction not to expose
// unfinished routes.
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "How It Works", href: `/#${sectionIds.capabilities}` },
      { label: "Use Cases", href: `/#${sectionIds.audience}` },
      { label: "AI Control", href: `/#${sectionIds.authority}` },
      { label: "Pilot results", href: `/#${sectionIds.pilots}` },
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
  message: "Active pilots support 1,000+ frontline users across restaurant, catering, and campus operations.",
  href: `#${sectionIds.pilots}`,
};

// LinkedIn presence isn't live yet — the footer renders this as a visible,
// non-navigating placeholder rather than a real (unverified) URL.
export const socialLinks = {
  linkedinPlaceholder: true,
} as const;

export type AuthorityMode = "inform" | "recommend" | "execute";

// ---------------------------------------------------------------------------
// Hero workflow — the one confirmed scheduling-exception sequence the hero
// demonstrates as a dispatch timeline: call-out → availability checked →
// eligible replacement identified → manager approval → resolved. Deliberately
// a single wedge, not the old POS-plus-labor mix, which implied forecasting
// the product doesn't do.
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
  { source: "SCHEDULE", label: "One closing shift is open" },
  { source: "AVAILABILITY", label: "Three possible replacements" },
  { source: "TEAM MESSAGES", label: "Two conflicting updates" },
  { source: "TASK LIST", label: "Closing work still unassigned" },
];

export const coordinationStages = ["See the exception", "Prepare the response", "Update the team"] as const;

// ---------------------------------------------------------------------------
// Confirmed capabilities — four tabs, one default. Replaces the old five
// equal-weight operational areas; POS/inventory/task signals move to
// additionalConnectedSignals below, labeled as implementation-dependent
// rather than presented as equally mature modules.
// ---------------------------------------------------------------------------

export type CapabilitySlug = "scheduling" | "exceptions" | "communication" | "patterns";

export type ConfirmedCapability = {
  slug: CapabilitySlug;
  tabLabel: string;
  description: string;
  example?: string;
  qualifier?: string;
};

export const confirmedCapabilities: ConfirmedCapability[] = [
  {
    slug: "scheduling",
    tabLabel: "Build and fill shifts",
    description:
      "Build schedules around submitted availability and give managers one place to see open roles, coverage, and assignments.",
    example: "Eight roles needed · Seven assigned · Three eligible team members available",
  },
  {
    slug: "exceptions",
    tabLabel: "Handle exceptions",
    description:
      "When a call-out, no-show, or headcount change occurs, WorkforceOS prepares the appropriate backfill, reassignment, notification, or approval request.",
    example: "Call-out received → eligible replacement identified → manager approval requested",
  },
  {
    slug: "communication",
    tabLabel: "Coordinate communication",
    description: "Attach messages and notifications to the shift or event they affect so the team sees the update in context.",
    example: "Coverage approved → schedule updated → affected employees notified",
  },
  {
    slug: "patterns",
    tabLabel: "Learn recurring patterns",
    description:
      "Use operating history to recognize how recurring shifts and events are normally staffed, reducing setup work over time.",
    qualifier: "Recognizes what repeats; it does not predict the future.",
  },
];

export const additionalConnectedSignals = {
  intro:
    "Depending on the systems already in place, WorkforceOS can also bring relevant sales activity, inventory, and task signals into the manager's operating view.",
  signals: ["Sales activity", "Inventory", "Task coordination"],
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
    title: "Choose one workflow",
    description: "Identify the recurring scheduling, coverage, or communication problem consuming the most manager time.",
  },
  {
    number: "02",
    title: "Connect the required information",
    description: "Confirm where schedules, availability, team updates, and related operating data currently live.",
  },
  {
    number: "03",
    title: "Set the manager boundary",
    description: "Decide which actions WorkforceOS may complete and which require approval.",
  },
  {
    number: "04",
    title: "Pilot, measure, and expand",
    description: "Launch with a defined team or location, measure manager time and workflow completion, then add adjacent workflows.",
  },
];

export const implementationHonestyNote =
  "Integration scope and pilot timing are confirmed after reviewing the systems already in use.";

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
    question: "Does it work with the systems we already use?",
    answer:
      "It's configured around your existing scheduling, communication, and related operating systems rather than asking you to replace them. Integration scope depends on what you're running today.",
  },
  {
    question: "What happens when no one's available to cover a shift?",
    answer:
      "WorkforceOS tells the manager that no replacement was found, rather than leaving the shift silently uncovered. The decision on what to do next stays with a person.",
  },
  {
    question: "Does this replace how our managers make decisions?",
    answer:
      "No. WorkforceOS prepares the response and coordinates the update; the manager boundary decides what still needs a person's sign-off before anything changes.",
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

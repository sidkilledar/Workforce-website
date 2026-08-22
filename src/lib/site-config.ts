export const siteConfig = {
  name: "WorkforceOS",
  tagline: "The AI ops manager for shift-based teams.",
  description:
    "WorkforceOS is the AI ops manager for shift-based teams — it schedules your staff, absorbs the daily chaos, and keeps managers in the loop instead of in the weeds.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.workforceos.com",
  ogImage: "/og-image.png",
  email: "hello@workforceos.com",
} as const;

// Named, factual pilot mentions — not testimonials. No quotes or logos are
// attached to these until Olive & Vine and UC Davis Rec Sports approve
// something for publication; until then they're named plainly wherever the
// site references active pilots.
export const pilotCustomers = ["Olive & Vine", "UC Davis Rec Sports"] as const;

export type NavLink = {
  label: string;
  href: string;
};

// Anchors into the landing page's sections. Section ids match sectionIds
// below. Used from any route as `/#id` (Header prefixes the leading `/` when
// not already on the homepage) so the same links work from `/demo` too.
export const navAnchors: NavLink[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What It Handles", href: "#what-it-handles" },
  { label: "Customers", href: "#customers" },
  { label: "Who It's For", href: "#who-its-for" },
];

export const ctaNav: NavLink = { label: "Book a Demo", href: "/demo" };

// Deliberately narrow: the redesigned footer keeps only what's live —
// legal pages and the one conversion path — per the brief's instruction not
// to expose the unfinished /product, /pricing, and /industries routes.
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export const sectionIds = {
  announcement: "announcement",
  hero: "hero",
  customers: "customers",
  problem: "problem",
  howItWorks: "how-it-works",
  whatItHandles: "what-it-handles",
  scenario: "scenario",
  outcomes: "outcomes",
  stories: "stories",
  whoItsFor: "who-its-for",
  control: "control",
  finalCta: "final-cta",
} as const;

export type CtaLocation =
  | "header"
  | "mobile_menu"
  | "hero"
  | "scenario"
  | "control"
  | "final_cta"
  | "demo_page";

export const ctaCopy = {
  primary: "Book a Demo",
  secondary: "See How It Works",
} as const;

export type Announcement = {
  message: string;
  href: string;
};

// Optional narrow utility banner. Set to null to remove it without touching
// header layout. Content-driven — swap for a concrete customer result once
// one is approved for publication.
export const announcement: Announcement | null = {
  message: `In active pilots with ${pilotCustomers.join(" and ")}.`,
  href: "/demo",
};

// LinkedIn presence isn't live yet — the footer renders this as a visible,
// non-navigating placeholder rather than a real (unverified) URL.
export const socialLinks = {
  linkedinPlaceholder: true,
} as const;

export type Capability = {
  slug: string;
  name: string;
  summary: string;
  description: string;
};

export const capabilities: Capability[] = [
  {
    slug: "forecasting",
    name: "Forecasting",
    summary: "Know the labor and staffing each location is likely to need before the week begins.",
    description:
      "WorkforceOS reads demand patterns, seasonality, and upcoming events to forecast staffing and labor needs by location and daypart, before a single shift is scheduled.",
  },
  {
    slug: "smart-scheduling",
    name: "Smart Scheduling",
    summary: "Build schedules around demand, availability, roles, labor targets, and operating rules.",
    description:
      "Schedules are drafted directly from the forecast, staff availability, roles, certifications, and labor targets — giving managers a strong starting point instead of a blank grid.",
  },
  {
    slug: "shift-coverage",
    name: "Shift Coverage",
    summary: "Detect gaps, identify qualified team members, coordinate outreach, and keep managers informed.",
    description:
      "When a gap opens up, WorkforceOS identifies who's qualified and available, coordinates outreach automatically, and keeps the manager informed until it's resolved.",
  },
  {
    slug: "approvals",
    name: "Approvals",
    summary: "Route time-off requests, schedule changes, and operational decisions to the right person.",
    description:
      "Time-off requests, schedule changes, and operational decisions route to the right person automatically, with the context they need attached.",
  },
  {
    slug: "team-communication",
    name: "Team Communication",
    summary: "Deliver the correct update to the correct team without managers repeating themselves.",
    description:
      "Updates, reminders, and coverage requests reach the right team on the channels they actually check — without a manager typing the same message twice.",
  },
  {
    slug: "task-coordination",
    name: "Task Coordination",
    summary: "Assign, track, and follow up on recurring operational work across shifts and locations.",
    description:
      "Recurring operational work — opening checklists, prep, closing tasks — is assigned, tracked, and followed up on automatically across every shift and location.",
  },
  {
    slug: "operational-follow-ups",
    name: "Operational Follow-ups",
    summary: "Notice what is late, missing, or unresolved and move it forward automatically.",
    description:
      "WorkforceOS notices what's late, missing, or unresolved — an unconfirmed shift, a stalled approval, an incomplete task — and moves it forward automatically.",
  },
];

export type CapabilityStory = {
  slug: string;
  ticketNumber: string;
  title: string;
  trigger: string;
  action: string;
  outcome: string;
};

// The four focused capability stories for "What It Handles" — each framed
// as an operational trigger, WorkforceOS's action, and the manager-visible
// outcome, rather than a generic feature list.
export const capabilityStories: CapabilityStory[] = [
  {
    slug: "scheduling",
    ticketNumber: "#041",
    title: "Scheduling & staffing",
    trigger: "A new set of shifts needs to be built.",
    action: "WorkforceOS builds and fills the schedule around real staff availability — not manual spreadsheet juggling.",
    outcome: "Shifts are staffed before anyone has to chase it.",
  },
  {
    slug: "learns",
    ticketNumber: "#042",
    title: "Learns your operation",
    trigger: "Your operation runs its own way.",
    action: "It picks up patterns from your own operating history instead of requiring a big upfront rules setup.",
    outcome: "It fits how you already run — not a template you adopt.",
  },
  {
    slug: "exceptions",
    ticketNumber: "#043",
    title: "Handles exceptions automatically",
    trigger: "A call-out, no-show, or headcount change happens.",
    action: "It resolves it — backfill, reassign, or notify — through a configurable human-approval layer.",
    outcome: "Managers stay in control without chasing every exception themselves.",
  },
  {
    slug: "comms",
    ticketNumber: "#044",
    title: "One comms channel",
    trigger: "The team needs an update.",
    action: "Team messaging and notifications live where the schedule lives, not in a separate app.",
    outcome: "No more Slack, Discord, and texts competing with the schedule.",
  },
];

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  heroDescription: string;
  challenges: string[];
  highlights: { title: string; description: string }[];
  tint: "violet" | "cobalt" | "cyan";
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    shortName: "Restaurants",
    summary: "Keep every shift staffed without building the week through group chats and spreadsheets.",
    heroDescription:
      "WorkforceOS forecasts demand by daypart, builds the week around it, and fills coverage gaps before they hit the floor — so independent restaurants run on a plan instead of a scramble.",
    challenges: [
      "Demand that swings by daypart, day of week, and season",
      "Last-minute call-outs during peak service",
      "Building the schedule by hand every single week",
      "No clear system of record for approvals and coverage",
    ],
    highlights: [
      {
        title: "Daypart-level forecasting",
        description: "Predict volume by meal period so every shift is staffed to demand, not a flat weekly average.",
      },
      {
        title: "Automatic coverage outreach",
        description: "Open shifts route to eligible, available staff automatically instead of a manager working the phones.",
      },
      {
        title: "One place for the whole operation",
        description: "Scheduling, coverage, approvals, and communication live in one system instead of five.",
      },
    ],
    tint: "violet",
  },
  {
    slug: "chains",
    name: "Multi-Location Chains",
    shortName: "Multi-location chains",
    summary: "Give every location a consistent operating system while preserving local flexibility.",
    heroDescription:
      "WorkforceOS gives multi-location operators one consistent operating layer across every site — while leaving room for each location's manager, team, and local conditions.",
    challenges: [
      "Inconsistent scheduling and coverage practices across locations",
      "No unified view of labor cost and coverage risk",
      "Local managers need flexibility, leadership needs consistency",
      "Coordinating staffing decisions across a growing footprint",
    ],
    highlights: [
      {
        title: "One standard, every location",
        description: "The same forecasting, scheduling, and approval logic runs everywhere, configured for local conditions.",
      },
      {
        title: "Portfolio-level visibility",
        description: "Leadership sees labor, coverage, and risk across every location from a single operating layer.",
      },
      {
        title: "Local flexibility, not local chaos",
        description: "Location managers keep control over their day-to-day decisions inside a consistent framework.",
      },
    ],
    tint: "cobalt",
  },
  {
    slug: "catering",
    name: "Catering",
    shortName: "Catering",
    summary: "Coordinate fluctuating demand, event staffing, availability, and last-minute changes.",
    heroDescription:
      "Catering labor needs change event to event. WorkforceOS turns event scope into a staffing plan, keeps a flexible roster ready, and adapts fast when details change.",
    challenges: [
      "Staffing needs that vary dramatically by event",
      "Coordinating a flexible or on-call workforce",
      "Short lead times between booking and event day",
      "Last-minute changes to guest count, timing, or scope",
    ],
    highlights: [
      {
        title: "Event-based staffing plans",
        description: "Event scope and guest count translate into a staffing plan without rebuilding a spreadsheet each time.",
      },
      {
        title: "A flexible roster, organized",
        description: "On-call and flexible staff stay organized, with availability and eligibility always current.",
      },
      {
        title: "Fast adaptation to change",
        description: "When event details shift, staffing and coordination adjust without starting over.",
      },
    ],
    tint: "cyan",
  },
  {
    slug: "campuses",
    name: "College Campuses",
    shortName: "College campuses",
    summary: "Manage complex schedules across dining, facilities, events, and other hourly teams.",
    heroDescription:
      "Campus operations run on an academic calendar full of exceptions. WorkforceOS plans around semester schedules, student availability, and campus events across every hourly team.",
    challenges: [
      "Student staff with constantly changing class schedules",
      "Semester, break, and event-driven demand swings",
      "Coordinating dining, facilities, and event teams together",
      "High turnover as students graduate or change availability",
    ],
    highlights: [
      {
        title: "Academic-calendar-aware planning",
        description: "Labor plans adjust automatically for semester breaks, finals periods, and campus events.",
      },
      {
        title: "Built around student availability",
        description: "Schedules respect changing class schedules without a manual back-and-forth every term.",
      },
      {
        title: "Cross-department coordination",
        description: "Dining, facilities, and event teams share one operating picture instead of separate systems.",
      },
    ],
    tint: "violet",
  },
  {
    slug: "other",
    name: "Other Shift-Based Teams",
    shortName: "Other shift-based teams",
    summary: "Adapt WorkforceOS to the operating rules, roles, and scheduling patterns of the organization.",
    heroDescription:
      "If your team runs on shifts, not salaries, WorkforceOS applies the same forecasting, scheduling, and coverage engine to your operation — configured around how you actually run.",
    challenges: [
      "Operating rules and roles that don't fit an off-the-shelf template",
      "Disconnected tools for scheduling, messaging, and task tracking",
      "Limited visibility into labor cost versus plan",
      "Manual work to keep shifts covered and compliant",
    ],
    highlights: [
      {
        title: "Configured to your operation",
        description: "Forecasting, scheduling, and coverage logic configure around your specific rules and roles.",
      },
      {
        title: "One operating layer",
        description: "Replace disconnected scheduling, messaging, and task tools with a single coordinated system.",
      },
      {
        title: "Built for shift-based work",
        description: "Every part of WorkforceOS is designed around the realities of hourly, shift-based operations.",
      },
    ],
    tint: "cobalt",
  },
];

export type AudienceSegment = {
  slug: string;
  name: string;
  situation: string;
};

// "Who It's For" — concise operational situations rather than separate
// product pages. Reflects the actual go-to-market: teams staffed mostly by
// students and hourly workers, in that order per the current pilots.
export const audienceSegments: AudienceSegment[] = [
  {
    slug: "catering",
    name: "Caterers staffing events",
    situation:
      "Staffing changes event to event — headcount, roles, and timing shift with every booking, not on a fixed weekly schedule.",
  },
  {
    slug: "restaurant-groups",
    name: "Restaurant groups",
    situation:
      "A mostly hourly staff across multiple locations, where a call-out or no-show lands right at peak service.",
  },
  {
    slug: "campus-sports",
    name: "Campus sports & recreation",
    situation:
      "A roster of student staff whose availability changes every quarter, coordinating shifts around class schedules and events.",
  },
];

export type OperationOutcome = {
  title: string;
  description: string;
};

// Qualitative benefits only — no ROI calculator, no invented numbers.
// Framed around shifts/events/locations rather than "portfolio" language,
// since the actual customer base spans single-site caterers and campus
// departments as much as multi-location restaurant groups.
export const operationOutcomes: OperationOutcome[] = [
  {
    title: "One system, not five",
    description: "Scheduling, exceptions, and team communication live in one place instead of a scheduling app plus Slack, Discord, and texts.",
  },
  {
    title: "Configured to how you run",
    description: "It learns from your operating history instead of asking you to set up a big rules engine before it's useful.",
  },
  {
    title: "Fewer unresolved exceptions",
    description: "Call-outs, no-shows, and headcount changes get backfilled, reassigned, or escalated automatically instead of piling up.",
  },
  {
    title: "Managers stay in the loop, not in the weeds",
    description: "A configurable approval layer keeps managers deciding the judgment calls, not chasing every exception by hand.",
  },
];

export type OperatingLoopStage = {
  key: "sense" | "plan" | "act" | "verify";
  code: string;
  number: string;
  title: string;
  heading: string;
  description: string;
};

// The central explanation of the product mechanism — Sense → Plan → Act →
// Verify — driving both the desktop scroll narrative and the mobile stacked
// sequence in the operating-loop section.
export const operatingLoopStages: OperatingLoopStage[] = [
  {
    key: "sense",
    code: "S",
    number: "01",
    title: "Sense",
    heading: "Notice the exception",
    description:
      "A call-out, a no-show, a headcount change — WorkforceOS watches for it the moment it happens, learned from how your operation actually runs.",
  },
  {
    key: "plan",
    code: "P",
    number: "02",
    title: "Plan",
    heading: "Decide the response",
    description:
      "It weighs who's eligible and available, and whether the fix is a backfill, a reassignment, or a notification to the manager.",
  },
  {
    key: "act",
    code: "A",
    number: "03",
    title: "Act",
    heading: "Act, within the approval layer",
    description:
      "It reaches out to qualified staff and resolves it automatically — or routes it to a manager first, based on the approval rules you've set.",
  },
  {
    key: "verify",
    code: "V",
    number: "04",
    title: "Verify",
    heading: "Confirm it's resolved",
    description:
      "The shift is covered, the message is sent, and the manager sees it resolved in the same place the schedule lives — not a separate chat thread.",
  },
];

export type ScenarioStep = {
  time: string;
  title: string;
  description: string;
};

// A single illustrative call-out, presented as an operational timeline
// (detect → eligibility → outreach → confirmation → schedule update →
// manager notification). Not a real customer workflow — the section labels
// it illustrative unless that changes.
export const scenarioWalkthrough: ScenarioStep[] = [
  {
    time: "5:52 PM",
    title: "Call-out detected",
    description: "A staff member messages out for tonight's shift.",
  },
  {
    time: "5:53 PM",
    title: "Eligibility checked",
    description: "WorkforceOS checks availability and weekly hours against the rest of the roster.",
  },
  {
    time: "5:54 PM",
    title: "Backfill outreach sent",
    description: "Two qualified, available staff are contacted automatically for the open shift.",
  },
  {
    time: "6:03 PM",
    title: "Coverage confirmed",
    description: "One staff member accepts. The shift is filled before service starts.",
  },
  {
    time: "6:03 PM",
    title: "Schedule updated",
    description: "The schedule and coverage record update automatically — no manual re-entry.",
  },
  {
    time: "6:04 PM",
    title: "Manager notified",
    description: "The manager sees the gap and the resolution in the same channel as the schedule — not a string of unanswered texts.",
  },
];

export type ImplementationTopic = {
  question: string;
  answer: string;
};

// Answers the predictable buyer objections: existing processes, approvals,
// organizational rules, rollout, and human oversight. No integration claims
// — none are technically confirmed yet.
export const implementationControl: ImplementationTopic[] = [
  {
    question: "Does this replace how our managers make decisions?",
    answer:
      "No. WorkforceOS handles the coordination — backfill outreach, reassignment, notifications — through a configurable approval layer, so judgment calls still go to a person.",
  },
  {
    question: "Does it work with how we already run things?",
    answer:
      "WorkforceOS learns from your own operating history instead of asking you to configure a big rules engine before it's useful.",
  },
  {
    question: "How does rollout actually work?",
    answer:
      "Rollout starts as a focused pilot — one team or one workflow — and runs there until it's solid before expanding further.",
  },
  {
    question: "What do managers still control?",
    answer:
      "Managers set what needs their approval, confirm the judgment calls, and can always step in — the approval layer is configurable, not fixed.",
  },
];

export const locationBands = ["1 location", "2–5 locations", "6–20 locations", "20+ locations"] as const;

export const hourlyEmployeeBands = [
  "Fewer than 25",
  "25–100",
  "101–500",
  "500+",
] as const;

export const frictionWorkflows = [
  { value: "forecasting", label: "Forecasting" },
  { value: "scheduling", label: "Scheduling" },
  { value: "coverage", label: "Shift coverage" },
  { value: "approvals", label: "Approvals" },
  { value: "communication", label: "Team communication" },
  { value: "tasks", label: "Task coordination" },
  { value: "follow-ups", label: "Operational follow-ups" },
  { value: "other", label: "Something else" },
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

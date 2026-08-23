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
  tagline: "The AI operations command center for frontline businesses.",
  description:
    "WorkforceOS connects the systems you already use, brings the operation into one manager dashboard, turns data into insights, and lets AI coordinate daily work within authority rules you control — so managers can spend less time behind a screen and more time on the floor.",
  url: resolveSiteUrl(),
  ogImage: "/opengraph-image",
  email: "hello@workforceos.com",
} as const;

// Named, factual pilot mentions — not testimonials. No quotes or logos are
// attached to these until Olive & Vine and UC Davis Rec Sports approve
// something for publication; until then they're named plainly wherever the
// site references active pilots.
export const pilotCustomers = ["Olive & Vine", "UC Davis Rec Sports"] as const;

export const pilotImpact = {
  organizations: 2,
  frontlineUsers: "1,000+",
  customers: [
    {
      name: "Olive & Vine",
      context: "Catering and event operations",
      result: "Saves the operations team 10–15 hours each week.",
    },
    {
      name: "UC Davis Rec Sports",
      context: "Student-powered campus operations",
      result:
        "Makes scheduling, team communication, and emergency coverage easier while learning how recurring events are staffed from shift history.",
    },
  ],
} as const;

export type NavLink = {
  label: string;
  href: string;
};

// Anchors into the landing page's sections. Section ids match sectionIds
// below. Used from any route as `/#id` (Header prefixes the leading `/` when
// not already on the homepage) so the same links work from `/demo` too.
export const navAnchors: NavLink[] = [
  { label: "Platform", href: "#command-center" },
  { label: "Operations", href: "#pillars" },
  { label: "AI Control", href: "#authority" },
  { label: "Integrations", href: "#integration" },
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
  pilots: "pilots",
  problem: "problem",
  integration: "integration",
  commandCenter: "command-center",
  pillars: "pillars",
  aiAssistant: "ai-assistant",
  cycle: "cycle",
  dayInOperation: "day-in-operation",
  insights: "insights",
  authority: "authority",
  whoItsFor: "who-its-for",
  control: "control",
  finalCta: "final-cta",
} as const;

export type CtaLocation =
  | "header"
  | "mobile_menu"
  | "hero"
  | "command_center"
  | "control"
  | "final_cta"
  | "demo_page";

export const ctaCopy = {
  primary: "Book a Demo",
  secondary: "See the Command Center",
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

// ---------------------------------------------------------------------------
// Patchwork problem — the disconnected sources a manager reconciles by hand.
// ---------------------------------------------------------------------------

export type PatchworkSource = {
  source: string;
  label: string;
};

export const patchworkSources: PatchworkSource[] = [
  { source: "POS / SALES", label: "Tonight's covers running high" },
  { source: "SCHEDULING", label: "Shift marked open" },
  { source: "INVENTORY", label: "Low-stock count, unresolved" },
  { source: "TASKS", label: "Closing checklist, incomplete" },
  { source: "SLACK / DISCORD", label: "“Can anyone cover tonight?”" },
  { source: "SPREADSHEET", label: "Manager's own tracking, out of date" },
];

// ---------------------------------------------------------------------------
// Integration & customization — the implementation model, not vendor logos.
// ---------------------------------------------------------------------------

export type IntegrationCategory = {
  category: string;
  purpose: string;
  exampleInputs: string[];
  /** States plainly that scope depends on the customer's actual systems. */
  implementationQualifier: string;
};

export const integrationCategories: IntegrationCategory[] = [
  {
    category: "POS",
    purpose: "Bring sales and transaction activity into the same operating view as staffing.",
    exampleInputs: ["Sales volume", "Transaction timing", "Covers or order counts"],
    implementationQualifier: "Depends on the POS system already in place and what it exposes.",
  },
  {
    category: "Scheduling",
    purpose: "Connect the schedule and staff availability WorkforceOS coordinates around.",
    exampleInputs: ["Shifts", "Availability", "Roles and locations"],
    implementationQualifier: "Configured around the scheduling process already in use.",
  },
  {
    category: "Inventory",
    purpose: "Bring inventory counts and exceptions into the same workflow as tasks and shifts.",
    exampleInputs: ["Stock counts", "Low-stock thresholds", "Transfers"],
    implementationQualifier: "Scope depends on how inventory is currently tracked.",
  },
  {
    category: "Communication",
    purpose: "Route messages and notifications through the systems the team already checks.",
    exampleInputs: ["Team messaging", "Notifications", "Approval requests"],
    implementationQualifier: "Connects to the channels the team actually uses, where supported.",
  },
  {
    category: "Operational systems",
    purpose: "Connect other systems of record the operation depends on day to day.",
    exampleInputs: ["Task and checklist tools", "Location and role data", "Operating history"],
    implementationQualifier: "Confirmed during implementation, on a per-customer basis.",
  },
];

export type ImplementationStep = {
  number: string;
  title: string;
  description: string;
};

export const implementationSteps: ImplementationStep[] = [
  {
    number: "01",
    title: "Connect your systems",
    description: "WorkforceOS connects to the POS, scheduling, inventory, and communication systems already in place.",
  },
  {
    number: "02",
    title: "Map your operation",
    description: "Terminology, locations, roles, and workflows get mapped to how this operation actually runs — not a generic template.",
  },
  {
    number: "03",
    title: "Define AI actions and approvals",
    description: "Which actions run automatically and which need a manager's approval is configured per workflow, not assumed.",
  },
  {
    number: "04",
    title: "Launch selected workflows",
    description: "Begin with the workflows that create the most daily coordination work instead of changing everything at once.",
  },
  {
    number: "05",
    title: "Expand with operating history",
    description: "Add more workflows as the team gets comfortable and WorkforceOS learns what repeats in this operation.",
  },
];

// ---------------------------------------------------------------------------
// Operations command center — the manager's shared operating picture.
// ---------------------------------------------------------------------------

export type DashboardModule = {
  slug: string;
  label: string;
  state: string;
  priority: "normal" | "attention" | "resolved";
  /** A complete, standalone plain-language summary for screen readers and no-JS rendering. */
  accessibleSummary: string;
};

// All values are illustrative — a representative day, not real customer data.
export const dashboardModules: DashboardModule[] = [
  {
    slug: "sales",
    label: "Sales signal",
    state: "Dinner covers trending above a typical Thursday",
    priority: "attention",
    accessibleSummary: "Sales signal: dinner covers are trending above a typical Thursday for this location.",
  },
  {
    slug: "labor",
    label: "Labor & coverage",
    state: "Fully staffed — one open shift being backfilled",
    priority: "normal",
    accessibleSummary: "Labor and coverage: the schedule is fully staffed, with one open shift currently being backfilled.",
  },
  {
    slug: "inventory",
    label: "Inventory exception",
    state: "Low stock flagged — prep task created for closing",
    priority: "attention",
    accessibleSummary: "Inventory exception: a low-stock item was flagged and a prep task was created for the closing shift.",
  },
  {
    slug: "task",
    label: "Open task",
    state: "Opening checklist — 2 items outstanding",
    priority: "attention",
    accessibleSummary: "Open task: the opening checklist has two items still outstanding.",
  },
  {
    slug: "message",
    label: "Team message",
    state: "Closing team notified of updated prep list",
    priority: "resolved",
    accessibleSummary: "Team message: the closing team has been notified of the updated prep list.",
  },
  {
    slug: "recommendation",
    label: "AI recommendation",
    state: "Add one closer, 5–9 PM, based on tonight's covers",
    priority: "attention",
    accessibleSummary: "AI recommendation: add one closer from 5 to 9 PM, based on tonight's covers.",
  },
  {
    slug: "approval",
    label: "Approval request",
    state: "Waiting on manager — additional closer shift",
    priority: "attention",
    accessibleSummary: "Approval request: waiting on the manager to approve adding the additional closer shift.",
  },
];

// ---------------------------------------------------------------------------
// Connected operations showcase — one command-center view, five operational
// areas a manager can switch between (replaces the old five-pillar cards).
// Every state explains the same four things: signal, context, the AI
// recommendation/action, and the resulting outcome.
// ---------------------------------------------------------------------------

export type ConnectedSystemKey = "schedule" | "pos" | "inventory" | "tasks" | "channel";

export const connectedSystemNodes: { key: ConnectedSystemKey; label: string }[] = [
  { key: "schedule", label: "Schedule" },
  { key: "pos", label: "POS" },
  { key: "inventory", label: "Inventory" },
  { key: "tasks", label: "Tasks" },
  { key: "channel", label: "Team channel" },
];

export type WorkerAvailability = { name: string; status: "available" | "unavailable" | "tentative" };

export type LaborWorkspace = {
  kind: "labor";
  coverageSummary: string;
  gapShift: { label: string; time: string; detail: string };
  availability: WorkerAvailability[];
};

export type SalesWorkspace = {
  kind: "sales";
  demand: { label: string; value: number }[];
  scheduledLabor: { label: string; value: number }[];
  mismatch: string;
};

export type InventoryWorkspace = {
  kind: "inventory";
  item: string;
  threshold: string;
  requiredAction: string;
  createdTask: { title: string; assignee: string; due: string };
};

export type TaskQueueItem = { title: string; owner: string; due: string; status: "on-track" | "at-risk" | "reassigned" };

export type TasksWorkspace = {
  kind: "tasks";
  queue: TaskQueueItem[];
  reassignedTask: { title: string; from: string; to: string; relatedEvent: string };
};

export type CommunicationWorkspace = {
  kind: "communication";
  affected: string;
  history: { label: string; time: string }[];
};

export type OperationalWorkspace =
  | LaborWorkspace
  | SalesWorkspace
  | InventoryWorkspace
  | TasksWorkspace
  | CommunicationWorkspace;

export type OperationalArea = {
  slug: "labor" | "sales" | "inventory" | "tasks" | "communication";
  index: string;
  name: string;
  /** Plain-language question a manager is trying to answer. */
  question: string;
  /** One-line signal summary shown in the selector row. */
  summary: string;
  railNode: ConnectedSystemKey;
  connectedSystems: string[];
  /** What WorkforceOS sees. */
  signal: string;
  /** Why it matters. */
  context: string;
  /** Plain-language AI recommendation. */
  recommendation: string;
  /** Supporting reason for the recommendation. */
  reason: string;
  authorityMode: AuthorityMode;
  /** What changes for the manager. */
  outcome: string;
  workspace: OperationalWorkspace;
};

export const operationalAreas: OperationalArea[] = [
  {
    slug: "labor",
    index: "01",
    name: "Labor & Staffing",
    question: "Who is working?",
    summary: "Availability, shifts, call-outs, and coverage",
    railNode: "schedule",
    connectedSystems: ["Schedule", "Team channel"],
    signal: "One dinner shift is short a closer after a last-minute call-out.",
    context: "Coverage gaps are hardest to recover from once service has started.",
    recommendation: "Extend an available closer's shift by two hours.",
    reason: "Based on submitted availability and how similar gaps were handled before.",
    authorityMode: "recommend",
    outcome: "Coverage is restored once the manager approves.",
    workspace: {
      kind: "labor",
      coverageSummary: "7 of 8 shifts covered for Thursday dinner.",
      gapShift: { label: "Dinner service", time: "5:00–9:00 PM", detail: "One closer position open after a call-out" },
      availability: [
        { name: "J. Alvarez", status: "available" },
        { name: "M. Chen", status: "tentative" },
        { name: "R. Patel", status: "unavailable" },
      ],
    },
  },
  {
    slug: "sales",
    index: "02",
    name: "Sales & POS",
    question: "How is service tracking?",
    summary: "Demand signals alongside scheduled labor",
    railNode: "pos",
    connectedSystems: ["POS", "Schedule"],
    signal: "Dinner covers are trending above a typical Thursday.",
    context: "The schedule was set before tonight's demand signal came in.",
    recommendation: "Review staffing for the 5–9 PM dinner block.",
    reason: "Scheduled labor hasn't yet been adjusted for tonight's covers.",
    authorityMode: "inform",
    outcome: "The manager decides whether to adjust staffing before service.",
    workspace: {
      kind: "sales",
      demand: [
        { label: "Mon", value: 38 },
        { label: "Tue", value: 34 },
        { label: "Wed", value: 41 },
        { label: "Thu", value: 58 },
      ],
      scheduledLabor: [
        { label: "Mon", value: 36 },
        { label: "Tue", value: 33 },
        { label: "Wed", value: 40 },
        { label: "Thu", value: 40 },
      ],
      mismatch: "Thursday's demand signal is running well above scheduled labor for the first time this week.",
    },
  },
  {
    slug: "inventory",
    index: "03",
    name: "Inventory",
    question: "What are we running low on?",
    summary: "Thresholds, prep requirements, and shortages",
    railNode: "inventory",
    connectedSystems: ["Inventory", "Tasks"],
    signal: "A prep item has dropped below its low-stock threshold.",
    context: "This item is needed for tonight's closing prep.",
    recommendation: "Create a prep task for the closing team.",
    reason: "Configured authority allows routine prep tasks to be created automatically.",
    authorityMode: "execute",
    outcome: "The task appears on the closing team's list — no manager step needed.",
    workspace: {
      kind: "inventory",
      item: "Diced tomatoes",
      threshold: "Below par for tonight's prep",
      requiredAction: "Restock or substitute before closing prep begins.",
      createdTask: { title: "Restock diced tomatoes", assignee: "Closing team", due: "Tonight, 9:00 PM" },
    },
  },
  {
    slug: "tasks",
    index: "04",
    name: "Tasks",
    question: "What still needs to get done?",
    summary: "Ownership, deadlines, and unfinished work",
    railNode: "tasks",
    connectedSystems: ["Tasks", "Schedule"],
    signal: "An opening checklist item is still unfinished heading into dinner.",
    context: "The task's original owner has since clocked out.",
    recommendation: "Reassign the task to an available closer.",
    reason: "Connected to tonight's dinner shift and the closing team's schedule.",
    authorityMode: "execute",
    outcome: "The task moves forward without the manager tracking it down personally.",
    workspace: {
      kind: "tasks",
      queue: [
        { title: "Restock service station", owner: "A. Brooks", due: "4:00 PM", status: "on-track" },
        { title: "Confirm walk-in temps", owner: "Unassigned", due: "4:30 PM", status: "at-risk" },
        { title: "Prep closing checklist", owner: "D. Nguyen", due: "9:00 PM", status: "reassigned" },
      ],
      reassignedTask: {
        title: "Confirm walk-in temps",
        from: "J. Alvarez (clocked out)",
        to: "D. Nguyen",
        relatedEvent: "Dinner shift, 5–9 PM",
      },
    },
  },
  {
    slug: "communication",
    index: "05",
    name: "Communication & Approvals",
    question: "What needs my approval?",
    summary: "Updates, decisions, and authority boundaries",
    railNode: "channel",
    connectedSystems: ["Team channel", "Schedule"],
    signal: "A same-day shift swap is waiting on manager sign-off.",
    context: "Two staff members proposed the swap directly with each other.",
    recommendation: "Approve the swap between two eligible staff members.",
    reason: "Both staff members are eligible for the shift being swapped.",
    authorityMode: "recommend",
    outcome: "Approved in one tap, with the context already attached.",
    workspace: {
      kind: "communication",
      affected: "J. Alvarez and M. Chen — Thursday closing shift",
      history: [
        { label: "Prep list sent to the closing team", time: "5:05 PM" },
        { label: "Shift swap approved", time: "6:20 PM" },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// AI assistant — ask, understand, and act.
// ---------------------------------------------------------------------------

export type AiAssistantExample = {
  prompt: string;
  responseType: "answers" | "recommends" | "executes" | "requests-approval";
  response: string;
};

export const aiAssistantExamples: AiAssistantExample[] = [
  {
    prompt: "What needs my attention before the dinner shift?",
    responseType: "answers",
    response: "Answers from connected operational data — the open task, the low-stock flag, and tonight's staffing level.",
  },
  {
    prompt: "Why was labor higher yesterday?",
    responseType: "answers",
    response: "Answers by connecting yesterday's schedule to the sales activity recorded for the same shift.",
  },
  {
    prompt: "Find coverage for tonight and ask me before confirming.",
    responseType: "requests-approval",
    response: "Identifies available staff and prepares outreach, but waits for manager approval before confirming anything.",
  },
  {
    prompt: "What inventory issue could affect tomorrow's events?",
    responseType: "recommends",
    response: "Recommends a prep or transfer action based on the current inventory exception and the events on tomorrow's schedule.",
  },
  {
    prompt: "Send the closing team the updated checklist.",
    responseType: "executes",
    response: "Executes within granted authority — sends the update to the closing team and reports it back once sent.",
  },
  {
    prompt: "Summarize unresolved issues across all locations.",
    responseType: "answers",
    response: "Answers from connected operational data across every location the manager has visibility into.",
  },
];

// ---------------------------------------------------------------------------
// The operating cycle — Connect, Understand, Act, Improve.
// ---------------------------------------------------------------------------

export type OperatingCycleStage = {
  key: "connect" | "understand" | "act" | "improve";
  code: string;
  number: string;
  title: string;
  heading: string;
  description: string;
};

// Not a pinned scroll narrative — "A Day in the Operation" is the page's one
// pinned story. This stays a readable stacked sequence at any width.
export const operatingCycleStages: OperatingCycleStage[] = [
  {
    key: "connect",
    code: "C",
    number: "01",
    title: "Connect",
    heading: "Receive signals from operational systems",
    description:
      "Sales, scheduling, inventory, and communication signals arrive from the systems already in place — not a new one to learn.",
  },
  {
    key: "understand",
    code: "U",
    number: "02",
    title: "Understand",
    heading: "Combine current state with operating history",
    description: "It reads what's happening right now against how this operation has usually run.",
  },
  {
    key: "act",
    code: "A",
    number: "03",
    title: "Act",
    heading: "Coordinate the configured response",
    description:
      "It carries out the response automatically or asks a manager first, depending on the authority your team has configured for that workflow.",
  },
  {
    key: "improve",
    code: "I",
    number: "04",
    title: "Improve",
    heading: "Learn from what actually happened",
    description:
      "The result gets recorded, so the next recommendation reflects real operating history — not a rule quietly rewriting itself without oversight.",
  },
];

// ---------------------------------------------------------------------------
// A day running on WorkforceOS — three moments, not a pinned scroll story.
// ---------------------------------------------------------------------------

export type AuthorityMode = "inform" | "recommend" | "execute";

export type DayTimelineMoment = {
  time: string;
  title: string;
  description: string;
  connectedSystems: string[];
  authorityMode: AuthorityMode;
  outcome: string;
};

// A single illustrative day, showing that the five operational areas work
// together rather than in isolation. Not a real customer's operating data.
export const dayTimeline: DayTimelineMoment[] = [
  {
    time: "7:15 AM",
    title: "Start with one operational briefing.",
    description:
      "WorkforceOS summarizes schedule changes, open tasks, staffing risks, and overnight updates before the manager reaches the floor.",
    connectedSystems: ["Schedule", "Tasks", "Team updates"],
    authorityMode: "inform",
    outcome: "The manager starts with one briefing instead of checking multiple systems.",
  },
  {
    time: "11:52 AM",
    title: "See the issue and the response together.",
    description:
      "A sales signal and the current staffing plan indicate that coverage needs attention. WorkforceOS prepares the configured response and explains why.",
    connectedSystems: ["POS", "Labor", "Communication"],
    authorityMode: "recommend",
    outcome: "The manager can approve the response without manually reconciling sales, availability, and messages.",
  },
  {
    time: "10:45 PM",
    title: "End with a record, not a mental checklist.",
    description: "WorkforceOS compiles what changed, what was resolved, and what still needs attention tomorrow.",
    connectedSystems: ["Tasks", "Staffing", "Approvals"],
    authorityMode: "inform",
    outcome: "The day ends with a clear operational record.",
  },
];

// ---------------------------------------------------------------------------
// Insights and labor efficiency — qualitative only.
// ---------------------------------------------------------------------------

export type InsightExample = {
  question: string;
  connectedSignals: string;
  qualitativeFinding: string;
  possibleAction: string;
};

export const insightExamples: InsightExample[] = [
  {
    question: "Are labor decisions keeping up with demand?",
    connectedSignals: "Scheduled labor hours alongside POS sales activity, by shift.",
    qualitativeFinding: "Some shifts are staffed well above or below what recent demand for that day and time would suggest.",
    possibleAction: "Review staffing levels for the specific shifts where the gap shows up most.",
  },
  {
    question: "Where is manager time actually going?",
    connectedSignals: "Approval requests, exceptions, and manual schedule edits, by manager and location.",
    qualitativeFinding: "A small number of recurring exception types account for most manager interventions.",
    possibleAction: "Adjust the approval rules for that recurring exception type so it needs less manual attention.",
  },
  {
    question: "Which exceptions take longest to resolve?",
    connectedSignals: "Time between an exception being detected and being marked resolved.",
    qualitativeFinding: "Certain exception types consistently sit unresolved longer than others.",
    possibleAction: "Tighten the escalation timing for that exception type so it surfaces to a manager sooner.",
  },
];

// ---------------------------------------------------------------------------
// Configurable authority and trust.
// ---------------------------------------------------------------------------

export type AuthorityLevel = {
  key: AuthorityMode;
  title: string;
  description: string;
  example: string;
};

export const authorityLevels: AuthorityLevel[] = [
  {
    key: "inform",
    title: "Inform",
    description: "AI summarizes and alerts. Nothing changes without a manager acting on it.",
    example: "The morning briefing and the sales-vs-staffing flag are both inform-level — visibility, not action.",
  },
  {
    key: "recommend",
    title: "Recommend",
    description: "AI prepares an action and waits for approval before anything happens.",
    example: "A shift extension or a schedule swap gets prepared, then sits in the approval queue for a manager.",
  },
  {
    key: "execute",
    title: "Execute",
    description: "AI completes a pre-authorized routine action and reports the result.",
    example: "A low-stock prep task or a routine team notification can be configured to send without a manager step.",
  },
];

// ---------------------------------------------------------------------------
// Audience applications — the same operating layer, adapted per audience.
// ---------------------------------------------------------------------------

export type AudienceSegment = {
  slug: string;
  name: string;
  situation: string;
  /** Five concrete, recognizable traits of this operation's daily work — not generic industry-marketing language. */
  traits: string[];
  /** A short, specific workflow sequence — replaces a generic fade-up card with something that reads as this segment's actual day. */
  workflow: string[];
};

// "Who It's For" — concise operational situations rather than separate
// product pages. Reflects the actual go-to-market: teams staffed mostly by
// students and hourly workers, in that order per the current pilots.
export const audienceSegments: AudienceSegment[] = [
  {
    slug: "catering",
    name: "Catering and events",
    situation:
      "Every booking resets the operation — headcount, prep, and the roster all move together, not on a fixed weekly schedule.",
    traits: [
      "Event-based staffing",
      "Headcount changes",
      "Prep and inventory adjustments",
      "Last-minute replacement",
      "Event closeout",
    ],
    workflow: [
      "Event changes",
      "Staffing and prep update",
      "Available team identified",
      "Manager approves exceptions",
      "Affected team notified",
    ],
  },
  {
    slug: "restaurant-groups",
    name: "Restaurant groups",
    situation:
      "Sales, labor, and inventory move independently across locations, and opening and closing still have to run the same way every time.",
    traits: [
      "POS and labor context",
      "Call-outs and coverage",
      "Multi-location visibility",
      "Inventory and prep tasks",
      "Opening and closing consistency",
    ],
    workflow: [
      "Sales signal changes",
      "Staffing reviewed",
      "Coverage or task response prepared",
      "Manager approves when required",
      "Location record updated",
    ],
  },
  {
    slug: "campus-sports",
    name: "Campus sports and recreation",
    situation:
      "Student availability resets every quarter, and event or facility needs — including the emergency kind — still need a fast, approved response.",
    traits: [
      "Student availability",
      "Emergency scheduling",
      "Recurring event staffing",
      "Facility and program tasks",
      "Supervisor communication and approvals",
    ],
    workflow: [
      "Event or facility need appears",
      "Shift history provides context",
      "Emergency coverage prepared",
      "Supervisor approves",
      "Students and affected teams notified",
    ],
  },
];

// ---------------------------------------------------------------------------
// Implementation and control (FAQ).
// ---------------------------------------------------------------------------

export type ImplementationTopic = {
  question: string;
  answer: string;
};

// Answers the predictable buyer objections: existing processes, approvals,
// organizational rules, rollout, and human oversight. No integration claims
// beyond category-level, and no unverified vendor compatibility.
export const implementationControl: ImplementationTopic[] = [
  {
    question: "Does this replace how our managers make decisions?",
    answer:
      "No. WorkforceOS coordinates the workflows you configure — labor, inventory, tasks, communication — through an approval layer, so judgment calls still go to a person.",
  },
  {
    question: "Does it work with the systems we already use?",
    answer:
      "It's configured around your existing POS, scheduling, inventory, and communication systems rather than asking you to replace them. Integration scope depends on what you're running today.",
  },
  {
    question: "What decides which actions run automatically?",
    answer:
      "You do. Authority is configured per workflow and action — some things run automatically, sensitive decisions wait for approval — and you can change that boundary at any time.",
  },
  {
    question: "What do managers still control?",
    answer:
      "Managers set what needs their approval, see the context before approving anything, and can always step in — the authority layer is configurable, not fixed.",
  },
  {
    question: "What happens when no one's available to cover a shift?",
    answer:
      "WorkforceOS notifies the manager that no replacement was found, rather than leaving the shift silently uncovered — the decision on what to do next stays with a person.",
  },
];

export const locationBands = ["1 location", "2–5 locations", "6–20 locations", "20+ locations"] as const;

export const hourlyEmployeeBands = [
  "Fewer than 25",
  "25–100",
  "101–500",
  "500+",
] as const;

// Expanded to match the five operating pillars plus cross-system reporting
// and a custom-workflow catch-all.
export const frictionWorkflows = [
  { value: "labor", label: "Labor and staffing" },
  { value: "sales-pos", label: "Sales / POS visibility" },
  { value: "inventory", label: "Inventory operations" },
  { value: "tasks", label: "Tasks and execution" },
  { value: "communication", label: "Communication and approvals" },
  { value: "reporting", label: "Cross-system reporting" },
  { value: "other", label: "Custom workflow" },
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

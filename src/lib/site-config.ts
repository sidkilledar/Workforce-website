export const siteConfig = {
  name: "Workforce OS",
  tagline: "Your operations should run themselves.",
  description:
    "Workforce OS is an AI operations manager for frontline businesses. It learns how your organization runs, forecasts staffing and labor needs, builds smarter schedules, fills coverage gaps, and handles the repetitive work that slows managers down.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.workforceos.com",
  ogImage: "/og-image.png",
  email: "hello@workforceos.com",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Product", href: "/product" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

export const ctaNav: NavLink = { label: "Book a Demo", href: "/demo" };

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/demo" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "All industries", href: "/industries" },
      { label: "Restaurants", href: "/industries/restaurants" },
      { label: "Multi-location chains", href: "/industries/chains" },
      { label: "Catering", href: "/industries/catering" },
      { label: "College campuses", href: "/industries/campuses" },
      { label: "Other shift-based teams", href: "/industries/other" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Book a Demo", href: "/demo" },
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
      "Workforce OS reads demand patterns, seasonality, and upcoming events to forecast staffing and labor needs by location and daypart, before a single shift is scheduled.",
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
      "When a gap opens up, Workforce OS identifies who's qualified and available, coordinates outreach automatically, and keeps the manager informed until it's resolved.",
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
      "Workforce OS notices what's late, missing, or unresolved — an unconfirmed shift, a stalled approval, an incomplete task — and moves it forward automatically.",
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
      "Workforce OS forecasts demand by daypart, builds the week around it, and fills coverage gaps before they hit the floor — so independent restaurants run on a plan instead of a scramble.",
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
      "Workforce OS gives multi-location operators one consistent operating layer across every site — while leaving room for each location's manager, team, and local conditions.",
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
      "Catering labor needs change event to event. Workforce OS turns event scope into a staffing plan, keeps a flexible roster ready, and adapts fast when details change.",
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
      "Campus operations run on an academic calendar full of exceptions. Workforce OS plans around semester schedules, student availability, and campus events across every hourly team.",
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
    summary: "Adapt Workforce OS to the operating rules, roles, and scheduling patterns of the organization.",
    heroDescription:
      "If your team runs on shifts, not salaries, Workforce OS applies the same forecasting, scheduling, and coverage engine to your operation — configured around how you actually run.",
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
        description: "Every part of Workforce OS is designed around the realities of hourly, shift-based operations.",
      },
    ],
    tint: "cobalt",
  },
];

export type TimelineEvent = {
  time: string;
  event: string;
};

export const operationalTimeline: TimelineEvent[] = [
  { time: "6:10 AM", event: "Employee calls out" },
  { time: "7:30 AM", event: "Demand forecast changes" },
  { time: "9:15 AM", event: "Coverage gap detected" },
  { time: "11:40 AM", event: "Manager waiting on approval" },
  { time: "2:00 PM", event: "Closing task still unassigned" },
];

export type HowItWorksStage = {
  number: string;
  title: string;
  description: string;
};

export const howItWorksStages: HowItWorksStage[] = [
  {
    number: "01",
    title: "Learn",
    description:
      "Workforce OS learns how your organization schedules, communicates, approves requests, and responds to change.",
  },
  {
    number: "02",
    title: "Forecast",
    description: "It anticipates staffing and labor needs before schedules are built.",
  },
  {
    number: "03",
    title: "Coordinate",
    description: "Schedules, coverage, tasks, approvals, and team communication stay connected.",
  },
  {
    number: "04",
    title: "Act",
    description: "Repetitive workflows are handled automatically. Managers step in only when judgment is needed.",
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
    title: "Understand",
    description: "Map the organization's locations, roles, scheduling process, and operating rules.",
  },
  {
    number: "02",
    title: "Configure",
    description: "Connect Workforce OS to the workflows and systems the team already uses.",
  },
  {
    number: "03",
    title: "Pilot",
    description: "Launch with a focused group, location, or operational workflow.",
  },
  {
    number: "04",
    title: "Expand",
    description: "Extend successful workflows across more teams and locations.",
  },
];

export const managerPrompts: string[] = [
  "Who can cover tonight's closing shift?",
  "Build next week's schedule around forecast demand.",
  "Which locations are at risk of overtime?",
  "Follow up on incomplete opening tasks.",
  "Notify the team about tomorrow's updated hours.",
];

export type ScenarioKey = "normal" | "spike";

export type ScenarioData = {
  label: string;
  description: string;
  forecastDemand: string;
  staffingHours: string;
  coverageRisk: string;
  suggestedAdjustment: string;
  recommendation: string;
};

// All figures below are illustrative examples for demonstration purposes only,
// not real customer results.
export const scenarios: Record<ScenarioKey, ScenarioData> = {
  normal: {
    label: "Normal weekday",
    description: "Typical Tuesday. Steady lunch and dinner service, full staff availability.",
    forecastDemand: "Baseline",
    staffingHours: "142 hrs",
    coverageRisk: "Low",
    suggestedAdjustment: "No changes needed",
    recommendation: "Schedule is balanced. No action required.",
  },
  spike: {
    label: "Demand spike + 2 call-outs",
    description: "Unexpected local event drives demand up. Two line cooks call out for dinner service.",
    forecastDemand: "+38% vs. baseline",
    staffingHours: "168 hrs",
    coverageRisk: "High — dinner service",
    suggestedAdjustment: "Add 2 line cooks, 5:00–10:00 PM",
    recommendation: "2 qualified staff identified and available. Approve outreach to cover dinner service.",
  },
};

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
};

// Empty until customer names, logos, testimonials, and written publication
// approval are supplied. The pilot-stage trust section renders the
// placeholder testing-phase message while this stays empty.
export const customerProof: CustomerProofItem[] = [];

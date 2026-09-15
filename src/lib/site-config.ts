const DEFAULT_SITE_URL = "https://www.workforceos.com";

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
  tagline: "Operational intelligence and execution for frontline businesses",
  description:
    "WorkforceOS connects systems, understands operational signals, and coordinates people to complete work. Operational intelligence and execution for frontline businesses, configured around your rules and manager approvals.",
  url: resolveSiteUrl(),
  ogImage: "/opengraph-image",
  email: "hello@workforceos.com",
} as const;

export const pilotCustomers = [
  "Olive & Vine",
  "Mylapore",
  "UC Davis Rec Sports",
] as const;

export type NavLink = {
  label: string;
  href: string;
};

export const sectionIds = {
  hero: "hero",
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
} as const;

export const navAnchors: NavLink[] = [
  { label: "Platform", href: `#${sectionIds.capabilities}` },
  { label: "Workflows", href: `#${sectionIds.howItWorks}` },
  { label: "Integrations", href: `#${sectionIds.connected}` },
  { label: "Results", href: `#${sectionIds.proof}` },
];

export const ctaCopy = {
  primary: "Request a Demo",
  secondary: "See it resolve a call-out",
} as const;

export const ctaNav: NavLink = { label: ctaCopy.primary, href: "/demo" };

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: navAnchors.map((link) => ({ ...link, href: `/${link.href}` })),
  },
];

export type ImplementationTopic = {
  question: string;
  answer: string;
};

export const implementationControl: ImplementationTopic[] = [
  {
    question:
      "We already have a scheduling app and a group chat — why is this different?",
    answer:
      "WorkforceOS connects the schedule, availability, and operational messages to a managed response. It coordinates coverage and records the result, using the systems and approval rules confirmed during setup.",
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

export const locationBands = [
  "1 location",
  "2–5 locations",
  "6–20 locations",
  "20+ locations",
] as const;

export const hourlyEmployeeBands = [
  "Fewer than 25",
  "25–100",
  "101–500",
  "500+",
] as const;

export const frictionWorkflows = [
  { value: "scheduling", label: "Building or filling schedules" },
  { value: "call-outs", label: "Call-outs and emergency coverage" },
  { value: "availability", label: "Staff availability" },
  { value: "shift-changes", label: "Shift changes and approvals" },
  { value: "communication", label: "Team communication" },
  { value: "tasks", label: "Unfinished tasks or handoffs" },
  { value: "forecasting", label: "Demand and labor forecasting" },
  { value: "inventory", label: "Inventory and replenishment" },
  { value: "other", label: "Another recurring workflow" },
] as const;

export const demoIndustries = [
  { value: "catering", label: "Catering and event staffing" },
  { value: "restaurant-groups", label: "Restaurant group" },
  { value: "campus-sports", label: "Campus sports and recreation" },
  { value: "other", label: "Another shift-based team" },
] as const;

export type ProofCard = {
  name: string;
  context: string;
  result: string;
  note: string;
};

export const proofSection = {
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
      result:
        "Reports hours saved on scheduling and coverage each week, across all 12 locations",
      note: "Supported workflow — scheduling, coverage, WhatsApp shift updates, and labor forecasting",
    },
    {
      name: "UC Davis Rec Sports",
      context: "Student-powered campus operations",
      result:
        "Reports easier scheduling, communication, and emergency coverage",
      note: "WorkforceOS learns how their recurring events are staffed from shift history",
    },
  ] satisfies ProofCard[],
} as const;

export const footerContent = {
  descriptor:
    "Operational intelligence and execution for frontline businesses.",
  legalLine:
    "Built with active pilots in restaurants, catering, and campus recreation.",
  legalLinks: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ] satisfies NavLink[],
} as const;

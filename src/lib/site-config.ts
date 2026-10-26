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
  name: "Straw",
  tagline: "The AI assistant manager for frontline operations",
  description:
    "Straw is an AI assistant manager for frontline businesses. Use its built-in tools, connect the systems you already use, or combine both. It remembers how your organization works and helps run scheduling, communication, inventory, forecasting, and tasks, in the app, iMessage, or WhatsApp.",
  url: resolveSiteUrl(),
  ogImage: "/opengraph-image",
  email: "hello@workforceos.com",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const sectionIds = {
  product: "product",
  industries: "industries",
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
  { label: "Product", href: `#${sectionIds.product}` },
  { label: "Industries", href: `#${sectionIds.industries}` },
  { label: "How it works", href: `#${sectionIds.howItWorks}` },
];

export const ctaCopy = {
  primary: "Book a personalized demo",
  secondary: "Explore Straw",
} as const;

export const ctaNav: NavLink = { label: ctaCopy.primary, href: "/demo" };

export const secondaryCtaNav: NavLink = {
  label: ctaCopy.secondary,
  href: `/#${sectionIds.product}`,
};

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: navAnchors.map((link) => ({ ...link, href: `/${link.href}` })),
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

export const integrationCopy =
  "Use Straw's built-in tools, connect the systems you already use, or combine both. We assess compatibility and any custom requirements during setup.";

export const footerContent = {
  descriptor:
    "The assistant manager for restaurants, catering, and campus operations.",
  legalLine: "Built for restaurants, catering, and campus teams.",
  legalLinks: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ] satisfies NavLink[],
} as const;

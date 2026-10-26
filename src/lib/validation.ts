import { z } from "zod";
import { demoIndustries, frictionWorkflows, hourlyEmployeeBands, locationBands } from "@/lib/site-config";

const industrySlugs = demoIndustries.map((industry) => industry.value) as [
  string,
  ...string[],
];

const frictionWorkflowValues = frictionWorkflows.map((item) => item.value) as [
  string,
  ...string[],
];

export const demoRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .email("Enter a valid email address."),
  company: z
    .string()
    .trim()
    .min(2, "Enter your organization name.")
    .max(160, "Organization name is too long."),
  // Organization type and what the visitor wants help with are required
  // qualification context; everything else below is optional. "" is the
  // "not answered" value from an unset <select>.
  industry: z.enum(industrySlugs, { message: "Choose your organization type." }),
  workflowExample: z
    .string()
    .trim()
    .min(10, "Tell us a little about what you'd like Straw to help with.")
    .max(600, "Keep this under 600 characters."),
  role: z
    .string()
    .trim()
    .max(120, "Role is too long.")
    .optional()
    .or(z.literal("")),
  locations: z.enum(locationBands).optional().or(z.literal("")),
  hourlyEmployees: z.enum(hourlyEmployeeBands).optional().or(z.literal("")),
  frictionWorkflow: z.enum(frictionWorkflowValues).optional().or(z.literal("")),
  // Optional context: supported integrations aren't publicly confirmed yet,
  // so this stays free text rather than a fixed system list.
  currentTools: z
    .string()
    .trim()
    .max(300, "Keep this under 300 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long.")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((value) => value === true, "Please confirm to continue."),
  // Honeypot field — real users never fill this in. Left unvalidated so a
  // filled value doesn't surface as a form error; the API route uses it to
  // silently drop bot submissions instead.
  company_website: z.string().optional().or(z.literal("")),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;

// Form state allows an unanswered organization type before submission.
export type DemoFormValues = Omit<DemoRequestInput, "industry"> & {
  industry: DemoRequestInput["industry"] | "";
};

/**
 * Returns a safe external URL from configuration, or null when it is unset or
 * unusable. Only https URLs without embedded credentials pass.
 */
function parseHttpsUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || !url.hostname) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

/** Calendar link shown after a demo request; never combined with form data. */
export const parseBookingUrl = parseHttpsUrl;

/** Customer app URL (NEXT_PUBLIC_APP_URL); the header login link needs it. */
export const parseAppUrl = parseHttpsUrl;

export const demoRequestDefaultValues: DemoFormValues = {
  name: "",
  email: "",
  company: "",
  role: "",
  industry: "",
  locations: "",
  hourlyEmployees: "",
  frictionWorkflow: "",
  currentTools: "",
  workflowExample: "",
  message: "",
  consent: false,
  company_website: "",
};

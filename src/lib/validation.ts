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
    .min(2, "Enter your company name.")
    .max(160, "Company name is too long."),
  // Everything below is optional qualification context. The form asks only
  // name, work email, and company up front; the rest is collected optionally
  // or in follow-up. "" is the "not answered" value from an unset <select>.
  role: z
    .string()
    .trim()
    .max(120, "Role is too long.")
    .optional()
    .or(z.literal("")),
  industry: z.enum(industrySlugs).optional().or(z.literal("")),
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
  workflowExample: z
    .string()
    .trim()
    .max(600, "Keep this under 600 characters.")
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

export const demoRequestDefaultValues: DemoRequestInput = {
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

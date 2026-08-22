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
  phone: z
    .string()
    .trim()
    .max(32, "Phone number is too long.")
    .refine(
      (value) => value === "" || (/^[0-9()+\-.\s]+$/.test(value) && value.length >= 7),
      "Enter a valid phone number or leave it blank.",
    ),
  company: z
    .string()
    .trim()
    .min(2, "Enter your company name.")
    .max(160, "Company name is too long."),
  industry: z.enum(industrySlugs, {
    message: "Select the closest match for your industry.",
  }),
  locations: z.enum(locationBands, {
    message: "Select the number of locations.",
  }),
  hourlyEmployees: z.enum(hourlyEmployeeBands, {
    message: "Select the approximate number of hourly employees.",
  }),
  frictionWorkflow: z.enum(frictionWorkflowValues, {
    message: "Select the workflow creating the most friction.",
  }),
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
  phone: "",
  company: "",
  industry: demoIndustries[0].value as DemoRequestInput["industry"],
  locations: locationBands[0],
  hourlyEmployees: hourlyEmployeeBands[0],
  frictionWorkflow: frictionWorkflows[0].value,
  message: "",
  consent: false,
  company_website: "",
};

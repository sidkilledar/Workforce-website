"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  demoRequestDefaultValues,
  demoRequestSchema,
  type DemoRequestInput,
} from "@/lib/validation";
import { frictionWorkflows, hourlyEmployeeBands, industries, locationBands } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<keyof DemoRequestInput, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-[3px] border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors focus:border-[var(--color-signal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-signal)]/20";

const labelClasses = "text-sm font-medium text-[var(--color-text-primary)]";

export function DemoForm() {
  const [values, setValues] = useState<DemoRequestInput>(demoRequestDefaultValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  function updateField<K extends keyof DemoRequestInput>(key: K, value: DemoRequestInput[K]) {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent("demo_form_start");
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setServerMessage(null);

    const parsed = demoRequestSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof DemoRequestInput | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload = await response.json().catch(() => null);

      if (response.status === 429) {
        setStatus("error");
        setServerMessage(
          payload?.message ?? "You've submitted a few requests already — please try again shortly.",
        );
        trackEvent("demo_form_submit_error", { reason: "rate_limited" });
        return;
      }

      if (!response.ok) {
        if (payload?.fieldErrors) {
          setErrors(payload.fieldErrors);
        }
        setStatus("error");
        setServerMessage(
          payload?.message ?? "Something went wrong submitting your request. Please try again.",
        );
        trackEvent("demo_form_submit_error", { reason: "server_error" });
        return;
      }

      setStatus("success");
      trackEvent("demo_form_submit_success");
    } catch {
      setStatus("error");
      setServerMessage("Something went wrong submitting your request. Please try again.");
      trackEvent("demo_form_submit_error", { reason: "network_error" });
    }
  }

  if (status === "success") {
    return (
      <div className="ticket-slip p-10 text-center sm:p-14" role="status">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-signal-soft)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="var(--color-signal-strong)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-display mt-5 text-2xl font-semibold text-[var(--color-text-primary)] sm:text-3xl">
          Request received
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]">
          Thanks — we&apos;ve got your request and sent a confirmation to{" "}
          <span className="text-[var(--color-text-primary)]">{values.email}</span>. Our team will reach out
          shortly to find a time that works.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(demoRequestDefaultValues);
            setStatus("idle");
            hasStartedRef.current = false;
          }}
          className="mt-6 text-sm font-medium text-[var(--color-signal-strong)] hover:text-[var(--color-signal)]"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="ticket-slip p-6 sm:p-10">
      <form noValidate onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="space-y-6">
          <legend className="label-mono text-[var(--color-signal-strong)]">About You</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" htmlFor="name" error={errors.name}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                className={inputClasses}
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </Field>

            <Field label="Work email" htmlFor="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputClasses}
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </Field>

            <Field label="Phone number" htmlFor="phone" error={errors.phone}>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={inputClasses}
                value={values.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
            </Field>

            <Field label="Company" htmlFor="company" error={errors.company}>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                className={inputClasses}
                value={values.company}
                onChange={(event) => updateField("company", event.target.value)}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "company-error" : undefined}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="label-mono text-[var(--color-signal-strong)]">About Your Operation</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Industry" htmlFor="industry" error={errors.industry}>
              <select
                id="industry"
                name="industry"
                className={inputClasses}
                value={values.industry}
                onChange={(event) =>
                  updateField("industry", event.target.value as DemoRequestInput["industry"])
                }
              >
                {industries.map((industry) => (
                  <option key={industry.slug} value={industry.slug}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Number of locations" htmlFor="locations" error={errors.locations}>
              <select
                id="locations"
                name="locations"
                className={inputClasses}
                value={values.locations}
                onChange={(event) =>
                  updateField("locations", event.target.value as DemoRequestInput["locations"])
                }
              >
                {locationBands.map((band) => (
                  <option key={band} value={band}>
                    {band}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Approximate hourly employees"
              htmlFor="hourlyEmployees"
              error={errors.hourlyEmployees}
            >
              <select
                id="hourlyEmployees"
                name="hourlyEmployees"
                className={inputClasses}
                value={values.hourlyEmployees}
                onChange={(event) =>
                  updateField(
                    "hourlyEmployees",
                    event.target.value as DemoRequestInput["hourlyEmployees"],
                  )
                }
              >
                {hourlyEmployeeBands.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="What creates the most friction?"
              htmlFor="frictionWorkflow"
              error={errors.frictionWorkflow}
            >
              <select
                id="frictionWorkflow"
                name="frictionWorkflow"
                className={inputClasses}
                value={values.frictionWorkflow}
                onChange={(event) =>
                  updateField(
                    "frictionWorkflow",
                    event.target.value as DemoRequestInput["frictionWorkflow"],
                  )
                }
              >
                {frictionWorkflows.map((workflow) => (
                  <option key={workflow.value} value={workflow.value}>
                    {workflow.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Optional message" htmlFor="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={inputClasses}
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
            />
          </Field>
        </fieldset>

        {/* Honeypot field — hidden from real users, only bots fill this in. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={values.company_website}
            onChange={(event) => updateField("company_website", event.target.value)}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-canvas-elevated)] accent-[var(--color-signal)]"
            checked={values.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            I agree to be contacted about WorkforceOS and have read the{" "}
            <Link href="/legal/privacy" className="text-[var(--color-text-primary)] underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="text-sm text-red-600">
            {errors.consent}
          </p>
        )}

        {status === "error" && serverMessage && (
          <p role="alert" className="rounded-[3px] bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverMessage}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request a Demo"}
        </Button>

        <p className="text-center text-xs text-[var(--color-text-muted)]">
          Your information is used only to prepare and schedule your demo. We never sell
          or share it with third parties.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClasses}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

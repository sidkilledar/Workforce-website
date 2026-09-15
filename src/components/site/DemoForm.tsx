"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  demoRequestDefaultValues,
  demoRequestSchema,
  type DemoRequestInput,
} from "@/lib/validation";
import {
  demoIndustries,
  frictionWorkflows,
  hourlyEmployeeBands,
  locationBands,
} from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<keyof DemoRequestInput, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

// focus:border uses signal-strong, not the brighter signal — against the
// input's light background, bright signal fails the WCAG 3:1 non-text
// contrast minimum for a focus indicator (~2.8:1); signal-strong clears it.
const inputClasses =
  "w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-canvas-elevated)] px-4 py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors focus:border-[var(--color-signal-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-signal)]/20";

const labelClasses = "text-sm font-medium text-[var(--color-text-primary)]";

export function DemoForm() {
  const [values, setValues] = useState<DemoRequestInput>(
    demoRequestDefaultValues,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const hasStartedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Focus the first invalid field after validation fails — client-side or
  // server-side — so keyboard/screen-reader users land where the problem is
  // instead of an unchanged focus position.
  useEffect(() => {
    const firstErrorKey = Object.keys(errors)[0];
    if (!firstErrorKey || !formRef.current) return;
    const field = formRef.current.elements.namedItem(
      firstErrorKey,
    ) as HTMLElement | null;
    const context = field?.closest("details");
    if (context) context.open = true;
    field?.focus();
  }, [errors]);

  // Move focus to the confirmation heading on success, so screen-reader
  // users hear the outcome rather than nothing changing.
  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function updateField<K extends keyof DemoRequestInput>(
    key: K,
    value: DemoRequestInput[K],
  ) {
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
          payload?.message ??
            "You've submitted a few requests already. Please try again shortly.",
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
          payload?.message ??
            "Something went wrong submitting your request. Please try again.",
        );
        trackEvent("demo_form_submit_error", { reason: "server_error" });
        return;
      }

      setStatus("success");
      trackEvent("demo_form_complete");
    } catch {
      setStatus("error");
      setServerMessage(
        "Something went wrong submitting your request. Please try again.",
      );
      trackEvent("demo_form_submit_error", { reason: "network_error" });
    }
  }

  if (status === "success") {
    return (
      <div
        className="ticket-slip animate-confirm-in p-10 text-center sm:p-14"
        role="status"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-signal-soft)]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="var(--color-signal-strong)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-display mt-5 text-2xl font-semibold text-[var(--color-text-primary)] outline-none sm:text-3xl"
        >
          Request received
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]">
          Thanks. We&apos;ve received your request. Our team will contact you at{" "}
          <span className="text-[var(--color-text-primary)]">
            {values.email}
          </span>{" "}
          to find a time that works. This is a request for contact, not a booked
          appointment.
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
    <div className="demo-form-surface">
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <fieldset className="space-y-6">
          <legend className="label-mono text-[var(--color-signal-strong)]">
            About you
          </legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name *" htmlFor="name" error={errors.name}>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className={inputClasses}
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </Field>

            <Field label="Work email *" htmlFor="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClasses}
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </Field>

            <Field
              label="Company *"
              htmlFor="company"
              error={errors.company}
              className="sm:col-span-2"
            >
              <input
                id="company"
                name="company"
                required
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

        <Field
          label="Operational problem (optional)"
          htmlFor="workflowExample"
          error={errors.workflowExample}
        >
          <textarea
            id="workflowExample"
            name="workflowExample"
            rows={3}
            className={inputClasses}
            placeholder="What recurring problem would you like to solve?"
            value={values.workflowExample}
            onChange={(event) =>
              updateField("workflowExample", event.target.value)
            }
            aria-invalid={Boolean(errors.workflowExample)}
            aria-describedby={
              errors.workflowExample
                ? "workflowExample-error workflowExample-helper"
                : "workflowExample-helper"
            }
          />
          <p
            id="workflowExample-helper"
            className="mt-1.5 text-xs text-[var(--color-text-muted)]"
          >
            A few sentences are enough. Do not include sensitive employee
            information.
          </p>
        </Field>

        <Field
          label="Current tools (optional)"
          htmlFor="currentTools"
          error={errors.currentTools}
        >
          <input
            id="currentTools"
            name="currentTools"
            className={inputClasses}
            placeholder="Scheduling software, spreadsheets, POS, or other tools"
            value={values.currentTools}
            onChange={(event) =>
              updateField("currentTools", event.target.value)
            }
            aria-invalid={Boolean(errors.currentTools)}
            aria-describedby={
              errors.currentTools ? "currentTools-error" : undefined
            }
          />
        </Field>

        <details className="demo-more-context">
          <summary className="cursor-pointer py-3 text-sm font-semibold text-[var(--color-signal-strong)]">
            Add more context
          </summary>
          <div className="space-y-6 pt-4">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Role or job title"
                htmlFor="role"
                error={errors.role}
              >
                <input
                  id="role"
                  name="role"
                  autoComplete="organization-title"
                  className={inputClasses}
                  value={values.role}
                  onChange={(event) => updateField("role", event.target.value)}
                  aria-invalid={Boolean(errors.role)}
                  aria-describedby={errors.role ? "role-error" : undefined}
                />
              </Field>

              <Field
                label="Industry"
                htmlFor="industry"
                error={errors.industry}
              >
                <select
                  id="industry"
                  name="industry"
                  aria-invalid={Boolean(errors.industry)}
                  aria-describedby={errors.industry ? "industry-error" : undefined}
                  className={inputClasses}
                  value={values.industry}
                  onChange={(event) =>
                    updateField(
                      "industry",
                      event.target.value as DemoRequestInput["industry"],
                    )
                  }
                >
                  <option value="">Select an industry</option>
                  {demoIndustries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Number of locations"
                htmlFor="locations"
                error={errors.locations}
              >
                <select
                  id="locations"
                  name="locations"
                  aria-invalid={Boolean(errors.locations)}
                  aria-describedby={errors.locations ? "locations-error" : undefined}
                  className={inputClasses}
                  value={values.locations}
                  onChange={(event) =>
                    updateField(
                      "locations",
                      event.target.value as DemoRequestInput["locations"],
                    )
                  }
                >
                  <option value="">Select a range</option>
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
                  aria-invalid={Boolean(errors.hourlyEmployees)}
                  aria-describedby={errors.hourlyEmployees ? "hourlyEmployees-error" : undefined}
                  className={inputClasses}
                  value={values.hourlyEmployees}
                  onChange={(event) =>
                    updateField(
                      "hourlyEmployees",
                      event.target.value as DemoRequestInput["hourlyEmployees"],
                    )
                  }
                >
                  <option value="">Select a range</option>
                  {hourlyEmployeeBands.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Which workflow consumes the most manager time?"
                htmlFor="frictionWorkflow"
                error={errors.frictionWorkflow}
                className="sm:col-span-2"
              >
                <select
                  id="frictionWorkflow"
                  name="frictionWorkflow"
                  aria-invalid={Boolean(errors.frictionWorkflow)}
                  aria-describedby={errors.frictionWorkflow ? "frictionWorkflow-error" : undefined}
                  className={inputClasses}
                  value={values.frictionWorkflow}
                  onChange={(event) => {
                    const value = event.target
                      .value as DemoRequestInput["frictionWorkflow"];
                    updateField("frictionWorkflow", value);
                    if (value)
                      trackEvent("demo_friction_workflow_select", {
                        workflow: value,
                      });
                  }}
                >
                  <option value="">Select a workflow</option>
                  {frictionWorkflows.map((workflow) => (
                    <option key={workflow.value} value={workflow.value}>
                      {workflow.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field
              label="Optional message"
              htmlFor="message"
              error={errors.message}
            >
              <textarea
                id="message"
                name="message"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                rows={4}
                className={inputClasses}
                value={values.message}
                onChange={(event) => updateField("message", event.target.value)}
              />
            </Field>
          </div>
        </details>

        {/* Honeypot field — hidden from real users, only bots fill this in. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={values.company_website}
            onChange={(event) =>
              updateField("company_website", event.target.value)
            }
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-canvas-elevated)] accent-[var(--color-signal)]"
            checked={values.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <label
            htmlFor="consent"
            className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
          >
            I agree to be contacted about WorkforceOS and have read the{" "}
            <Link
              href="/legal/privacy"
              className="text-[var(--color-text-primary)] underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p
            id="consent-error"
            className="text-sm text-[var(--color-signal-strong)]"
          >
            {errors.consent}
          </p>
        )}

        {status === "error" && serverMessage && (
          <p
            role="alert"
            className="rounded-[3px] bg-[var(--color-signal-soft)] px-4 py-3 text-sm text-[var(--color-signal-strong)]"
          >
            {serverMessage}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Request a Demo"}
        </Button>

        <p className="text-center text-xs text-[var(--color-text-muted)]">
          Fields marked * are required. We use this information to prepare and
          schedule your walkthrough.
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
        <p
          id={`${htmlFor}-error`}
          className="mt-1.5 text-sm text-[var(--color-signal-strong)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

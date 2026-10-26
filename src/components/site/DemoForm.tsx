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
  type DemoFormValues as DemoRequestInput,
} from "@/lib/validation";
import {
  frictionWorkflows,
  hourlyEmployeeBands,
  locationBands,
} from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<keyof DemoRequestInput, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClasses = "straw-input";

const labelClasses = "straw-label";

// Values match the existing industry slugs so the API shape is unchanged.
const organizationTypes = [
  { value: "restaurant-groups", label: "Restaurants and cafés" },
  { value: "catering", label: "Catering and events" },
  { value: "campus-sports", label: "Campus departments and recreation" },
  { value: "other", label: "Other" },
] as const;

export function DemoForm({ bookingUrl }: { bookingUrl?: string | null }) {
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
        className="straw-confirmation"
        role="status"
      >
        <h2 ref={successHeadingRef} tabIndex={-1}>
          {bookingUrl ? "Your context has been sent" : "Request received"}
        </h2>
        {bookingUrl ? (
          <>
            <p>
              Your context has been sent. Choose a meeting time to complete
              your booking.
            </p>
            <a
              className="straw-button"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Choose a meeting time
            </a>
            <p className="straw-note">
              Your meeting is not booked until you pick a time on the calendar.
            </p>
          </>
        ) : (
          <p>
            Thanks. We&apos;ve received your request. Our team will contact you
            at <strong>{values.email}</strong> to find a time that works. This
            is a request for contact, not a booked appointment.
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setValues(demoRequestDefaultValues);
            setStatus("idle");
            hasStartedRef.current = false;
          }}
          className="straw-link-button"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="straw-form-surface">
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="straw-form"
      >
        <fieldset className="straw-fieldset">
          <legend>About you and your operation</legend>
          <div className="straw-grid">
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
              label="Organization *"
              htmlFor="company"
              error={errors.company}
              className="straw-span"
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

            <Field
              label="Organization type *"
              htmlFor="industry"
              error={errors.industry}
            >
              <select
                id="industry"
                name="industry"
                required
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
                <option value="">Select a type</option>
                {organizationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Team size"
              htmlFor="hourlyEmployees"
              error={errors.hourlyEmployees}
            >
              <select
                id="hourlyEmployees"
                name="hourlyEmployees"
                aria-invalid={Boolean(errors.hourlyEmployees)}
                aria-describedby={
                  errors.hourlyEmployees ? "hourlyEmployees-error" : undefined
                }
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
          </div>
        </fieldset>

        <Field
          label="What would you like Straw to help with? *"
          htmlFor="workflowExample"
          error={errors.workflowExample}
        >
          <textarea
            id="workflowExample"
            name="workflowExample"
            rows={4}
            required
            className={inputClasses}
            placeholder="A recurring task, a handoff that slips, a question you answer every day…"
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
          <p id="workflowExample-helper" className="straw-helper">
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
          <summary>
            Add more context
          </summary>
          <div className="straw-details-body">
            <div className="straw-grid">
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
                className="straw-span"
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
        <div className="straw-honeypot" aria-hidden="true">
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

        <div className="straw-consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <label
            htmlFor="consent"
          >
            I agree to be contacted about Straw and have read the{" "}
            <Link
              href="/legal/privacy"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p
            id="consent-error"
            className="straw-error"
          >
            {errors.consent}
          </p>
        )}

        {status === "error" && serverMessage && (
          <p
            role="alert"
            className="straw-alert"
          >
            {serverMessage}
          </p>
        )}

        <button
          type="submit"
          className="straw-submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send context"}
        </button>

        <p className="straw-note">
          Fields marked * are required. We use this information to prepare your
          walkthrough. You&apos;ll choose a meeting time after you submit.
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
      <div className="straw-control">{children}</div>
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="straw-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

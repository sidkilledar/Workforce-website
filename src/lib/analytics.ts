export type AnalyticsEventName =
  | "demo_cta_click"
  | "hero_preview_approval"
  | "workflow_engagement"
  | "integration_engagement"
  | "customer_proof_engagement"
  | "industry_cta_click"
  | "demo_form_start"
  | "demo_form_submit_success"
  | "demo_form_submit_error";

type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsProperties }) => void;
    umami?: { track: (event: string, props?: AnalyticsProperties) => void };
    dataLayer?: unknown[];
  }
}

/**
 * Provider-agnostic analytics hook. Wire in Plausible, Umami, GA4, or a
 * custom endpoint by filling in the branch for NEXT_PUBLIC_ANALYTICS_PROVIDER.
 * No-ops safely when no provider is configured or on the server.
 */
export function trackEvent(event: AnalyticsEventName, properties?: AnalyticsProperties) {
  if (typeof window === "undefined") return;

  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

  try {
    switch (provider) {
      case "plausible":
        window.plausible?.(event, properties ? { props: properties } : undefined);
        break;
      case "umami":
        window.umami?.track(event, properties);
        break;
      case "gtag":
        window.dataLayer?.push({ event, ...properties });
        break;
      default:
        if (process.env.NODE_ENV === "development") {
          console.debug("[analytics]", event, properties ?? {});
        }
    }
  } catch {
    // Analytics should never break the UI.
  }
}

import type { ReactElement, ReactNode, SVGProps } from "react";
import type { CapabilityIcon } from "@/lib/site-config";

/**
 * Shared inline SVGs for the green-layout Features section and Hero decor.
 * Line icons use a 24px viewBox, stroke="currentColor", stroke-width 1.5,
 * round caps/joins — set the color via a `text-*` class on the element.
 */

type IconProps = SVGProps<SVGSVGElement>;

function LineIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Call-outs & no-shows — a coverage swap. */
export function ExceptionsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M16 3l4 4-4 4" />
      <path d="M20 7H10a4 4 0 0 0-4 4" />
      <path d="M8 21l-4-4 4-4" />
      <path d="M4 17h10a4 4 0 0 0 4-4" />
    </LineIcon>
  );
}

/** Scheduling & staffing — a calendar. */
export function SchedulingIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M8 2.5v4" />
      <path d="M16 2.5v4" />
      <path d="M8 13.5h3" />
      <path d="M8 17h6" />
    </LineIcon>
  );
}

/** One communication channel — a message attached to its shift. */
export function CommunicationIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M20 15a2 2 0 0 1-2 2H8l-4 3.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
      <path d="M8 9.5h8" />
      <path d="M8 13h5" />
    </LineIcon>
  );
}

/** Labor forecasting — a rising trend line with an arrowhead. */
export function ForecastingIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 17l5-5 3.5 3.5L20 7" />
      <path d="M15 7h5v5" />
    </LineIcon>
  );
}

/** Inventory tracking — stacked boxes. */
export function InventoryIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
      <rect x="8" y="3" width="8" height="8" rx="1" />
    </LineIcon>
  );
}

/** Operational workflows — branching nodes. */
export function WorkflowsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M6 8.5v3a2 2 0 0 0 2 2h2.5" />
      <path d="M18 8.5v3a2 2 0 0 1-2 2h-2.5" />
      <path d="M12 13.5v2" />
    </LineIcon>
  );
}

export const featureIcons: Record<CapabilityIcon, (props: IconProps) => ReactElement> = {
  scheduling: SchedulingIcon,
  exceptions: ExceptionsIcon,
  communication: CommunicationIcon,
  forecasting: ForecastingIcon,
  inventory: InventoryIcon,
  workflows: WorkflowsIcon,
};

/** 14px bullet chip — sage circle behind a check mark. Matches wf1_features.json. */
export function CheckChip(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
      <circle cx="7" cy="7" r="7" fill="#697d71" fillOpacity={0.1} />
      <path
        d="M4 7l2 2 4-4"
        stroke="#697d71"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Play glyph in a ring — the Hero "See it resolve a call-out" affordance. */
export function PlayCircle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth={1.5} />
      <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" />
    </svg>
  );
}

/** Dashed decorative ring for the Hero background layer. */
export function DashedRing({
  size = 160,
  strokeDasharray = "3 7",
  className,
  ...props
}: IconProps & { size?: number; strokeDasharray?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray={strokeDasharray}
      />
    </svg>
  );
}

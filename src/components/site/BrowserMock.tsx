import { heroDashboard, type HeroDashboardExceptionTone } from "@/lib/site-config";
import { cn } from "@/lib/cn";

/**
 * Hero right-column browser-chrome dashboard mock. Server component, no props —
 * BusinessHomepage drops <BrowserMock/> straight into the hero grid (and wraps
 * it in <Reveal> there). Structure, spacing, radii and type follow the green
 * Figma frame (wf1_navbarHeroLogobar.json → browserMockDetail); the data is the
 * shift-ops content from `heroDashboard` in site-config.
 *
 * The whole thing is a single decorative image: role="img" + aria-label on the
 * outer element, and the inner tree is aria-hidden.
 */
export function BrowserMock() {
  const { url, sectionLabel, metrics, chart, exceptions, iconRail, ariaLabel, sampleDataLabel } =
    heroDashboard;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-canvas-raised bg-[var(--color-canvas-elevated)] shadow-[0_25px_50px_-12px_rgba(14,13,11,0.1)]"
    >
      <div aria-hidden className="flex flex-col">
        {/* URL / title bar */}
        <div className="flex items-center gap-2 border-b border-canvas-raised bg-[var(--color-canvas)] px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[var(--color-signal)]" />
            <span className="size-3 rounded-full bg-[#f5c518]" />
            <span className="size-3 rounded-full bg-[#4caf50]" />
          </span>
          <span className="ml-2 flex-1">
            <span className="block w-full rounded-[4px] bg-[var(--color-canvas-elevated)] px-3 py-1 font-mono text-[12px] leading-4 text-[var(--color-text-muted)]">
              {url}
            </span>
          </span>
        </div>

        {/* Body: icon rail + main panel */}
        <div className="flex items-stretch">
          {/* Left icon rail — decorative only (the whole mock is role="img"). */}
          <div className="flex w-14 shrink-0 flex-col items-center gap-4 bg-[var(--color-canvas-dark)] py-4">
            {iconRail.map((name, i) => {
              const active = i === 0;
              return (
                <span
                  key={name}
                  className={cn(
                    "flex items-center justify-center rounded-[4px]",
                    active
                      ? "size-7 bg-[var(--color-signal)] text-[var(--color-text-on-dark-primary)]"
                      : "size-8 text-[var(--color-text-on-dark-muted)]",
                  )}
                >
                  <RailIcon name={name} className={active ? "size-3" : "size-4"} />
                </span>
              );
            })}
          </div>

          {/* Main panel */}
          <div className="flex min-w-0 flex-1 flex-col bg-[var(--color-canvas-features)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[12px] font-semibold uppercase leading-4 tracking-[0.1em] text-[var(--color-text-muted)]">
                {sectionLabel}
              </p>
              <span className="rounded-full bg-[rgba(14,13,11,0.06)] px-2 py-0.5 text-[10px] font-medium leading-4 text-[var(--color-text-muted)]">
                {sampleDataLabel}
              </span>
            </div>

            {/* Metric cards */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col rounded-lg border border-canvas-raised bg-[var(--color-canvas-elevated)] p-3"
                >
                  <span className="font-mono text-[10px] uppercase leading-[13px] tracking-[0.05em] text-[var(--color-text-muted)]">
                    {m.label}
                  </span>
                  <span className="font-display pt-1 text-[16px] leading-6 text-[var(--color-canvas-dark)]">
                    {m.value}
                  </span>
                  <span
                    className={cn(
                      "pt-0.5 text-[10px] leading-[15px]",
                      m.deltaAccent
                        ? "text-[var(--color-signal-strong)]"
                        : "text-[color:rgba(23,19,16,0.55)]",
                    )}
                  >
                    {m.delta}
                  </span>
                </div>
              ))}
            </div>

            {/* Chart card */}
            <div className="mt-4 rounded-lg border border-canvas-raised bg-[var(--color-canvas-elevated)] p-3">
              <p className="font-mono text-[10px] uppercase leading-[13px] tracking-[0.05em] text-[var(--color-text-muted)]">
                {chart.title}
              </p>
              <div className="mt-3 flex items-end gap-2">
                {chart.days.map((day, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <span className="flex h-20 w-full items-end justify-center">
                      <span
                        className={cn(
                          "block w-full max-w-[22px] rounded-t-[2px]",
                          i === chart.accentIndex
                            ? "bg-[var(--color-signal)]"
                            : "bg-[var(--color-canvas-raised)]",
                        )}
                        style={{ height: `${chart.values[i]}%` }}
                      />
                    </span>
                    <span className="font-mono text-[10px] leading-3 text-[var(--color-text-muted)]">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exceptions list — dropped below sm to keep proportions */}
            <div className="mt-3 overflow-hidden rounded-lg border border-canvas-raised bg-[var(--color-canvas-elevated)]">
              <div className="flex items-center justify-between border-b border-canvas-raised px-3 py-2">
                <span className="font-mono text-[10px] uppercase leading-[13px] tracking-[0.05em] text-[var(--color-text-muted)]">
                  {exceptions.title}
                </span>
                <span className="text-[10px] font-semibold leading-[13px] text-[var(--color-signal-strong)]">
                  {exceptions.viewAllLabel}
                </span>
              </div>
              {exceptions.rows.map((row, i) => (
                <div
                  key={row.id}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2",
                    i < exceptions.rows.length - 1 && "border-b border-[rgba(216,208,196,0.5)]",
                  )}
                >
                  <span className="shrink-0 font-mono text-[10px] leading-[13px] text-[var(--color-text-muted)]">
                    {row.id}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[10px] leading-[13px] text-[var(--color-canvas-dark)]">
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-3",
                      TONE_CLASS[row.tone],
                    )}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TONE_CLASS: Record<HeroDashboardExceptionTone, string> = {
  sage: "bg-[rgba(105,125,113,0.14)] text-[var(--color-signal-strong)]",
  neutral: "bg-[rgba(14,13,11,0.06)] text-[var(--color-canvas-dark)]",
  amber: "bg-[rgba(245,197,24,0.16)] text-[#8b7200]",
};

/** Hand-written lucide-style glyphs for the left rail. */
function RailIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      );
    case "bar-chart":
      return (
        <svg {...common}>
          <line x1="4" y1="20" x2="20" y2="20" />
          <rect x="5.5" y="11" width="3.5" height="7" rx="0.8" />
          <rect x="11" y="7" width="3.5" height="11" rx="0.8" />
          <rect x="16.5" y="14" width="3.5" height="4" rx="0.8" />
        </svg>
      );
    case "layout-grid":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="1.6" />
          <circle cx="17" cy="7" r="1.6" />
          <circle cx="7" cy="17" r="1.6" />
          <circle cx="17" cy="17" r="1.6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
    default:
      return null;
  }
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useAmbientActive, useInView } from "@/lib/motion";

const DEFAULT_CODES = ["S", "P", "A", "V"];
const ANGLES = [0, 90, 180, 270] as const; // top, right, bottom, left

const CENTER = 300;
const RADIUS = 220;
const ARC_LENGTH = (Math.PI * RADIUS) / 2; // one quarter of the circle's circumference

function pointOnCircle(angleDeg: number, radius = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

const ARC_PATHS = [
  `M ${CENTER} ${CENTER - RADIUS} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER + RADIUS} ${CENTER}`,
  `M ${CENTER + RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER} ${CENTER + RADIUS}`,
  `M ${CENTER} ${CENTER + RADIUS} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER - RADIUS} ${CENTER}`,
  `M ${CENTER - RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER} ${CENTER - RADIUS}`,
];

/**
 * The signature "operating loop" diagram. Two modes:
 *
 * - "hero": plays once when it enters view — the path draws, one event
 *   travels in, the hub resolves — then settles into a single slow pulse
 *   that pauses whenever the diagram is offscreen, the tab is hidden, or
 *   the viewer prefers reduced motion (see useAmbientActive). This is the
 *   page's one allowed continuous mobile animation.
 * - "loop-section": driven by `activeIndex` (the Sense→Plan→Act→Verify
 *   scroll narrative). Stage emphasis crossfades via a CSS transition;
 *   exactly one event travels in per stage change, once — never a loop.
 *
 * Always aria-hidden — used alongside real text (stage titles and
 * descriptions), never as the only carrier of meaning. The undrawn/
 * untraveled base state renders fully visible, so nothing depends on the
 * animation actually running to be seen.
 */
export function LoopDiagram({
  mode = "loop-section",
  size = 440,
  locations,
  activeIndex,
  stageCodes = DEFAULT_CODES,
  className,
}: {
  mode?: "hero" | "loop-section";
  size?: number;
  locations?: string[];
  activeIndex?: number;
  /** The four stage letters, top/right/bottom/left. Defaults to Sense/Plan/Act/Verify's S/P/A/V. */
  stageCodes?: string[];
  className?: string;
}) {
  const STAGES = ANGLES.map((angle, index) => ({ code: stageCodes[index] ?? DEFAULT_CODES[index]!, angle }));
  const [inViewRef, played] = useInView<HTMLDivElement>();
  const [ambientRef, ambientActive] = useAmbientActive<HTMLDivElement>();

  return (
    <div
      ref={(node) => {
        inViewRef.current = node;
        ambientRef.current = node;
      }}
    >
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox="0 0 600 600"
        fill="none"
        className={cn("overflow-visible", className)}
      >
        <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="rgba(245,239,226,0.14)" strokeWidth="1" />

        <defs>
          <marker id="loop-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(245,239,226,0.5)" />
          </marker>
        </defs>

        {ARC_PATHS.map((d, index) => (
          <path
            key={d}
            d={d}
            stroke="rgba(245,239,226,0.36)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#loop-arrow)"
            style={
              mode === "hero"
                ? ({
                    strokeDasharray: `${ARC_LENGTH} ${ARC_LENGTH}`,
                    strokeDashoffset: 0,
                    "--arc-length": ARC_LENGTH,
                    animation: played ? `arc-draw 900ms var(--ease-out) both` : undefined,
                    animationDelay: played ? `${index * 40}ms` : undefined,
                  } as React.CSSProperties)
                : undefined
            }
          />
        ))}

        {locations?.map((code, index) => {
          const angle = index * (360 / locations.length) + 45;
          const outer = pointOnCircle(angle, RADIUS + 46);
          const inner = pointOnCircle(angle, RADIUS + 12);
          return (
            <g key={code}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(245,239,226,0.2)"
                strokeDasharray="2 4"
              />
              <circle cx={outer.x} cy={outer.y} r="5" fill="#15110c" stroke="rgba(245,239,226,0.5)" />
              <text
                x={outer.x + (outer.x > CENTER ? 10 : -10)}
                y={outer.y + 4}
                textAnchor={outer.x > CENTER ? "start" : "end"}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="11"
                fill="rgba(245,239,226,0.5)"
              >
                {code}
              </text>
            </g>
          );
        })}

        {STAGES.map((stage, index) => {
          const { x, y } = pointOnCircle(stage.angle);
          const active = activeIndex === index;
          return (
            <g key={stage.code}>
              <circle
                cx={x}
                cy={y}
                r="22"
                fill="#15110c"
                style={{
                  stroke: active ? "var(--color-signal)" : "rgba(245,239,226,0.55)",
                  strokeWidth: active ? 2.5 : 1.5,
                  transition: `stroke var(--duration-state) var(--ease-out)`,
                }}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="14"
                style={{
                  fill: active ? "var(--color-signal)" : "#f5efe2",
                  transition: `fill var(--duration-state) var(--ease-out)`,
                }}
              >
                {stage.code}
              </text>
            </g>
          );
        })}

        {mode === "hero" && played && (
          <TravelingTicket angle={0} delayMs={760} stroke="rgba(245,239,226,0.5)" />
        )}

        {mode === "loop-section" && activeIndex !== undefined && (
          <TravelingTicket key={activeIndex} angle={STAGES[activeIndex]?.angle ?? 0} stroke="var(--color-signal)" />
        )}

        <HubPulse mode={mode} played={played} ambientActive={ambientActive} />
      </svg>
    </div>
  );
}

/** A ticket that appears at a stage node and travels once toward the hub, fading as it arrives. */
function TravelingTicket({ angle, delayMs = 0, stroke }: { angle: number; delayMs?: number; stroke: string }) {
  const { x, y } = pointOnCircle(angle, RADIUS - 30);
  const tx = CENTER - x;
  const ty = CENTER - y;
  return (
    <g
      style={
        {
          animation: "hub-arrive 700ms var(--ease-out) both",
          animationDelay: `${delayMs}ms`,
          "--arrive-tx": `${tx}px`,
          "--arrive-ty": `${ty}px`,
        } as React.CSSProperties
      }
    >
      <rect x={x - 10} y={y - 7} width="20" height="14" rx="2" fill="#1f1a13" stroke={stroke} strokeWidth="1.2" />
    </g>
  );
}

function HubPulse({
  mode,
  played,
  ambientActive,
}: {
  mode: "hero" | "loop-section";
  played: boolean;
  ambientActive: boolean;
}) {
  // Hero: one bright resolve pulse after the draw+travel sequence, then a
  // single slow ambient pulse that only runs while genuinely visible.
  // Loop-section: no continuous pulse at all — just the calm resolved dot,
  // matching "remove simultaneous infinite pulses" for the stacked mobile
  // fallback where several diagrams mount at once.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (mode !== "hero" || !played) return;
    const timer = window.setTimeout(() => setSettled(true), 1600);
    return () => window.clearTimeout(timer);
  }, [mode, played]);

  const showAmbientPulse = mode === "hero" && settled && ambientActive;

  return (
    <>
      <circle cx={CENTER} cy={CENTER} r="42" fill="var(--color-signal)" opacity="0.14" />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="28"
        fill="var(--color-signal)"
        opacity="0.28"
        className={showAmbientPulse ? "animate-signal-pulse" : undefined}
        style={
          mode === "hero" && played && !settled
            ? { animation: "resolve-pulse 500ms var(--ease-out) both", animationDelay: "1560ms" }
            : undefined
        }
      />
      <circle cx={CENTER} cy={CENTER} r="14" fill="var(--color-signal)" />
    </>
  );
}

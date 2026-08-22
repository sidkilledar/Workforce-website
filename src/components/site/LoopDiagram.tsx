import { cn } from "@/lib/cn";

const STAGES = [
  { code: "S", angle: 0 }, // top
  { code: "P", angle: 90 }, // right
  { code: "A", angle: 180 }, // bottom
  { code: "V", angle: 270 }, // left
] as const;

const CENTER = 300;
const RADIUS = 220;

function pointOnCircle(angleDeg: number, radius = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

/**
 * The signature "operating loop" diagram: four stage nodes (Sense, Plan,
 * Act, Verify) around a circle, location markers feeding in from outside,
 * and a hub that pulses on resolution. Always aria-hidden — used alongside
 * real text (stage titles/descriptions), never as the only carrier of
 * meaning. `activeIndex` highlights one stage, for the scroll-driven
 * Operating Loop section; omitted, it renders as calm ambient decoration
 * (the Hero's compact use).
 */
export function LoopDiagram({
  size = 440,
  locations,
  activeIndex,
  className,
}: {
  size?: number;
  locations?: string[];
  activeIndex?: number;
  className?: string;
}) {
  return (
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

      <path
        d={`M ${CENTER} ${CENTER - RADIUS} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER + RADIUS} ${CENTER}`}
        stroke="rgba(245,239,226,0.36)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#loop-arrow)"
      />
      <path
        d={`M ${CENTER + RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER} ${CENTER + RADIUS}`}
        stroke="rgba(245,239,226,0.36)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#loop-arrow)"
      />
      <path
        d={`M ${CENTER} ${CENTER + RADIUS} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER - RADIUS} ${CENTER}`}
        stroke="rgba(245,239,226,0.36)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#loop-arrow)"
      />
      <path
        d={`M ${CENTER - RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER} ${CENTER - RADIUS}`}
        stroke="rgba(245,239,226,0.36)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#loop-arrow)"
      />

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
              stroke={active ? "var(--color-signal)" : "rgba(245,239,226,0.55)"}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontSize="14"
              fill={active ? "var(--color-signal)" : "#f5efe2"}
            >
              {stage.code}
            </text>
          </g>
        );
      })}

      <circle cx={CENTER} cy={CENTER} r="42" fill="var(--color-signal)" opacity="0.14" />
      <circle cx={CENTER} cy={CENTER} r="28" fill="var(--color-signal)" opacity="0.28" className="animate-signal-pulse" />
      <circle cx={CENTER} cy={CENTER} r="14" fill="var(--color-signal)" />
    </svg>
  );
}

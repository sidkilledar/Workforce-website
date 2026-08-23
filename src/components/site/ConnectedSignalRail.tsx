"use client";

import { useEffect, useRef, useState } from "react";
import { connectedSystemNodes, type OperationalArea } from "@/lib/site-config";
import { useInView } from "@/lib/motion";

const NODE_Y = 34;
const HUB = { x: 360, y: 78 };
const NODE_XS = [60, 210, 360, 510, 660];
const PATH_LENGTH = 100;

/**
 * The dashboard's "connected-signal rail" — five compact source nodes with
 * thin paths converging on a WorkforceOS hub. All five draw in once, the
 * first time the section enters view; after that, only the newly-selected
 * area's node/path redraws (a brief "signal arriving" cue), and the hub
 * gets one resolved pulse. Never continuous, never re-plays on re-scroll.
 * Purely illustrative — every connected system it names also has a real
 * text equivalent elsewhere in the dashboard — so the whole rail is
 * aria-hidden.
 */
export function ConnectedSignalRail({
  areas,
  selectedIndex,
}: {
  areas: OperationalArea[];
  selectedIndex: number;
}) {
  // useInView's `inView` is already a one-shot latch (stays true once the
  // section has entered the viewport), so it doubles directly as "have all
  // five paths drawn at least once" — no separate mirrored state needed.
  const [containerRef, everDrawn] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [activeDraw, setActiveDraw] = useState(false);
  const isFirstSelection = useRef(true);

  useEffect(() => {
    if (!everDrawn) return;
    if (isFirstSelection.current) {
      isFirstSelection.current = false;
      setActiveDraw(true);
      return;
    }
    setActiveDraw(false);
    const frame = requestAnimationFrame(() => setActiveDraw(true));
    return () => cancelAnimationFrame(frame);
  }, [selectedIndex, everDrawn]);

  const activeArea = areas[selectedIndex]!;

  return (
    <div ref={containerRef} className="border-b border-[var(--color-border-on-dark)] px-4 py-3">
      <svg aria-hidden viewBox="0 0 720 96" className="h-auto w-full" style={{ maxHeight: 72 }}>
        {connectedSystemNodes.map((node, index) => {
          const x = NODE_XS[index]!;
          const active = node.key === activeArea.railNode;
          const drawn = everDrawn && (!active || activeDraw);
          const midX = (x + HUB.x) / 2;
          return (
            <g key={node.key}>
              <path
                d={`M ${x} ${NODE_Y + 8} Q ${midX} 58 ${HUB.x} ${HUB.y - 12}`}
                fill="none"
                stroke={active ? "var(--color-signal)" : "rgba(245,239,226,0.24)"}
                strokeWidth={active ? 1.75 : 1.25}
                pathLength={PATH_LENGTH}
                className="signal-rail-path"
                style={{
                  strokeDasharray: PATH_LENGTH,
                  strokeDashoffset: drawn ? 0 : PATH_LENGTH,
                  transition: "stroke-dashoffset 600ms var(--ease-out), stroke 300ms var(--ease-out)",
                }}
              />
              <circle
                cx={x}
                cy={NODE_Y}
                r={active ? 8 : 6}
                fill={active ? "var(--color-signal)" : "#1f1a13"}
                stroke={active ? "var(--color-signal)" : "rgba(245,239,226,0.4)"}
                strokeWidth="1.25"
                style={{ transition: "r 240ms var(--ease-out), fill 240ms var(--ease-out)" }}
              />
              <text
                x={x}
                y={NODE_Y - 14}
                textAnchor="middle"
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="10"
                letterSpacing="0.04em"
                fill={active ? "var(--color-signal)" : "rgba(245,239,226,0.5)"}
                style={{ transition: "fill 240ms var(--ease-out)" }}
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        <circle cx={HUB.x} cy={HUB.y} r="16" fill="var(--color-signal)" opacity="0.14" />
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r="10"
          fill="var(--color-signal)"
          opacity="0.32"
          className="signal-rail-pulse"
          style={everDrawn && activeDraw ? { animation: "resolve-pulse 500ms var(--ease-out) both", animationDelay: "600ms" } : undefined}
        />
        <circle cx={HUB.x} cy={HUB.y} r="5" fill="var(--color-signal)" />
      </svg>
    </div>
  );
}

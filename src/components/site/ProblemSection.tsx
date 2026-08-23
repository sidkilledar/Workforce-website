"use client";

import type { CSSProperties } from "react";
import { patchworkSources, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/motion";

// Scattered starting offsets for the "before" rail — small enough to read as
// disconnected slips of paper, not a layout shift.
const fragmentOffsets = [
  { rotate: "-1.25deg", x: "-16px" },
  { rotate: "1deg", x: "13px" },
  { rotate: "-1deg", x: "-11px" },
  { rotate: "1.5deg", x: "15px" },
  { rotate: "-0.75deg", x: "-9px" },
  { rotate: "1deg", x: "11px" },
];

const workforceStream = [
  { title: "One operational view", detail: "Signals from the tools already in use arrive together." },
  { title: "One clear next step", detail: "The relevant context becomes a specific response." },
  { title: "One shared record", detail: "The team sees what changed and what happens next." },
];

export function ProblemSection() {
  const [ref, inView] = useInView<HTMLDivElement>();

  // Fragments settle first; the stream builds shortly after, so the single
  // entrance animation reads as one thing routing into the other.
  const fragmentDelay = (index: number) => index * 55;
  const resultDelay = fragmentOffsets.length * 55 + 40;
  const streamStart = resultDelay + 260;
  const streamDelay = (index: number) => streamStart + index * 70;

  return (
    <Section id={sectionIds.problem} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">The Patchwork Problem</p>
          <h2 className="font-display mt-4 text-[1.75rem] font-semibold leading-[1.18] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Your systems track the work.
            <br className="hidden sm:block" /> Your manager still has to connect it.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            Each tool below is accurate on its own. Turning six separate pictures into one decision is still a manual, mental job — every shift.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="relative mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-6"
        >
          {/* Before — disconnected operation */}
          <div>
            <p className="label-mono text-[var(--color-text-muted)]">Before — disconnected operation</p>
            <ol className="relative mt-5 border-l border-dashed border-[var(--color-border-strong)] pl-5">
              {patchworkSources.map((item, index) => (
                <li key={item.source} className="relative py-2 first:pt-0">
                  <span
                    aria-hidden
                    className="absolute top-[13px] -left-[25px] h-[7px] w-[7px] rounded-full bg-[var(--color-canvas-raised)] ring-1 ring-[var(--color-border-strong)]"
                  />
                  <div
                    className={inView ? "animate-signal-fragment" : "opacity-0"}
                    style={
                      {
                        "--frag-x": fragmentOffsets[index]!.x,
                        "--frag-r": fragmentOffsets[index]!.rotate,
                        animationDelay: inView ? `${fragmentDelay(index)}ms` : undefined,
                      } as CSSProperties
                    }
                  >
                    <p className="ticket-number">{item.source}</p>
                    <p className="mt-0.5 text-sm font-medium text-[var(--color-text-primary)]">{item.label}</p>
                  </div>
                </li>
              ))}
              <li className="relative mt-1 border-t border-dashed border-[var(--color-border-strong)] py-3">
                <span
                  aria-hidden
                  className="absolute top-[21px] -left-[25px] h-[7px] w-[7px] rounded-full bg-[var(--color-signal-strong)]"
                />
                <div
                  className={cn(
                    "flex items-baseline gap-2",
                    inView ? "animate-signal-fragment" : "opacity-0",
                  )}
                  style={{ animationDelay: inView ? `${resultDelay}ms` : undefined } as CSSProperties}
                >
                  <p className="label-mono flex-shrink-0 text-[var(--color-signal-strong)]">Result</p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    The manager reconciles all six, by hand.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Divider */}
          <div aria-hidden className="flex items-center justify-center py-1">
            <span className="flex h-9 w-9 flex-shrink-0 rotate-90 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-elevated)] text-[var(--color-signal-strong)] lg:mt-24 lg:rotate-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* After — WorkforceOS */}
          <div>
            <p className="label-mono text-[var(--color-signal-strong)]">After — WorkforceOS</p>
            <div className="mt-5 rounded-[3px] bg-[var(--color-canvas-dark)] px-5 py-4 sm:px-6">
              <ol>
                {workforceStream.map((stage, index) => (
                  <li key={stage.title}>
                    <div
                      className={cn(
                        "flex items-start gap-3 py-2.5",
                        inView ? "animate-stream-node" : "opacity-0",
                      )}
                      style={{ animationDelay: inView ? `${streamDelay(index)}ms` : undefined } as CSSProperties}
                    >
                      <span className="label-mono mt-0.5 flex-shrink-0 text-[var(--color-text-on-dark-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-text-on-dark-primary)]">{stage.title}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-[var(--color-text-on-dark-secondary)]">
                          {stage.detail}
                        </p>
                      </div>
                      {index === workforceStream.length - 1 && (
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-status-resolved)]"
                        />
                      )}
                    </div>
                    {index < workforceStream.length - 1 && (
                      <div className="ml-[9px] h-3 w-px bg-[var(--color-border-on-dark)]" aria-hidden />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

      </Container>
    </Section>
  );
}

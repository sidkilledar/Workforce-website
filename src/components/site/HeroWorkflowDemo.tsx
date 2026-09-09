"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroWorkflow, sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { gsapEase, useDocumentVisible, usePrefersReducedMotion } from "@/lib/motion";

const APPROVAL_STEP_INDEX = heroWorkflow.steps.findIndex((step) => step.id === "approval");
const RESOLVED_STEP_INDEX = heroWorkflow.steps.findIndex((step) => step.id === "resolved");
const JORDAN_INDEX = heroWorkflow.candidates.findIndex((candidate) => candidate.status === "available");

/** True below 480px — the one place the reveal timing itself changes for a narrow viewport. */
function useNarrowViewport() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 479px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return narrow;
}

function stepStatus(index: number, activeStepIndex: number): "pending" | "active" | "complete" {
  if (index < activeStepIndex) return "complete";
  if (index === activeStepIndex) return "active";
  return "pending";
}

/**
 * The hero's one product demonstration: an operational dispatch timeline for
 * a single scheduling exception (call-out → availability checked → eligible
 * replacement identified → manager approval → resolved). GSAP owns the
 * multi-step choreography; React state (`activeStepIndex`/`approved`) drives
 * which status each already-mounted node displays, so nothing has to be
 * conditionally mounted mid-timeline.
 *
 * A `sr-only` paragraph carries the full sequence as plain text so screen
 * reader users get the complete story regardless of animation timing or
 * whether they interact with the Approve control.
 */
export function HeroWorkflowDemo() {
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const candidateRefs = useRef<(HTMLLIElement | null)[]>([]);
  const resolvedDetailRefs = useRef<(HTMLLIElement | null)[]>([]);
  const approveButtonRef = useRef<HTMLButtonElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const resolveTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [ready, setReady] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [approved, setApproved] = useState(false);
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const reducedMotion = usePrefersReducedMotion();
  const narrow = useNarrowViewport();
  const documentVisible = useDocumentVisible();

  useGSAP(
    () => {
      setActiveStepIndex(-1);
      setReady(reducedMotion);
      setResolving(false);
      setApproved(false);
      setReviewExpanded(false);

      const candidates = candidateRefs.current.filter((node): node is HTMLLIElement => node !== null);

      if (reducedMotion) {
        // Every pre-approval step renders in its final state immediately —
        // no drawing, staggering, translating, or pulsing.
        setActiveStepIndex(APPROVAL_STEP_INDEX);
        gsap.set(candidates, { opacity: 1 });
        if (lineRef.current) gsap.set(lineRef.current, { height: "75%" });
        return;
      }

      gsap.set(candidates, { opacity: 0.25, y: 0 });
      if (lineRef.current) gsap.set(lineRef.current, { height: "0%" });

      const candidateDuration = narrow ? 0.18 : 0.12;
      const candidateStagger = narrow ? 0 : 0.06;

      const timeline = gsap.timeline({ delay: 0.25 });
      introTimelineRef.current = timeline;

      timeline
        .call(() => setActiveStepIndex(0))
        .to(lineRef.current, { height: "25%", duration: 0.45, ease: gsapEase.entrance }, "+=0.3")
        .call(() => setActiveStepIndex(1))
        .to(
          candidates,
          { opacity: 1, duration: candidateDuration, stagger: candidateStagger, ease: gsapEase.entrance },
          "<",
        )
        .call(() => setActiveStepIndex(2), undefined, "+=0.05")
        .to(lineRef.current, { height: "50%", duration: 0.45, ease: gsapEase.entrance }, "<")
        .call(() => setActiveStepIndex(APPROVAL_STEP_INDEX), undefined, "+=0.1")
        .to(lineRef.current, { height: "75%", duration: 0.45, ease: gsapEase.entrance }, "<")
        .call(() => setReady(true));

      return () => {
        timeline.kill();
        introTimelineRef.current = null;
      };
    },
    { scope: panelRef, dependencies: [reducedMotion, narrow, replayKey] },
  );

  // Pause the intro timeline while the tab is hidden — no animation work
  // (or CPU) spent on a sequence nobody can see, and it resumes exactly
  // where it left off.
  useEffect(() => {
    const timeline = introTimelineRef.current;
    if (!timeline) return;
    if (documentVisible) timeline.resume();
    else timeline.pause();
  }, [documentVisible]);

  function approveAction() {
    if (approved || resolving || !ready) return;
    setResolving(true);
    trackEvent("hero_workflow_interaction", { action: "approve" });

    if (reducedMotion) {
      setActiveStepIndex(RESOLVED_STEP_INDEX);
      setApproved(true);
      setResolving(false);
      return;
    }

    const resolvedDetails = resolvedDetailRefs.current.filter((node): node is HTMLLIElement => node !== null);
    gsap.set(resolvedDetails, { opacity: 0 });
    setActiveStepIndex(RESOLVED_STEP_INDEX);

    const resolveTimeline = gsap.timeline({
      onComplete: () => {
        setApproved(true);
        setResolving(false);
      },
    });
    resolveTimelineRef.current = resolveTimeline;

    resolveTimeline
      .fromTo(approveButtonRef.current, { scale: 1 }, { scale: 0.97, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.out" })
      .to(lineRef.current, { height: "100%", duration: 0.45, ease: gsapEase.entrance }, "-=0.02")
      .to(resolvedDetails, { opacity: 1, duration: 0.22, stagger: 0.08, ease: gsapEase.entrance }, "-=0.15");
  }

  function toggleReview() {
    setReviewExpanded((current) => !current);
    trackEvent("hero_workflow_interaction", { action: "review_options" });
  }

  function replay() {
    resolveTimelineRef.current?.kill();
    resolveTimelineRef.current = null;
    setReplayKey((current) => current + 1);
    trackEvent("hero_workflow_interaction", { action: "replay" });
  }

  const approveLabel = approved ? "Approved" : resolving ? "Approving…" : ready ? heroWorkflow.approveLabel : "Preparing…";

  return (
    <div
      id={sectionIds.heroWorkflow}
      ref={panelRef}
      className="ticket-slip-dark scroll-mt-24 p-3 shadow-[0_34px_90px_-36px_rgba(0,0,0,0.82),0_8px_24px_-16px_rgba(0,0,0,0.72)] sm:p-5"
      aria-label="Illustrative WorkforceOS dispatch timeline"
    >
      {/* The timeline, candidates, and approval panel below are real,
          meaningful content — not decorative — so they stay in the normal
          accessibility tree and are keyboard-operable. This live region
          only adds the one thing sighted users get that isn't otherwise
          announced: confirmation once Approve resolves the exception. */}
      <p role="status" className="sr-only" aria-live="polite">
        {approved ? `${heroWorkflow.resolvedResult}. ${heroWorkflow.resolvedDetails.join(". ")}.` : ""}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-on-dark)] pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-[var(--color-signal-strong)] text-xs font-semibold text-white">
            W
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">{heroWorkflow.eventLabel}</p>
            <p className="mt-0.5 text-xs text-[var(--color-text-on-dark-muted)]">{heroWorkflow.disclosure}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={replay}
          className="min-h-11 min-w-11 rounded-md px-2.5 py-2 text-xs text-[var(--color-text-on-dark-secondary)] transition-[background-color,color] duration-[var(--duration-ui)] hover:bg-white/5 hover:text-[var(--color-text-on-dark-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-soft)]"
        >
          Replay
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Left: dispatch timeline — a neutral track line plus a signal-
            colored progress line that grows to the currently active node. */}
        <ol className="relative pl-6">
          <div aria-hidden className="absolute left-[7px] top-1 bottom-1 w-px bg-[var(--color-border-on-dark)]" />
          <div aria-hidden ref={lineRef} className="absolute left-[7px] top-1 w-px bg-[var(--color-signal)]" style={{ height: "0%" }} />
          {heroWorkflow.steps.map((step, index) => {
            const status = stepStatus(index, activeStepIndex);
            return (
              <li key={step.id} className="relative py-2.5 first:pt-0 last:pb-0">
                <span
                  aria-hidden
                  className="absolute left-[-24px] top-[5px] h-3.5 w-3.5 rounded-full border-2 transition-colors duration-[var(--duration-state)]"
                  style={{
                    borderColor: status === "pending" ? "var(--color-border-on-dark)" : "var(--color-signal)",
                    backgroundColor:
                      status === "complete"
                        ? "var(--color-status-resolved)"
                        : status === "active"
                          ? "var(--color-signal)"
                          : "var(--color-canvas-dark)",
                  }}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <p
                    className="text-sm font-medium transition-colors duration-[var(--duration-state)]"
                    style={{
                      color: status === "pending" ? "var(--color-text-on-dark-muted)" : "var(--color-text-on-dark-primary)",
                    }}
                  >
                    {step.label}
                  </p>
                  <span className="flex-shrink-0 text-[10px] tabular-nums text-[var(--color-text-on-dark-muted)]">
                    {step.time}
                  </span>
                </div>
                <p
                  className="mt-1 text-xs leading-relaxed transition-opacity duration-[var(--duration-state)]"
                  style={{
                    color: "var(--color-text-on-dark-secondary)",
                    opacity: status === "pending" ? 0.55 : 1,
                  }}
                >
                  {step.detail}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Right: current WorkforceOS action ticket, then the manager
            approval panel. */}
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] p-4">
            <span className="label-mono text-[var(--color-signal-soft)]">WorkforceOS</span>
            <ul className="mt-3 space-y-1.5">
              {heroWorkflow.candidates.map((candidate, index) => {
                const isJordan = index === JORDAN_INDEX;
                const highlighted = isJordan && activeStepIndex >= 2;
                return (
                  <li
                    key={candidate.name}
                    ref={(node) => {
                      candidateRefs.current[index] = node;
                    }}
                    className="rounded-md border px-3 py-2 transition-[border-color,background-color,opacity] duration-[var(--duration-state)]"
                    style={{
                      borderColor: highlighted ? "var(--color-signal)" : "var(--color-border-on-dark)",
                      backgroundColor: highlighted ? "var(--color-canvas-dark-raised)" : "transparent",
                      opacity: activeStepIndex >= 2 && !highlighted ? 0.5 : 1,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[var(--color-text-on-dark-primary)]">{candidate.name}</span>
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{
                          background:
                            candidate.status === "available"
                              ? "var(--color-status-resolved)"
                              : candidate.status === "tentative"
                                ? "var(--color-signal-soft)"
                                : "var(--color-text-on-dark-muted)",
                        }}
                      />
                    </div>
                    {reviewExpanded && (
                      <p className="mt-1 text-[11px] leading-snug text-[var(--color-text-on-dark-muted)]">{candidate.note}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-lg bg-[var(--color-canvas)] p-4 text-[var(--color-text-primary)] shadow-[0_12px_30px_-22px_rgba(0,0,0,0.72)]">
            <div className="flex items-center justify-between gap-3">
              <p className="label-mono text-[var(--color-text-muted)]">Manager review</p>
              <span
                className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-[var(--duration-state)]"
                style={{ color: approved ? "var(--color-status-resolved)" : "var(--color-signal-strong)" }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: approved ? "var(--color-status-resolved)" : "var(--color-signal-strong)" }}
                />
                {approved ? "Approved" : "Approval required"}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium leading-snug">{heroWorkflow.recommendation}</p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">{heroWorkflow.reason}</p>

            {approved ? (
              <div className="mt-4 border-t border-[var(--color-border)] pt-3">
                <p className="text-sm font-semibold text-[var(--color-status-resolved)]">{heroWorkflow.resolvedResult}</p>
                <ul className="mt-2 space-y-1">
                  {heroWorkflow.resolvedDetails.map((detail, index) => (
                    <li
                      key={detail}
                      ref={(node) => {
                        resolvedDetailRefs.current[index] = node;
                      }}
                      className="text-xs leading-relaxed text-[var(--color-text-secondary)]"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  ref={approveButtonRef}
                  type="button"
                  onClick={approveAction}
                  disabled={!ready || resolving}
                  className="min-h-11 rounded-md bg-[var(--color-signal-strong)] px-4 text-sm font-medium text-white transition-[filter,background-color] duration-[var(--duration-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] disabled:pointer-events-none disabled:opacity-50"
                >
                  {approveLabel}
                </button>
                <button
                  type="button"
                  onClick={toggleReview}
                  aria-expanded={reviewExpanded}
                  disabled={!ready || resolving}
                  className="min-h-11 rounded-md border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-primary)] disabled:pointer-events-none disabled:opacity-50"
                >
                  {heroWorkflow.reviewLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

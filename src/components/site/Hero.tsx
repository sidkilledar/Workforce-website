"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { gsapEase, usePrefersReducedMotion } from "@/lib/motion";

const headlineLines = ["Run your operation", "from one connected view."];

export function Hero() {
  return (
    <section
      id={sectionIds.hero}
      className="relative overflow-hidden bg-[var(--color-canvas-dark)] pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-45" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--color-border-on-dark)]" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(560px,1.2fr)] lg:gap-14">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <h1 className="font-display text-balance text-4xl font-semibold leading-[1.01] tracking-[-0.035em] text-[var(--color-text-on-dark-primary)] sm:text-6xl lg:text-[4.35rem]">
            {headlineLines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <span className="animate-reveal-clip block" style={{ animationDelay: `${index * 120}ms` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-reveal-soft mx-auto mt-6 max-w-[58ch] text-balance text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)] sm:text-xl lg:mx-0"
            style={{ animationDelay: "280ms" }}
          >
            WorkforceOS connects staffing, POS signals, inventory, tasks, and team communication. Its AI identifies what
            needs attention, prepares the response, and keeps managers in control.
          </p>

          <div
            className="animate-reveal-soft mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            style={{ animationDelay: "400ms" }}
          >
            <Button
              href="/demo"
              variant="primary"
              size="lg"
              magnetic
              arrow
              onClick={() => trackEvent("demo_cta_click", { location: "hero" })}
            >
              Book a Demo
            </Button>
            <Button href={`#${sectionIds.pillars}`} variant="secondary" size="lg">
              See How It Works
            </Button>
          </div>

          <div
            className="animate-reveal-soft mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[var(--color-text-on-dark-muted)] lg:mx-0 lg:justify-start"
            style={{ animationDelay: "500ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-resolved)]" aria-hidden />
            <span>Active pilots</span>
            <span aria-hidden>·</span>
            <span className="text-[var(--color-text-on-dark-secondary)]">Olive &amp; Vine</span>
            <span aria-hidden>·</span>
            <span className="text-[var(--color-text-on-dark-secondary)]">UC Davis Rec Sports</span>
          </div>
        </div>

        <div id={sectionIds.commandCenter} className="relative mx-auto w-full max-w-3xl scroll-mt-24">
          <div aria-hidden className="absolute -inset-8 bg-[var(--color-signal)] opacity-[0.055] blur-3xl" />
          <OperationsStory />
        </div>
      </Container>
    </section>
  );
}

function OperationsStory() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [approved, setApproved] = useState(false);
  const [ready, setReady] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", panel);
      const paths = gsap.utils.toArray<SVGPathElement>("[data-signal-path]", panel);
      const hub = panel.querySelector<HTMLElement>("[data-signal-hub]");
      const action = panel.querySelector<HTMLElement>("[data-ai-action]");

      setApproved(false);
      setReady(reducedMotion);

      if (reducedMotion) {
        gsap.set(steps, { opacity: 1, y: 0 });
        gsap.set(paths, { strokeDashoffset: 0 });
        return;
      }

      gsap.set(steps, { opacity: 0, y: 10 });
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });

      const timeline = gsap.timeline({ delay: 0.45 });
      timeline
        .to(steps.slice(0, 2), {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: gsapEase.entrance,
          stagger: 0.12,
        })
        .to(paths, { strokeDashoffset: 0, duration: 0.7, ease: gsapEase.entrance }, "-=0.2")
        .fromTo(
          hub,
          { opacity: 0.45, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3, ease: gsapEase.entrance },
          "-=0.18",
        )
        .to(steps.slice(2), {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: gsapEase.entrance,
          stagger: 0.14,
        })
        .fromTo(
          action,
          { borderColor: "var(--color-border-on-dark)" },
          {
            borderColor: "var(--color-signal)",
            duration: 0.24,
            repeat: 1,
            yoyo: true,
            onComplete: () => setReady(true),
          },
          "-=0.2",
        );

      return () => timeline.kill();
    },
    { scope: panelRef, dependencies: [reducedMotion, runKey] },
  );

  function approveAction() {
    setApproved(true);
    trackEvent("hero_preview_approval", { location: "hero" });
  }

  return (
    <div
      ref={panelRef}
      className="relative rounded-xl bg-[var(--color-canvas-dark-raised)] p-3 shadow-[0_34px_90px_-36px_rgba(0,0,0,0.82),0_8px_24px_-16px_rgba(0,0,0,0.72)] sm:p-5"
      aria-label="Illustrative WorkforceOS operations workflow"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-on-dark)] pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-[var(--color-signal-strong)] text-xs font-semibold text-white">
            W
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-on-dark-primary)]">Thursday operations</p>
            <p className="mt-0.5 text-xs text-[var(--color-text-on-dark-muted)]">All locations · Illustrative view</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs text-[var(--color-status-resolved)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-resolved)]" aria-hidden />
            Systems connected
          </span>
          <button
            type="button"
            onClick={() => setRunKey((current) => current + 1)}
            className="min-h-11 min-w-11 rounded-md px-2.5 py-2 text-xs text-[var(--color-text-on-dark-secondary)] transition-[background-color,color] duration-[var(--duration-ui)] hover:bg-white/5 hover:text-[var(--color-text-on-dark-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-soft)]"
          >
            Replay
          </button>
        </div>
      </div>

      <div className="relative mt-4 grid gap-3 sm:grid-cols-[minmax(0,0.78fr)_44px_minmax(0,1.22fr)] sm:items-stretch">
        <div className="grid gap-3">
          <SignalCard
            source="POS"
            time="11:52 AM"
            title="Lunch demand needs attention"
            detail="Sales activity is moving differently from the current staffing plan."
          />
          <SignalCard
            source="LABOR"
            time="5:00–7:00 PM"
            title="Coverage looks tight"
            detail="One service role needs a manager review before the evening shift."
          />
        </div>

        <div className="relative hidden items-center justify-center sm:flex" aria-hidden>
          <svg className="absolute h-full w-full overflow-visible" viewBox="0 0 44 240" preserveAspectRatio="none">
            <path data-signal-path d="M0 60 C24 60 19 120 44 120" pathLength="1" fill="none" stroke="var(--color-signal)" strokeWidth="1.5" />
            <path data-signal-path d="M0 180 C24 180 19 120 44 120" pathLength="1" fill="none" stroke="var(--color-signal)" strokeWidth="1.5" />
          </svg>
          <span data-signal-hub className="relative z-10 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-canvas-dark-raised)] bg-[var(--color-signal)]" />
        </div>

        <div className="grid gap-3">
          <div data-story-step data-ai-action className="rounded-lg border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="label-mono text-[var(--color-signal-soft)]">WorkforceOS recommendation</p>
                <h2 className="mt-2 text-base font-medium leading-snug text-[var(--color-text-on-dark-primary)]">
                  Prepare a shift extension for an available team member.
                </h2>
              </div>
              <span className="rounded-full bg-[var(--color-signal-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-signal-strong)]">
                Recommend
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
              Based on the current schedule, submitted availability, and the connected POS signal.
            </p>
          </div>

          <div data-story-step className="rounded-lg bg-[var(--color-canvas)] p-4 text-[var(--color-text-primary)] shadow-[0_12px_30px_-22px_rgba(0,0,0,0.72)]">
            <div className="flex items-center justify-between gap-3">
              <p className="label-mono text-[var(--color-text-muted)]">Manager control</p>
              <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-signal-strong)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal-strong)]" aria-hidden />
                Approval required
              </span>
            </div>
            <p className="mt-3 text-sm font-medium leading-snug">Extend Jordan’s shift to support evening service.</p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
              The schedule and affected team update only after approval.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={approveAction}
                disabled={!ready || approved}
                className="min-h-11 rounded-md bg-[var(--color-signal-strong)] px-4 text-sm font-medium text-white transition-[transform,filter,background-color] duration-[var(--duration-hover)] active:scale-[0.97] active:duration-[var(--duration-press)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] disabled:pointer-events-none disabled:opacity-50"
              >
                {approved ? "Approved" : ready ? "Approve update" : "Preparing…"}
              </button>
              <span className="text-xs text-[var(--color-text-muted)]">
                {approved ? "Schedule updated · Team notified" : "Reason and impact shown above"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border-on-dark)] pt-4 text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-on-dark-muted)]">
        <span>POS · Schedule · Availability · Team updates</span>
        <span>{approved ? "Action recorded" : "Human approval layer active"}</span>
      </div>
    </div>
  );
}

function SignalCard({ source, time, title, detail }: { source: string; time: string; title: string; detail: string }) {
  return (
    <div data-story-step className="rounded-lg border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="label-mono text-[var(--color-signal-soft)]">{source}</span>
        <span className="text-[10px] tabular-nums text-[var(--color-text-on-dark-muted)]">{time}</span>
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-[var(--color-text-on-dark-primary)]">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-on-dark-secondary)]">{detail}</p>
    </div>
  );
}

"use client";

import { useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextScramble } from "@/components/motion/TextScramble";
import { dashboardModules, sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { gsapEase, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const headlineLines = ["Your operation, running", "from one place."];

const promise = [
  { label: "Connect", icon: "M2 5 H14 M14 5 L11 2 M14 5 L11 8 M18 13 H6 M6 13 L9 10 M6 13 L9 16" },
  { label: "Understand", icon: "M3 11a7 7 0 1 1 2.1 5M3 11v5M3 11h5" },
  { label: "Act", icon: "M2 3 H14 V17 H2 Z M2 8 H14 M6 3 V17" },
  { label: "Improve", icon: "M10 2a8 8 0 1 0 0.01 0 M6 10l2.5 2.5L14 7" },
];

// The hero's command-center preview: sales signal → labor/briefing →
// inventory exception → AI recommendation → approval. A dedicated slice of
// dashboardModules, sequenced once on entry, then settled — never looping.
const previewSlugs = ["sales", "labor", "inventory", "recommendation", "approval"];
const previewModules = previewSlugs.map((slug) => dashboardModules.find((module) => module.slug === slug)!);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgPlaneRef = useRef<HTMLDivElement>(null);
  const midPlaneRef = useRef<HTMLDivElement>(null);
  const fgPlaneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Three-layer parallax on the hero's visual only (never the copy/CTAs) —
  // background grid slowest, the dashboard frame in the middle, the
  // alert/approval rows fastest. Scrubbed to the hero's own scroll-out,
  // capped well under 8% of the viewport, skipped on touch devices.
  useGSAP(
    () => {
      if (reducedMotion) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (!sectionRef.current) return;

      gsap.to(bgPlaneRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(midPlaneRef.current, {
        yPercent: 3,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(fgPlaneRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id={sectionIds.hero}
      className="relative overflow-hidden bg-[var(--color-canvas-dark)] pb-20 pt-20 sm:pb-28 sm:pt-24"
    >
      <div ref={bgPlaneRef} aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70 [filter:blur(1.5px)]" />

      <Container className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-14">
        <div className="max-w-2xl text-center lg:text-left">
          <Badge className="animate-reveal-soft text-[var(--color-text-on-dark-secondary)]">
            AI Operations Command Center
          </Badge>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--color-text-on-dark-primary)] sm:text-6xl lg:text-[3.4rem]">
            {headlineLines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <span className="animate-reveal-clip block" style={{ animationDelay: `${index * 140}ms` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-reveal-soft mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)] sm:text-xl lg:mx-0"
            style={{ animationDelay: "360ms" }}
          >
            WorkforceOS connects the systems you already use, brings the
            operation into one manager command center, and lets AI
            coordinate the day within authority rules you control.
          </p>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {promise.map((item, index) => (
              <li
                key={item.label}
                className="animate-reveal-soft flex items-center gap-2 text-sm font-medium text-[var(--color-text-on-dark-secondary)]"
                style={{ animationDelay: `${480 + index * 60}ms` }}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d={item.icon} stroke="var(--color-signal)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.label}
              </li>
            ))}
          </ul>

          <div
            className="animate-reveal-soft mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            style={{ animationDelay: "740ms" }}
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
            <Button href={`#${sectionIds.commandCenter}`} variant="secondary" size="lg">
              Explore the Platform
            </Button>
          </div>

          <p
            className="animate-reveal-soft mt-6 text-sm text-[var(--color-text-on-dark-muted)]"
            style={{ animationDelay: "800ms" }}
          >
            Spend less time behind a screen. Stay on the floor. Built for
            caterers, restaurant groups, and campus sports &amp; recreation
            departments running on student and hourly staff.
          </p>
        </div>

        <div ref={midPlaneRef} className="w-full max-w-sm flex-shrink-0">
          <CommandCenterPreview fgPlaneRef={fgPlaneRef} />
        </div>
      </Container>
    </section>
  );
}

function CommandCenterPreview({ fgPlaneRef }: { fgPlaneRef: RefObject<HTMLDivElement | null> }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [approved, setApproved] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // The hero's one coordinated sequence: each signal arrives, the exception
  // and recommendation get a brief highlight, the approval resolves, then
  // everything settles together. Runs once on mount — the hero is always
  // above the fold, so there's no scroll-gate to wait on — and never loops.
  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".preview-row", panelRef.current);
      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, y: 0 });
        setApproved(true);
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(rows, { opacity: 0, y: 10, duration: 0.6, ease: gsapEase.entrance, stagger: 0.15 });

      const exceptionRow = rows.find((row) => row.dataset.slug === "inventory");
      const recommendationRow = rows.find((row) => row.dataset.slug === "recommendation");
      const approvalRow = rows.find((row) => row.dataset.slug === "approval");

      if (exceptionRow) {
        tl.to(exceptionRow, { borderColor: "var(--color-signal)", duration: 0.25 }, "+=0.1").to(
          exceptionRow,
          { borderColor: "var(--color-border-on-dark)", duration: 0.4 },
          "+=0.3",
        );
      }
      if (recommendationRow) {
        tl.to(recommendationRow, { borderColor: "var(--color-signal)", duration: 0.25 }, "+=0.1").to(
          recommendationRow,
          { borderColor: "var(--color-border-on-dark)", duration: 0.4 },
          "+=0.2",
        );
      }
      if (approvalRow) {
        tl.call(() => setApproved(true), undefined, "+=0.4");
        tl.to(rows, { borderColor: "var(--color-status-resolved)", duration: 0.3 }, "+=0.1").to(
          rows,
          { borderColor: "var(--color-border-on-dark)", duration: 0.5 },
          "+=0.3",
        );
      }
    },
    { scope: panelRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={panelRef} className="paper-stack-dark rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-5">
      <p className="label-mono text-[var(--color-signal-soft)]">Live Operational Summary</p>
      <div ref={fgPlaneRef} className="mt-4 flex flex-col gap-2.5">
        {previewModules.map((module) => {
          const isApproval = module.slug === "approval";
          return (
            <div
              key={module.slug}
              data-slug={module.slug}
              className="preview-row rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="label-mono text-[var(--color-text-on-dark-muted)]">{module.label}</p>
                {isApproval && (
                  <TextScramble
                    text={approved ? "APPROVED" : "PENDING"}
                    trigger={!reducedMotion}
                    className="label-mono"
                    style={{ color: approved ? "var(--color-status-resolved)" : "var(--color-signal)" }}
                  />
                )}
              </div>
              <p className="mt-1 text-[13px] leading-snug text-[var(--color-text-on-dark-primary)]">{module.state}</p>
            </div>
          );
        })}
      </div>
      <p className="label-mono mt-4 text-[var(--color-text-on-dark-muted)]">Illustrative data</p>
    </div>
  );
}

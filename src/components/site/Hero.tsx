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

// The hero's command-center preview: sales signal → labor/briefing →
// inventory exception → AI recommendation → approval. A dedicated slice of
// dashboardModules, sequenced once on entry, then settled — never looping.
const previewSlugs = ["sales", "labor", "inventory", "task", "recommendation", "approval"];
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
      className="relative overflow-hidden bg-[var(--color-canvas-dark)] pb-16 pt-16 sm:pb-24 sm:pt-20"
    >
      <div ref={bgPlaneRef} aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70 [filter:blur(1.5px)]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)] lg:gap-12">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <Badge className="animate-reveal-soft text-[var(--color-text-on-dark-secondary)]">
            AI Operations Command Center
          </Badge>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--color-text-on-dark-primary)] sm:text-6xl lg:text-[4.15rem]">
            {headlineLines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <span className="animate-reveal-clip block" style={{ animationDelay: `${index * 140}ms` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-reveal-soft mx-auto mt-6 max-w-[54ch] text-balance text-lg leading-relaxed text-[var(--color-text-on-dark-secondary)] sm:text-xl lg:mx-0"
            style={{ animationDelay: "360ms" }}
          >
            Connect the systems you already use. See what needs attention.
            Let AI coordinate the response within rules you control.
          </p>

          <div
            className="animate-reveal-soft mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            style={{ animationDelay: "500ms" }}
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
              See What It Runs
            </Button>
          </div>

          <p
            className="animate-reveal-soft mt-6 max-w-[58ch] text-sm text-[var(--color-text-on-dark-muted)]"
            style={{ animationDelay: "580ms" }}
          >
            Spend less time behind a screen. Stay on the floor. Built for
            caterers, restaurant groups, and campus sports &amp; recreation
            departments running on student and hourly staff.
          </p>
        </div>

        <div id={sectionIds.commandCenter} ref={midPlaneRef} className="relative mx-auto w-full max-w-2xl scroll-mt-24">
          <div aria-hidden className="absolute -inset-8 bg-[var(--color-signal)] opacity-[0.07] blur-3xl" />
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
    <div
      ref={panelRef}
      className="paper-stack-dark relative rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-4 shadow-[0_34px_90px_-36px_rgba(0,0,0,0.75)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border-on-dark)] pb-4">
        <div>
          <p className="label-mono text-[var(--color-signal-soft)]">Thursday · All Locations</p>
          <p className="mt-1 text-sm text-[var(--color-text-on-dark-primary)]">Operations command center</p>
        </div>
        <span className="label-mono flex items-center gap-2 text-[var(--color-status-resolved)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-status-resolved)]" />
          Live
        </span>
      </div>

      <div ref={fgPlaneRef} className="mt-4 grid gap-3 sm:grid-cols-2">
        {previewModules.map((module) => {
          const isApproval = module.slug === "approval";
          const isWide = module.slug === "recommendation" || isApproval;
          return (
            <div
              key={module.slug}
              data-slug={module.slug}
              className={`preview-row rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] px-4 py-3 ${isWide ? "sm:col-span-2" : ""}`}
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
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-text-on-dark-primary)]">{module.state}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--color-border-on-dark)] pt-4">
        <p className="label-mono text-[var(--color-text-on-dark-muted)]">Illustrative operations view</p>
        <p className="label-mono text-[var(--color-signal-soft)]">AI briefing ready</p>
      </div>
    </div>
  );
}

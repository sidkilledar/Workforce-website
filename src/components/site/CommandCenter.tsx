"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { dashboardModules, sectionIds, type DashboardModule } from "@/lib/site-config";
import { gsapEase, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const priorityDot: Record<string, string> = {
  normal: "var(--color-text-muted)",
  attention: "var(--color-signal-strong)",
  resolved: "var(--color-status-resolved)",
};

const priorityLabel: Record<string, string> = {
  normal: "Normal",
  attention: "Needs attention",
  resolved: "Resolved",
};

const filters = [
  { key: "all" as const, label: "All Activity" },
  { key: "attention" as const, label: "Needs Attention" },
];

export function CommandCenter() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const visibleModules =
    filter === "attention"
      ? dashboardModules.filter((module) => module.priority === "attention")
      : dashboardModules;

  // Card entrances batch through ScrollTrigger as the grid scrolls into
  // view, rather than one IntersectionObserver-driven Reveal per card.
  useGSAP(
    () => {
      if (reducedMotion || !gridRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(".command-card", gridRef.current);
      gsap.set(cards, { opacity: 0, y: 14 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: gsapEase.entrance, stagger: 0.08 }),
      });
    },
    { scope: gridRef, dependencies: [reducedMotion, filter] },
  );

  return (
    <section id={sectionIds.commandCenter} className="relative overflow-hidden bg-[var(--color-canvas-dark)] py-24 sm:py-28">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-soft)]">Operations Command Center</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-on-dark-primary)] sm:text-4xl">
            One view of the day.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            What&apos;s happening now, what changed, what needs attention,
            what AI has already handled, and what&apos;s waiting on you — in
            one shared operating picture. All figures below are illustrative.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex justify-center">
          <div
            role="group"
            aria-label="Filter command center activity"
            className="inline-flex rounded-full border border-[var(--color-border-on-dark)] p-1"
          >
            {filters.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key)}
                aria-pressed={filter === option.key}
                className={cn(
                  "label-mono rounded-full px-4 py-1.5 transition-colors duration-[var(--duration-ui)]",
                  filter === option.key
                    ? "bg-[var(--color-signal)] text-[var(--color-canvas-dark)]"
                    : "text-[var(--color-text-on-dark-secondary)] hover:text-[var(--color-text-on-dark-primary)]",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleModules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>

        <p className="label-mono mt-10 text-center text-[var(--color-text-on-dark-muted)]">
          Illustrative data — not a live customer environment.
        </p>
      </Container>
    </section>
  );
}

function ModuleCard({ module }: { module: DashboardModule }) {
  return (
    <div className="command-card paper-stack-dark rounded-[3px] border border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark-raised)] p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="label-mono text-[var(--color-text-on-dark-muted)]">{module.label}</p>
        <span className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{ backgroundColor: priorityDot[module.priority] }}
            aria-hidden
          />
          <span className="sr-only">{priorityLabel[module.priority]}</span>
        </span>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-text-on-dark-primary)]">{module.state}</p>
    </div>
  );
}

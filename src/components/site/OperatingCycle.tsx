"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Container } from "@/components/ui/Container";
import { LoopDiagram } from "@/components/site/LoopDiagram";
import { TextScramble } from "@/components/motion/TextScramble";
import { operatingCycleStages, sectionIds, type OperatingCycleStage } from "@/lib/site-config";
import { gsapEase, useInView, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const CYCLE_CODES = operatingCycleStages.map((stage) => stage.code);

/**
 * Connect → Understand → Act → Improve. Deliberately NOT a pinned scroll
 * narrative — "A Day in the Operation" is the page's one pinned story. Each
 * stage reveals independently as it scrolls into view; the diagram's active
 * node just follows whichever stage most recently entered view, so the
 * "animate only the active stage" behavior comes from normal scroll
 * position rather than a sticky/pinned container.
 */
export function OperatingCycle() {
  const [activeStage, setActiveStage] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !gridRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(".cycle-card", gridRef.current);
      gsap.set(cards, { opacity: 0, y: 14 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: gsapEase.entrance, stagger: 0.08 }),
      });
    },
    { scope: gridRef, dependencies: [reducedMotion] },
  );

  return (
    <section id={sectionIds.cycle} className="relative overflow-hidden bg-[var(--color-canvas-dark)] py-24 sm:py-28">
      <Atmosphere variant="dark" />
      <Container className="relative">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-soft)]">The Operating Cycle</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-on-dark-primary)] sm:text-4xl">
            Connect → Understand → Act → Improve
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
            Every operational signal runs through this cycle, continuously —
            learning how this operation actually runs, not rewriting its own
            rules unsupervised.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div className="flex justify-center">
            <LoopDiagram mode="loop-section" size={320} stageCodes={CYCLE_CODES} activeIndex={activeStage} />
          </div>

          <div ref={gridRef} className="grid gap-8 sm:grid-cols-2">
            {operatingCycleStages.map((stage, index) => (
              <StageCard
                key={stage.key}
                stage={stage}
                isActive={index === activeStage}
                onActive={() => setActiveStage(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StageCard({
  stage,
  isActive,
  onActive,
}: {
  stage: OperatingCycleStage;
  isActive: boolean;
  onActive: () => void;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "-35% 0px -35% 0px" });

  useEffect(() => {
    if (inView) onActive();
    // onActive is a fresh closure each render (setActiveStage(index)); only
    // re-run when this card's own inView state actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref} className="cycle-card">
      <p className="label-mono text-[var(--color-signal-soft)]">
        {stage.number} /{" "}
        <TextScramble text={stage.title.toUpperCase()} trigger={isActive} />
      </p>
      <h3 className="font-display mt-2 text-xl font-semibold text-[var(--color-text-on-dark-primary)]">{stage.heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">{stage.description}</p>
    </div>
  );
}

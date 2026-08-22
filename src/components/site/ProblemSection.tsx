"use client";

import { patchworkSources, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LoopDiagram } from "@/components/site/LoopDiagram";
import { useInView } from "@/lib/motion";

const offsets = [
  { rotate: "-2deg", x: "-18px" },
  { rotate: "1.5deg", x: "14px" },
  { rotate: "-1deg", x: "-10px" },
  { rotate: "2deg", x: "16px" },
  { rotate: "-1.5deg", x: "12px" },
  { rotate: "1deg", x: "-14px" },
];

export function ProblemSection() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <Section id={sectionIds.problem} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">The Patchwork Problem</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Your operation is split across six systems that don&apos;t talk.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            It&apos;s not just that there are a lot of tools. It&apos;s that
            none of them understand how their signals relate to each other —
            so a manager has to be the one who connects sales to staffing to
            inventory to tasks, every day, by hand.
          </p>
        </Reveal>

        <div ref={ref} className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-mono text-[var(--color-text-muted)]">Reconciled manually</p>
            <div className="relative mt-6 grid min-h-[320px] auto-rows-min grid-cols-2 items-start gap-3 rounded-[3px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-5 sm:p-6">
              {patchworkSources.map((item, index) => (
                <div
                  key={item.source}
                  className={cnSlip(inView)}
                  style={
                    {
                      "--slip-x": offsets[index]!.x,
                      "--slip-r": offsets[index]!.rotate,
                      animationDelay: inView ? `${index * 70}ms` : undefined,
                    } as React.CSSProperties
                  }
                >
                  <p className="ticket-number">{item.source}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Six systems, six separate pictures — and the manager is the
              only one holding all of them at once.
            </p>
          </div>

          <Reveal delay={120}>
            <p className="label-mono text-[var(--color-signal-strong)]">Connected by WorkforceOS</p>
            <div className="mt-6 flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-[3px] bg-[var(--color-canvas-dark)] p-8 text-center">
              <LoopDiagram mode="loop-section" size={200} />
              <p className="max-w-[260px] text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
                Every signal lands in one operating picture — connected,
                understood, and acted on together.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function cnSlip(inView: boolean) {
  return `ticket-slip px-4 pb-3 pt-4 ${inView ? "animate-slip-route" : "opacity-0"}`;
}

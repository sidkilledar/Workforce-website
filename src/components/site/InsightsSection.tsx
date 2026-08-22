"use client";

import { insightExamples, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/motion";

// Relative heights only — illustrative, not real figures.
const chartDays = [
  { day: "Mon", scheduled: 0.55, demand: 0.5 },
  { day: "Tue", scheduled: 0.5, demand: 0.48 },
  { day: "Wed", scheduled: 0.6, demand: 0.62 },
  { day: "Thu", scheduled: 0.62, demand: 0.8 },
  { day: "Fri", scheduled: 0.9, demand: 0.95 },
  { day: "Sat", scheduled: 0.85, demand: 1.0 },
  { day: "Sun", scheduled: 0.7, demand: 0.58 },
];

export function InsightsSection() {
  const [chartRef, chartInView] = useInView<HTMLDivElement>();

  return (
    <Section id={sectionIds.insights}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          <div>
            <Reveal>
              <p className="label-mono text-[var(--color-signal-strong)]">Insights &amp; Labor Efficiency</p>
              <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                See where staffing and demand don&apos;t line up.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                Qualitative comparisons from connected data — not a savings
                calculator. Illustrative chart, not a customer&apos;s figures.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-4">
              {insightExamples.map((insight, index) => (
                <InsightCard key={insight.question} insight={insight} index={index} />
              ))}
            </div>
          </div>

          <div ref={chartRef} className="lg:sticky lg:top-24 lg:self-start">
            <div className="ticket-slip p-6">
              <p className="label-mono text-[var(--color-text-muted)]">Scheduled Labor vs. Demand Signal (Illustrative)</p>
              <div className="mt-6 flex h-40 items-end gap-3">
                {chartDays.map((d, index) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex h-32 w-full items-end justify-center gap-1">
                      <Bar height={d.scheduled} color="var(--color-text-muted)" inView={chartInView} delay={index * 60} />
                      <Bar height={d.demand} color="var(--color-signal-strong)" inView={chartInView} delay={index * 60 + 40} />
                    </div>
                    <span className="label-mono text-[var(--color-text-muted)]">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-5 border-t border-[var(--color-border)] pt-4">
                <Legend color="var(--color-text-muted)" label="Scheduled hours" />
                <Legend color="var(--color-signal-strong)" label="Demand signal" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Bar({ height, color, inView, delay }: { height: number; color: string; inView: boolean; delay: number }) {
  return (
    <span
      aria-hidden
      className="w-2.5 rounded-t-[2px]"
      style={{
        height: "100%",
        backgroundColor: color,
        transform: inView ? `scaleY(${height})` : "scaleY(0.04)",
        transformOrigin: "bottom",
        transition: `transform var(--duration-entrance) var(--ease-out) ${delay}ms`,
      }}
    />
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
      <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: color }} aria-hidden />
      {label}
    </span>
  );
}

function InsightCard({ insight, index }: { insight: (typeof insightExamples)[number]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={inView ? "animate-reveal-soft border-t border-[var(--color-border)] pt-4" : "border-t border-[var(--color-border)] pt-4 opacity-0"}
      style={inView ? { animationDelay: `${index * 70}ms` } : undefined}
    >
      <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">{insight.question}</h3>
      <p className="mt-1.5 text-[13px] text-[var(--color-text-muted)]">Connected: {insight.connectedSignals}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{insight.qualitativeFinding}</p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-signal-strong)]">{insight.possibleAction}</p>
    </div>
  );
}

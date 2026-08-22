import { sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LoopDiagram } from "@/components/site/LoopDiagram";

const inputs = [
  { time: "5:52 PM", label: "Call-out, texted in", rotate: "-2deg" },
  { time: "SAT", label: "No-show, no warning", rotate: "1.5deg" },
  { time: "FRI", label: "Headcount change", rotate: "-1deg" },
  { time: "14 UNREAD", label: "Group chat, buried", rotate: "2deg" },
];

export function ProblemSection() {
  return (
    <Section id={sectionIds.problem} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">The Reality Of Shift-Based Work</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            A scheduling app, a group chat, and a stream of texts — all fighting each other.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            Call-outs, no-shows, and headcount changes land in a different
            place every time. WorkforceOS puts it all through one loop instead.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="label-mono text-[var(--color-text-muted)]">Coordinated manually</p>
            <div className="relative mt-6 flex min-h-[280px] flex-col items-start gap-4 rounded-[3px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-6 sm:p-8">
              {inputs.map((input) => (
                <div
                  key={input.label}
                  className="ticket-slip w-full max-w-xs px-4 pb-3 pt-4 sm:w-auto"
                  style={{ transform: `rotate(${input.rotate})` }}
                >
                  <p className="ticket-number">{input.time}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">{input.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="label-mono text-[var(--color-signal-strong)]">Kept moving by WorkforceOS</p>
            <div className="mt-6 flex min-h-[280px] flex-col items-center justify-center gap-6 rounded-[3px] bg-[var(--color-canvas-dark)] p-8 text-center">
              <LoopDiagram size={200} />
              <p className="max-w-[240px] text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
                Every signal lands in one loop — sensed, planned, acted on, and
                verified resolved.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

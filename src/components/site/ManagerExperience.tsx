import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { managerPrompts } from "@/lib/site-config";

function DesktopMock() {
  return (
    <div className="glass-panel overflow-hidden rounded-2xl">
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="label-mono ml-3 text-[var(--color-text-muted)]">Planning &amp; oversight</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5 bg-[#f2f0fe] p-5">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="h-6 rounded"
            style={{
              background: `linear-gradient(180deg, rgba(91,79,239,${0.22 + (index % 6) * 0.09}), rgba(157,184,255,${0.16 + (index % 6) * 0.08}))`,
              border: "1px solid rgba(91,79,239,0.14)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MobileMock() {
  return (
    <div className="glass-panel mx-auto w-48 overflow-hidden rounded-[2rem] border-2 border-[var(--color-border-strong)] p-2">
      <div className="mx-auto h-1.5 w-10 rounded-full bg-[var(--color-border-strong)]" />
      <div className="mt-3 space-y-2 px-1 pb-3">
        <p className="label-mono px-1 text-[var(--color-text-muted)]">Exceptions</p>
        <div className="rounded-xl border border-amber-500/30 bg-amber-400/15 p-2.5">
          <p className="text-[11px] text-amber-800">Dinner coverage gap</p>
          <div className="mt-2 flex gap-1.5">
            <span className="flex-1 rounded-full bg-emerald-500/20 py-1 text-center text-[10px] text-emerald-700">
              Approve
            </span>
            <span className="flex-1 rounded-full bg-black/[0.04] py-1 text-center text-[10px] text-[var(--color-text-muted)]">
              Review
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-raised)] p-2.5">
          <p className="text-[11px] text-[var(--color-text-primary)]">Time-off — J. Alvarez</p>
          <p className="mt-1 text-[10px] text-emerald-600">Approved</p>
        </div>
      </div>
    </div>
  );
}

export function ManagerExperience() {
  return (
    <Section className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Your managers handle exceptions. Workforce OS handles the repetition.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
          <Reveal className="grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-center">
            <DesktopMock />
            <MobileMock />
          </Reveal>

          <Reveal delay={100}>
            <p className="label-mono text-[var(--color-accent-cyan-ink)]">Operations command</p>
            <div className="mt-4 space-y-3">
              {managerPrompts.map((prompt) => (
                <GlassPanel key={prompt} className="px-4 py-3">
                  <p className="text-sm text-[var(--color-text-primary)]">&ldquo;{prompt}&rdquo;</p>
                </GlassPanel>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

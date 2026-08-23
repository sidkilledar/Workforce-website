"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { authorityLevels, implementationSteps, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function AuthoritySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = authorityLevels[activeIndex]!;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % authorityLevels.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + authorityLevels.length) % authorityLevels.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = authorityLevels.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <section id={sectionIds.authority} className="bg-[var(--color-canvas-dark)] py-16 sm:py-20">
      <Container className="max-w-[1200px]">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-balance text-3xl font-semibold tracking-[-0.025em] text-[var(--color-text-on-dark-primary)] sm:text-4xl lg:text-5xl">
            You decide where AI stops and a manager steps in.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)] sm:text-base">
            Authority is configured per workflow and action—not assumed. Start with visibility, require approval for
            sensitive decisions, and automate only the routine work your team authorizes.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-xl bg-[var(--color-canvas-dark-raised)] p-4 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.9)] sm:p-6">
              <div
                role="tablist"
                aria-label="AI authority levels"
                className="grid grid-cols-3 gap-1 border-b border-[var(--color-border-on-dark)] pb-4"
              >
                {authorityLevels.map((level, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={level.key}
                      ref={(node) => {
                        buttonRefs.current[index] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`authority-tab-${level.key}`}
                      aria-selected={selected}
                      aria-controls="authority-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      className={cn(
                        "min-h-11 rounded-[3px] px-3 py-2 text-sm font-medium transition-[background-color,color] duration-[var(--duration-ui)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-soft)]",
                        selected
                          ? "bg-[var(--color-signal-strong)] text-white"
                          : "text-[var(--color-text-on-dark-secondary)] hover:bg-white/5 hover:text-[var(--color-text-on-dark-primary)]",
                      )}
                    >
                      {level.title}
                    </button>
                  );
                })}
              </div>

              <div
                key={active.key}
                id="authority-panel"
                role="tabpanel"
                aria-labelledby={`authority-tab-${active.key}`}
                className="dashboard-enter min-h-[260px] pt-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="label-mono text-[var(--color-signal-soft)]">Authority mode</p>
                  <span className="flex items-center gap-2 text-xs text-[var(--color-text-on-dark-muted)]">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        active.key === "inform" ? "bg-[var(--color-status-resolved)]" : "bg-[var(--color-signal)]",
                      )}
                      aria-hidden
                    />
                    Configured per workflow
                  </span>
                </div>
                <h3 className="font-display mt-5 text-3xl font-semibold text-[var(--color-text-on-dark-primary)]">
                  {active.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-[var(--color-text-on-dark-secondary)]">
                  {active.description}
                </p>
                <div className="mt-6 border-t border-[var(--color-border-on-dark)] pt-5">
                  <p className="label-mono text-[var(--color-text-on-dark-muted)]">Example</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-on-dark-primary)]">{active.example}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <TrustPoint label="Rules" detail="Per workflow" />
              <TrustPoint label="Oversight" detail="Human override" />
              <TrustPoint label="History" detail="Every action logged" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex items-end justify-between gap-6 border-b border-[var(--color-border-on-dark)] pb-5">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[var(--color-text-on-dark-primary)] sm:text-3xl">
                  Start with your operation as it works today.
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">
                  Keep the systems already in place. Connect selected workflows first, establish the approval boundary,
                  and expand from there.
                </p>
              </div>
            </div>

            <ol className="divide-y divide-[var(--color-border-on-dark)]" aria-label="WorkforceOS implementation path">
              {implementationSteps.map((step) => (
                <li key={step.number} className="grid gap-3 py-5 sm:grid-cols-[44px_180px_1fr] sm:gap-5">
                  <span className="text-xs tabular-nums text-[var(--color-signal-soft)]">{step.number}</span>
                  <h4 className="text-sm font-semibold text-[var(--color-text-on-dark-primary)]">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-[var(--color-text-on-dark-secondary)]">{step.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function TrustPoint({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="border-t border-[var(--color-border-on-dark)] pt-3">
      <p className="text-xs font-medium text-[var(--color-text-on-dark-primary)]">{label}</p>
      <p className="mt-1 text-[11px] text-[var(--color-text-on-dark-muted)]">{detail}</p>
    </div>
  );
}

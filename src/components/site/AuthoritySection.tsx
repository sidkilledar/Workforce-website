"use client";

import { useState } from "react";
import { authorityLevels, sectionIds } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function AuthoritySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = authorityLevels[activeIndex]!;

  return (
    <Section id={sectionIds.authority} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">Configurable Authority &amp; Trust</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            You decide what AI is allowed to do.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            Authority is configured per workflow, action, and role — never
            assumed. Managers can change the boundary at any time.
          </p>
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-10 max-w-xl">
          <div
            role="tablist"
            aria-label="Authority levels"
            className="grid grid-cols-3 gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] p-1"
          >
            {authorityLevels.map((level, index) => (
              <button
                key={level.key}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={
                  index === activeIndex
                    ? "rounded-full bg-[var(--color-signal-strong)] px-4 py-2.5 text-sm font-medium text-white transition-colors"
                    : "rounded-full px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                }
              >
                {level.title}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="ticket-slip mt-6 p-6 sm:p-8">
            <p className="font-display text-xl font-semibold text-[var(--color-text-primary)]">{active.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">{active.description}</p>
            <p className="mt-4 border-t border-[var(--color-border)] pt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {active.example}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { aiAssistantExamples, sectionIds, type AiAssistantExample } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const responseTypeLabel: Record<AiAssistantExample["responseType"], string> = {
  answers: "Answers from data",
  recommends: "Recommends an action",
  executes: "Executes within authority",
  "requests-approval": "Requests approval",
};

const responseTypeColor: Record<AiAssistantExample["responseType"], string> = {
  answers: "var(--color-status-resolved)",
  recommends: "var(--color-signal-strong)",
  executes: "var(--color-signal-strong)",
  "requests-approval": "var(--color-signal-strong)",
};

export function AiAssistant() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = aiAssistantExamples[activeIndex]!;

  return (
    <Section id={sectionIds.aiAssistant} className="bg-[var(--color-canvas-raised)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-[var(--color-signal-strong)]">AI Assistant</p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Ask, understand, and act.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            A manager asks in plain language, from inside the dashboard.
            Select a question to see how WorkforceOS responds.
          </p>
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-10 max-w-3xl">
          <div role="tablist" aria-label="Example manager questions" className="flex flex-wrap gap-2">
            {aiAssistantExamples.map((example, index) => (
              <button
                key={example.prompt}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={
                  index === activeIndex
                    ? "rounded-full bg-[var(--color-signal-strong)] px-4 py-2 text-left text-sm font-medium text-white transition-colors"
                    : "rounded-full border border-[var(--color-border)] bg-[var(--color-canvas-elevated)] px-4 py-2 text-left text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
                }
              >
                {example.prompt}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="ticket-slip mt-6 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span
                className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: responseTypeColor[active.responseType] }}
                aria-hidden
              />
              <div>
                <p className="label-mono" style={{ color: responseTypeColor[active.responseType] }}>
                  {responseTypeLabel[active.responseType]}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-primary)]">{active.response}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

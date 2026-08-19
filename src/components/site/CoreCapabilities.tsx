"use client";

import { useState } from "react";
import { capabilities } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityVisual } from "@/components/site/CapabilityVisual";
import { cn } from "@/lib/cn";

// A warm off-white break in the section rhythm — an editorial "operations"
// interlude distinct from the plain white sections around it.
export function CoreCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex]!;

  return (
    <Section className="bg-[#f6f5f2]">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="label-mono text-[var(--color-accent-cobalt)]">CORE CAPABILITIES</p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            One system for the work behind every shift.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-neutral-200 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="flex flex-col gap-1">
            {capabilities.map((capability, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={capability.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-xl border border-transparent px-4 py-4 text-left transition-colors",
                    isActive ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]" : "hover:bg-black/[0.02]",
                  )}
                >
                  <span
                    className={cn(
                      "label-mono mt-0.5 shrink-0",
                      isActive ? "text-[var(--color-accent-cobalt)]" : "text-neutral-400",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={cn("block text-base font-medium", isActive ? "text-neutral-900" : "text-neutral-600")}>
                      {capability.name}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block overflow-hidden text-sm leading-relaxed text-neutral-500 transition-all duration-300",
                        isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0 lg:max-h-24 lg:opacity-100",
                      )}
                    >
                      {capability.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <CapabilityVisual slug={active.slug} />
            <div className="mt-6">
              <p className="label-mono text-[var(--color-accent-cobalt)]">
                {String(activeIndex + 1).padStart(2, "0")} — {active.name}
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">{active.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

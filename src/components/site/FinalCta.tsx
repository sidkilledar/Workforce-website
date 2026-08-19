"use client";

import { useEffect, useRef, useState } from "react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { trackEvent } from "@/lib/analytics";

const chips: { label: string; tx: string; ty: string; tr: string }[] = [
  { label: "Schedule", tx: "-160px", ty: "-70px", tr: "-8deg" },
  { label: "Message", tx: "150px", ty: "-90px", tr: "6deg" },
  { label: "Approval", tx: "-140px", ty: "80px", tr: "5deg" },
  { label: "Task", tx: "160px", ty: "70px", tr: "-6deg" },
];

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-24"
      style={{ background: "var(--color-canvas-dark)" }}
    >
      <Atmosphere variant="dark" className="opacity-70" />
      <Container className="relative pb-16">
        <div className="relative mx-auto flex h-24 max-w-3xl items-center justify-center">
          {chips.map((chip, index) => (
            <span
              key={chip.label}
              className={visible ? "animate-converge absolute" : "absolute opacity-0"}
              style={
                {
                  "--tx": chip.tx,
                  "--ty": chip.ty,
                  "--tr": chip.tr,
                  animationDelay: `${index * 90}ms`,
                } as React.CSSProperties
              }
            >
              <span className="glass-panel label-mono inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[var(--color-text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-cyan)]" />
                {chip.label}
              </span>
            </span>
          ))}
          <span
            className={visible ? "animate-fade-up font-display text-2xl font-semibold text-white" : "opacity-0"}
            style={{ animationDelay: "950ms" }}
          >
            Workforce OS
          </span>
        </div>
      </Container>

      <div className="relative bg-[image:var(--gradient-brand)] py-16 sm:py-20">
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display max-w-xl text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Give every shift an operating system.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Forecast demand, staff intelligently, coordinate the day, and let managers
              focus on the decisions that matter.
            </p>
          </div>
          <Button
            href="/demo"
            size="lg"
            variant="light"
            arrow
            className="shrink-0"
            onClick={() => trackEvent("demo_cta_click", { location: "final_cta" })}
          >
            Book a Demo
          </Button>
        </Container>
      </div>
    </section>
  );
}

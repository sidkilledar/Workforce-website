"use client";

import { useEffect, useRef, useState } from "react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { sectionIds } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

// Echoes the hero's four-part promise, converging into one wordmark.
const chips: { label: string; tx: string; ty: string; tr: string }[] = [
  { label: "Connect", tx: "-160px", ty: "-70px", tr: "-8deg" },
  { label: "Understand", tx: "150px", ty: "-90px", tr: "6deg" },
  { label: "Act", tx: "-140px", ty: "80px", tr: "5deg" },
  { label: "Improve", tx: "160px", ty: "70px", tr: "-6deg" },
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
      id={sectionIds.finalCta}
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
              <span className="ticket-slip label-mono inline-flex items-center gap-1.5 px-3 py-1.5 text-[var(--color-text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
                {chip.label}
              </span>
            </span>
          ))}
          <span
            className={
              visible
                ? "animate-fade-up font-display text-2xl font-semibold text-[var(--color-text-on-dark-primary)]"
                : "opacity-0"
            }
            style={{ animationDelay: "950ms" }}
          >
            WorkforceOS
          </span>
        </div>
      </Container>

      {/* signal-strong, not the brighter signal — white/near-white text on
          bright signal only reaches ~3.1:1, under WCAG AA 4.5:1 for the
          paragraph below (18px normal weight doesn't qualify as "large text"). */}
      <div className="relative bg-[var(--color-signal-strong)] py-16 sm:py-20">
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display max-w-xl text-3xl font-medium tracking-tight text-[#fbf8f1] sm:text-5xl">
              Get your managers back on the floor.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-[#fbf8f1]/85">
              The demo starts with your systems and your highest-friction
              workflow — not a generic tour. We won&apos;t promise a fully
              configured environment on the first call, but you&apos;ll see
              exactly how it&apos;d fit your operation.
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

import Link from "next/link";
import { industries, type Industry } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const tintGlow: Record<Industry["tint"], string> = {
  violet: "var(--color-accent-violet)",
  cobalt: "var(--color-accent-cobalt)",
  cyan: "var(--color-accent-cyan)",
};

const tintText: Record<Industry["tint"], string> = {
  violet: "text-[var(--color-accent-violet)]",
  cobalt: "text-[var(--color-accent-cobalt)]",
  cyan: "text-[var(--color-accent-cyan-ink)]",
};

export function IndustriesShowcase() {
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Built for businesses that run by the hour.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal key={industry.slug} delay={index * 70}>
              <Link href={`/industries/${industry.slug}`} className="group block h-full">
                <div className="glass-panel relative h-full overflow-hidden rounded-2xl p-7 transition-all group-hover:-translate-y-1 group-hover:border-[var(--color-border-strong)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-[70px] transition-opacity group-hover:opacity-35"
                    style={{ background: tintGlow[industry.tint] }}
                  />
                  <div
                    aria-hidden
                    className="bg-dots pointer-events-none absolute bottom-0 right-0 h-24 w-24 text-[var(--color-text-primary)] opacity-[0.1] [mask-image:radial-gradient(circle_at_bottom_right,black,transparent_75%)]"
                  />
                  <h3 className="relative text-lg font-medium text-[var(--color-text-primary)]">{industry.shortName}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {industry.summary}
                  </p>
                  <span className={cn("relative mt-4 inline-block text-sm font-medium", tintText[industry.tint])}>
                    Learn more →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

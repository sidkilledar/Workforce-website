import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function LegalPage({
  title,
  description,
  lastUpdated,
  children,
}: {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <Section className="pt-16 sm:pt-24">
      <Container>
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-[var(--color-border)] pb-10">
            <h1 className="font-display text-4xl font-semibold leading-tight text-[var(--color-text-primary)] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              {description}
            </p>
            <p className="label-mono mt-6 text-[var(--color-text-muted)]">
              Effective {lastUpdated}
            </p>
          </header>
          <div className="legal-copy mt-10 space-y-10 text-[15px] leading-7 text-[var(--color-text-secondary)]">
            {children}
          </div>
        </article>
      </Container>
    </Section>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-[var(--color-text-primary)]">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

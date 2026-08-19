import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PageHero } from "@/components/site/PageHero";
import { siteConfig } from "@/lib/site-config";

export function LegalPlaceholder({
  title,
  lastUpdated,
}: {
  title: string;
  lastUpdated: string;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <GlassPanel className="border-amber-400/40 bg-amber-50 p-6 text-sm text-amber-800">
              This page is a placeholder pending review by legal counsel. Do not treat
              it as a final or binding {title.toLowerCase()} until it has been reviewed
              and approved.
            </GlassPanel>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
              <p>Last updated: {lastUpdated}</p>
              <p>
                This is placeholder text for the {siteConfig.name} {title.toLowerCase()}.
                Final legal language covering data collection, use, retention, user
                rights, and applicable regulations (including any state, federal, or
                international requirements relevant to {siteConfig.name}&apos;s
                customers) will be added here once drafted and approved by counsel.
              </p>
              <p>
                Questions in the meantime can be sent to{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[var(--color-text-primary)] underline underline-offset-2"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

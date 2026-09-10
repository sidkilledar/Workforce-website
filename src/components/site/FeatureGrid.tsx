import { Reveal } from "@/components/ui/Reveal";
import { confirmedCapabilities, featureSection } from "@/lib/site-config";
import { CheckChip, featureIcons } from "@/components/site/featureIcons";

/**
 * Green-layout Features grid — six operating-area cards. The integrator
 * renders the section heading, intro, and footer note around it.
 *
 * Cards render in `featureSection.displayOrder`; the `confirmedCapabilities`
 * array keeps its own tested order untouched.
 */
const displayCapabilities = featureSection.displayOrder.map((slug) => {
  const capability = confirmedCapabilities.find((entry) => entry.slug === slug);
  if (!capability) {
    throw new Error(`FeatureGrid: missing confirmedCapabilities entry for "${slug}"`);
  }
  return capability;
});

export function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayCapabilities.map((capability, index) => {
        const Icon = featureIcons[capability.icon];
        return (
          <Reveal key={capability.slug} delay={index * 80} className="h-full">
            <article className="flex h-full gap-4 rounded-2xl border border-canvas-raised bg-[var(--color-canvas-elevated)] p-8">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(105,125,113,0.08)]">
                <Icon className="size-6 text-[var(--color-signal)]" />
              </div>
              <div className="flex flex-col">
                <p className="label-mono text-[10px] text-[var(--color-text-muted)]">
                  {capability.eyebrow}
                </p>
                <h3
                  className="font-display mt-2 text-[20px] font-semibold leading-[1.4] text-[var(--color-text-primary)]"
                  style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                >
                  {capability.cardTitle}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.625] text-[var(--color-text-muted)]">
                  {capability.cardBody}
                </p>
                <ul className="mt-5 space-y-2">
                  {capability.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[14px] leading-5 text-[var(--color-text-primary)]"
                    >
                      <CheckChip className="mt-[3px] size-3.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

import { Reveal } from "@/components/ui/Reveal";
import { confirmedCapabilities, featureSection } from "@/lib/site-config";
import { featureIcons } from "@/components/site/featureIcons";

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
  // `featureSection.displayOrder` leads with the two flagship capabilities
  // (scheduling, communication); the rest are the supporting signals that
  // feed them. Two visual tiers make that hierarchy legible instead of
  // presenting six equal-weight cards.
  const [flagship, supporting] = [displayCapabilities.slice(0, 2), displayCapabilities.slice(2)];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {flagship.map((capability, index) => {
          const Icon = featureIcons[capability.icon];
          return (
            <Reveal key={capability.slug} delay={index * 60} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--color-signal)]/50 bg-[var(--color-canvas-elevated)] p-8">
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[rgba(105,125,113,0.1)]">
                    <Icon className="size-6 text-[var(--color-signal)]" />
                  </div>
                  <span className="label-mono text-[10px] text-[var(--color-signal-strong)]">Core</span>
                </div>
                <div>
                  <h3
                    className="font-display text-[22px] font-semibold leading-[1.3] text-[var(--color-text-primary)]"
                    style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                  >
                    {capability.eyebrow}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                    {capability.description}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {supporting.map((capability, index) => {
          const Icon = featureIcons[capability.icon];
          return (
            <Reveal key={capability.slug} delay={120 + index * 60} className="h-full">
              <article className="flex h-full flex-col gap-3 rounded-xl border border-canvas-raised bg-[var(--color-canvas-elevated)] p-5">
                <Icon className="size-5 text-[var(--color-signal)]" />
                <div>
                  <h3 className="text-[14px] font-semibold leading-[1.35] text-[var(--color-text-primary)]">
                    {capability.eyebrow}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
                    {capability.description}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ctaNav, footerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-canvas-raised)]">
      <Container className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
              Give managers back the hours lost coordinating work across disconnected systems.
            </p>
            <Link
              href={ctaNav.href}
              className="mt-4 inline-flex text-sm font-medium text-[var(--color-signal-strong)] hover:text-[var(--color-signal)]"
            >
              {ctaNav.label} <span aria-hidden>→</span>
            </Link>
            <a href={`mailto:${siteConfig.email}`} className="mt-3 block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
              {siteConfig.email}
            </a>
          </div>

          <div className="flex gap-10">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="label-mono text-[var(--color-text-muted)]">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

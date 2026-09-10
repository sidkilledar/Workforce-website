import Link from "next/link";
import { footerContent, footerNav, siteConfig, socialLinks } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-canvas-dark)] pt-20 pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-lg font-semibold text-[var(--color-canvas-raised)]"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-on-dark-muted)]">
              {footerContent.descriptor}
            </p>
            <div className="mt-5 flex items-center gap-4">
              {socialLinks.linkedinPlaceholder ? (
                <span
                  aria-label="LinkedIn (coming soon)"
                  title="LinkedIn — coming soon"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border-on-dark)] text-[var(--color-text-on-dark-muted)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05C21.9 8.59 23 10.86 23 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.03-3.32-2.03 0-2.34 1.59-2.34 3.22V21h-4V9Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              ) : null}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-xs text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-text-on-dark-primary)]"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="label-mono text-[var(--color-text-on-dark-primary)]">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-text-on-dark-primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border-on-dark)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-text-on-dark-muted)]">
            © {year} {siteConfig.name}. {footerContent.legalLine}
          </p>
          <ul className="flex items-center gap-6">
            {footerContent.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-text-on-dark-primary)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

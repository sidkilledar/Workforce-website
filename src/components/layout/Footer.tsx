import Link from "next/link";
import { footerContent, footerNav, siteConfig } from "@/lib/site-config";
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
            <div className="mt-5">
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

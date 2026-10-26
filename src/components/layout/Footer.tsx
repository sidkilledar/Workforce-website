import Link from "next/link";
import {
  ctaNav,
  footerContent,
  footerNav,
  siteConfig,
} from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

const linkClass =
  "text-sm text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-text-on-dark-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-text-on-dark-primary)]";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--straw-dark)] pt-20 pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="straw-heading text-2xl font-semibold !text-[var(--straw-bg)]"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-on-dark-muted)]">
              {footerContent.descriptor}
            </p>
            <div className="mt-5">
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                {siteConfig.email}
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="label-mono text-[var(--color-text-on-dark-primary)]">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="label-mono text-[var(--color-text-on-dark-primary)]">
              Get started
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href={ctaNav.href} className={linkClass}>
                  {ctaNav.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--straw-border-on-dark)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-text-on-dark-muted)]">
            © {year} {siteConfig.name}. {footerContent.legalLine}
          </p>
          <ul className="flex items-center gap-6">
            {footerContent.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
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

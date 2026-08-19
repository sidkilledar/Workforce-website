import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { LinkedInPlaceholder } from "@/components/layout/LinkedInPlaceholder";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-canvas-raised)]">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="text-lg font-semibold text-[var(--color-text-primary)]">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
              The AI operations manager for frontline businesses.
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)]">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-xs text-[var(--color-text-muted)]">In active customer testing.</p>
            <LinkedInPlaceholder />
          </div>
        </div>
      </Container>
    </footer>
  );
}

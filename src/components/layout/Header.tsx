"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ctaNav, primaryNav, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-shadow duration-300",
        scrolled || mobileOpen
          ? "border-[var(--color-border)] shadow-[0_1px_0_rgba(15,23,42,0.02),0_8px_24px_-16px_rgba(15,23,42,0.15)]"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryNav.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--color-text-primary)]",
                  active ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button
            href={ctaNav.href}
            size="md"
            arrow
            onClick={() => trackEvent("demo_cta_click", { location: "header" })}
          >
            {ctaNav.label}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-primary)] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-[var(--color-border)] bg-white px-6 py-6 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--color-text-primary)] hover:bg-black/[0.03]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            href={ctaNav.href}
            className="mt-4 w-full"
            size="lg"
            arrow
            onClick={() => trackEvent("demo_cta_click", { location: "mobile_menu" })}
          >
            {ctaNav.label}
          </Button>
        </div>
      )}
    </header>
  );
}

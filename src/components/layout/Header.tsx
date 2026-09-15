"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ctaNav, navAnchors, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

/** Anchors always resolve to the landing page's sections, from any route. */
function resolveAnchorHref(href: string, pathname: string) {
  return pathname === "/" ? href : `/${href}`;
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  // Highlights whichever nav anchor's section is currently in the reading
  // band — driven by ScrollTrigger (the shared runtime), never a raw scroll
  // listener. Only meaningful on the homepage, where the sections live.
  useGSAP(
    () => {
      if (pathname !== "/") return;
      navAnchors.forEach(({ href }) => {
        const el = document.getElementById(href.slice(1));
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActiveHref(href);
          },
        });
      });
    },
    { dependencies: [pathname] },
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border-on-dark bg-[var(--color-canvas-dark)]">
      <div className="mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="font-display flex min-h-11 items-center text-2xl font-bold tracking-tight text-[var(--color-text-on-dark-primary)]"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navAnchors.map((link) => (
            <Link
              key={link.href}
              href={resolveAnchorHref(link.href, pathname)}
              aria-current={activeHref === link.href ? "true" : undefined}
              className={cn(
                "nav-link rounded-sm text-sm font-medium transition-colors duration-[var(--duration-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-on-dark-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-canvas-dark)]",
                activeHref === link.href
                  ? "text-[var(--color-text-on-dark-primary)]"
                  : "text-[var(--color-text-on-dark-secondary)] hover:text-[var(--color-text-on-dark-primary)]",
              )}
            >
              {link.label}
              <span className="nav-underline" aria-hidden />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={ctaNav.href}
            variant="cta"
            className="text-sm"
            onClick={() => trackEvent("demo_cta_click", { location: "header" })}
          >
            {ctaNav.label}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-on-dark text-[var(--color-text-on-dark-primary)] lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Always mounted (not conditionally rendered) so it can play its own
          exit transition instead of vanishing instantly. */}
      <div
        id="mobile-nav"
        className={cn(
          "mobile-menu border-t border-border-on-dark bg-[var(--color-canvas-dark)] px-6 py-6 lg:hidden",
          mobileOpen && "is-open",
        )}
        inert={!mobileOpen ? true : undefined}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {navAnchors.map((link) => (
            <Link
              key={link.href}
              href={resolveAnchorHref(link.href, pathname)}
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-base font-medium text-[var(--color-text-on-dark-secondary)] hover:bg-white/[0.04] hover:text-[var(--color-text-on-dark-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button
          href={ctaNav.href}
          variant="cta"
          className="mt-4 w-full text-sm"
          onClick={() => {
            trackEvent("demo_cta_click", { location: "mobile_menu" });
            closeMobileMenu();
          }}
        >
          {ctaNav.label}
        </Button>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-5 block px-3 text-sm text-[var(--color-text-on-dark-muted)]"
        >
          {siteConfig.email}
        </a>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ctaNav, navAnchors, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

/** Anchors always resolve to the landing page's sections, from any route. */
function resolveAnchorHref(href: string, pathname: string) {
  return pathname === "/" ? href : `/${href}`;
}

export function Header({ appUrl }: { appUrl?: string }) {
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

  // Highlights whichever nav anchor's section is in the reading band, driven
  // by ScrollTrigger. Only meaningful on the homepage, where sections live.
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
    <header className="sticky top-0 z-50 border-b border-[var(--straw-border)] bg-[var(--straw-bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-[var(--straw-container)] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="straw-heading flex min-h-11 items-center text-2xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--straw-accent)]"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navAnchors.map((link) => (
            <Link
              key={link.href}
              href={resolveAnchorHref(link.href, pathname)}
              aria-current={activeHref === link.href ? "true" : undefined}
              className="straw-link rounded-sm text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {appUrl ? (
            <a href={appUrl} className="straw-btn straw-btn-secondary">
              Log in
            </a>
          ) : null}
          <Link
            href={ctaNav.href}
            className="straw-btn straw-btn-primary"
            onClick={() => trackEvent("demo_cta_click", { location: "header" })}
          >
            {ctaNav.label}
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--straw-border)] text-[var(--straw-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--straw-accent)] lg:hidden"
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

      {/* Always mounted so it can play its own exit transition; `inert` keeps
          it out of the tab order and accessibility tree while closed. */}
      <div
        id="mobile-nav"
        className={cn(
          "mobile-menu border-t border-[var(--straw-border)] bg-[var(--straw-bg)] px-6 py-6 lg:hidden",
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
              className="rounded-lg px-3 py-3 text-base font-medium text-[var(--straw-text)] hover:bg-[var(--straw-accent-soft)]"
            >
              {link.label}
            </Link>
          ))}
          {appUrl ? (
            <a
              href={appUrl}
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-base font-medium text-[var(--straw-text)] hover:bg-[var(--straw-accent-soft)]"
            >
              Log in
            </a>
          ) : null}
        </nav>
        <Link
          href={ctaNav.href}
          className="straw-btn straw-btn-primary mt-4 w-full"
          onClick={() => {
            trackEvent("demo_cta_click", { location: "mobile_menu" });
            closeMobileMenu();
          }}
        >
          {ctaNav.label}
        </Link>
      </div>
    </header>
  );
}

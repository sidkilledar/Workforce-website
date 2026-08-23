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
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeHref, setActiveHref] = useState<string | null>(null);

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
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow] duration-300",
        scrolled || mobileOpen
          ? "border-[var(--color-border)] bg-[var(--color-canvas)]/95 shadow-[0_1px_0_rgba(23,19,16,0.03),0_8px_24px_-16px_rgba(23,19,16,0.14)] backdrop-blur-lg"
          : "border-transparent bg-[var(--color-canvas)]/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="font-display flex min-h-11 items-center text-lg font-semibold tracking-tight text-[var(--color-text-primary)]"
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
                "text-sm font-medium transition-colors duration-[var(--duration-ui)]",
                activeHref === link.href
                  ? "text-[var(--color-signal-strong)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
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
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-primary)] lg:hidden"
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

      {/* Always mounted (not conditionally rendered) so it can play its own
          exit transition instead of vanishing instantly. */}
      <div
        id="mobile-nav"
        className={cn(
          "mobile-menu border-t border-[var(--color-border)] bg-[var(--color-canvas)] px-6 py-6 lg:hidden",
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
          onClick={() => {
            trackEvent("demo_cta_click", { location: "mobile_menu" });
            closeMobileMenu();
          }}
        >
          {ctaNav.label}
        </Button>
      </div>
    </header>
  );
}

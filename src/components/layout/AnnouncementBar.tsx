"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { announcement } from "@/lib/site-config";

/** Anchors always resolve to the landing page's sections, from any route. */
function resolveAnchorHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

/** Renders nothing when `announcement` is unset — never affects header layout. */
export function AnnouncementBar() {
  const pathname = usePathname();
  if (!announcement) return null;

  return (
    <div className="border-b border-[var(--color-border-on-dark)] bg-[var(--color-canvas-dark)] px-6 py-2.5 text-center">
      <Link
        href={resolveAnchorHref(announcement.href, pathname)}
        className="label-mono inline-flex items-center gap-2 text-[var(--color-text-on-dark-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-on-dark-primary)]"
      >
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-signal)]" aria-hidden />
        {announcement.message}
      </Link>
    </div>
  );
}

import Link from "next/link";
import { announcement } from "@/lib/site-config";

/** Renders nothing when `announcement` is unset — never affects header layout. */
export function AnnouncementBar() {
  if (!announcement) return null;

  return (
    <div className="bg-[var(--color-canvas-dark)] px-6 py-2.5 text-center">
      <Link
        href={announcement.href}
        className="label-mono inline-flex items-center gap-2 text-[var(--color-text-on-dark-secondary)] transition-colors hover:text-[var(--color-text-on-dark-primary)]"
      >
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-signal)]" aria-hidden />
        {announcement.message}
      </Link>
    </div>
  );
}

"use client";

export function LinkedInPlaceholder() {
  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      title="LinkedIn — coming soon"
      aria-label="LinkedIn (coming soon)"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05C21.9 8.59 23 10.86 23 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.03-3.32-2.03 0-2.34 1.59-2.34 3.22V21h-4V9Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}

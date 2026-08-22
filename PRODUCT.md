# WorkforceOS — Product & Design Reference

`"buildPath": "comp"`

This is the durable reference for the marketing site redesign. It records the product identity, the design system, the information architecture, and the content rules the landing page and demo page must follow. Implementation should trace back to the approved visual comp (desktop + mobile) generated alongside this document.

## Product identity

WorkforceOS is the **AI ops manager for shift-based teams**. It replaces the usual patchwork — a scheduling app, Slack or Discord, and a stream of texts and emails — with one system that actually runs the day: it schedules staff around real availability, learns patterns from the operation's own history rather than a big upfront rules setup, and resolves exceptions (call-outs, no-shows, headcount changes) through backfill, reassignment, or notification — behind a configurable human-approval layer. Team messaging and notifications live where the schedule lives.

One-liner: "WorkforceOS is the AI ops manager for shift-based teams — it schedules your staff, absorbs the daily chaos, and keeps managers in the loop instead of in the weeds."

Primary conversion: **Book a Demo**. Everything on the landing page points there.

Audience: businesses whose workforce is mostly students or hourly staff — caterers staffing events, restaurant groups, and campus sports & recreation departments. Active pilots: **Olive & Vine** and **UC Davis Rec Sports** (named plainly on the site; no quotes or logos until they approve something for publication).

## Visual identity — "living operations network"

Moving away from the incumbent identity (violet/cobalt/cyan gradients, glassy blur-blob panels, a fictional dashboard mock reused everywhere). The new identity is a **warm, tactile operations console**: paper instead of gradient glass, ink instead of blurple, one signal color instead of three accent hues, real operational diagrams instead of app screenshots.

### Palette

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#F1ECDE` | primary paper background |
| `--color-canvas-raised` | `#E7DFC9` | recessed/well surfaces |
| `--color-canvas-elevated` | `#FBF8F0` | elevated cards |
| `--color-text-primary` | `#171310` | ink — headings, body |
| `--color-text-secondary` | ink @ 66% | supporting copy |
| `--color-text-muted` | ink @ 46% | captions, meta |
| `--color-signal` | `#FF4E1F` | the one high-visibility accent — CTAs, live/active states, resolved pulses |
| `--color-signal-strong` | `#E0430F` | hover/pressed, AA-contrast label text on paper |
| `--color-signal-soft` | `#FFD9C4` | tint fills, badges |
| `--color-status-resolved` | muted sage | utility only, never a brand color |
| `--color-status-wait` | ink @ 40% | utility only |
| `--color-canvas-dark` | `#15110C` | Hero / Operating Loop / Final CTA ink blocks |

No gradients-as-identity. No blurred color blobs. Texture comes from a hairline grid, paper grain, and the perforated "event slip" motif — not glow.

### Type

- **Display — Fraunces** (already loaded via `next/font`): editorial, warm, used with restraint for headlines.
- **Body — Geist Sans**: clean, quiet, carries the reading experience.
- **Data/operational — Geist Mono**: elevated to a real role — timestamps, location codes, ticket numbers, status tags. This is what makes the "dispatch ticket" motif read as real rather than decorative.

### Signature element — "The Loop"

A radial diagram: location markers around the edge feed small perforated-edge event-slip tickets (mono timestamps) along curved paths into a center hub. The hub pulses signal-orange as it resolves an event, then returns to a quiet resolved state. Appears twice:

1. **Ambient** — small, decorative, `aria-hidden`, in the Hero.
2. **Literal** — the Sense → Plan → Act → Verify explainer (section 6), scroll-driven on desktop, stacked/readable on mobile, with a text equivalent for anyone without motion or JS.

### Motif — event slip

A card with a dashed/perforated edge and a mono label, used for scenario-timeline entries, capability trigger/action/outcome groupings, and the announcement bar. Reinforces the "operational events flowing through a loop" concept directly rather than decoratively.

## Information architecture

**Public routes:** `/` (landing), `/demo` (booking), `/legal/privacy`, `/legal/terms`.

**Primary nav (anchors on the landing page):** How It Works, What It Handles, Customers, Who It's For, plus Book a Demo.

**Left intact, out of primary nav (existing routes, not redesigned in this pass):** `/product`, `/pricing`, `/about`, `/industries` and its subpages. These inherit the new global color tokens automatically (tokens were replaced, not duplicated, per the "don't blend two identities" rule) but their content/layout is untouched and may look inconsistent until they get their own pass.

## Landing page sections (in order)

1. Utility announcement (optional, content-gated)
2. Header
3. Hero
4. Customer trust strip (logo-gated on approved `customerProof`)
5. Operational problem
6. AI operating loop — Sense → Plan → Act → Verify (signature section)
7. What it handles — 4 capability stories (scheduling & staffing, learns your operation, handles exceptions automatically, one comms channel)
8. Scenario walkthrough — illustrative call-out timeline
9. Operation outcomes — qualitative only
10. Customer stories (gated on approved `customerProof`)
11. Who it's for — 3–5 audience segments
12. Implementation and control
13. Final conversion
14. Footer

## Content rules

- No fabricated quotes, logos, metrics, integrations, or certifications. `customerProof` (quote + logo + attribution) stays empty until Olive & Vine or UC Davis Rec Sports approve something for publication — components gated on it render nothing (not empty placeholder cards) while empty.
- Pilot names (`pilotCustomers`) may be stated plainly as a fact ("in active pilots with...") anywhere on the site — that's distinct from `customerProof` and doesn't require a quote or logo.
- The scenario walkthrough is explicitly labeled illustrative unless/until it reflects an approved customer workflow.
- Operation outcomes are qualitative claims only — no ROI calculators, no invented numbers.
- Integration claims only appear if technically confirmed (none are, currently — omit).

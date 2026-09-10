# WorkforceOS — Product & Design Reference

`"buildPath": "comp"`

This is the durable reference for the marketing site. It records the product identity, the design system, the motion system, the information architecture, and the content rules the landing page and demo page must follow.

## Product identity

WorkforceOS is an **operational intelligence platform for frontline businesses**. It connects the systems a business already uses — POS, scheduling, payroll, inventory, and communication tools — and brings the important information into one configurable manager dashboard. It helps managers handle scheduling, employee communication, labor forecasting, inventory tracking, operational workflows, and day-to-day exceptions from one place.

It does more than display data. It uses operational information to help managers understand what is happening, predict what is likely to happen next, identify what needs attention, and coordinate the appropriate response.

It is configurable around each organization's existing processes — roles, permissions, staffing rules, approval chains, terminology, dashboards, and workflows. Businesses decide which actions AI should **recommend**, which **require manager approval**, and which can **run automatically**.

One-liner: "WorkforceOS is the intelligent operating layer across the systems a frontline business already runs — one place for managers to see, understand, predict, and act on the operation."

Primary conversion: **Request a Demo** → `/demo`. Everything on the landing page points there.

Audience: frontline businesses whose workforce is mostly students or hourly staff — caterers staffing events, restaurant groups, and campus sports & recreation departments, plus hospitality, retail, and multi-location hourly teams generally. Active customer pilots: **Olive & Vine** and **UC Davis Rec Sports**, supporting **1,000+ frontline users across their teams**. This means two customer organizations and more than 1,000 users — never 1,000 customers. Olive & Vine reports saving 10–15 operations hours each week. UC Davis Rec Sports reports easier scheduling, communication, and emergency coverage, while WorkforceOS learns how recurring events are staffed from shift history. Distinct from `customerProof` (quote + logo + attribution), which stays empty until either pilot approves a direct quotation or logo for publication.

## Capabilities

### Six operating areas (`confirmedCapabilities` in `site-config.ts`, array order)

1. **Scheduling & staffing** — build and fill shifts around submitted availability, roles, and qualifications, with one view of open roles, coverage, and assignments.
2. **Day-to-day exceptions** — call-outs, no-shows, and headcount changes resolve through backfill, reassignment, notification, or an approval request.
3. **Employee communication** — messages and notifications attach to the schedule event, task, or shift they relate to, so the team sees updates in context.
4. **Labor forecasting** — projects labor demand per shift and role from sales history, staffing patterns, and the calendar, and flags likely staffing gaps.
5. **Inventory tracking** — tracks stock levels across locations, raises low-stock and reorder alerts, and reads inventory against projected demand.
6. **Operational workflows** — configurable sequences (coverage, opening/closing, approvals, escalations, event staffing) that run to the authority boundary you set.

### Intelligence layer (`intelligenceLayer`)

Connect → Understand → Predict → Act. WorkforceOS reads the operational picture across connected systems and turns it into what a manager needs: what's happening now, what's coming next, what needs attention, and what to do about it.

### Configurability (`configurability`)

Shaped to each operation: roles & permissions, staffing rules, approval chains, terminology, dashboards, workflows. One platform, not a separate build per location.

### AI authority

For every workflow the business chooses whether WorkforceOS **recommends** an action, **requires manager approval**, or runs it **automatically** and logs it. Managers can override anything; every action is recorded.

`src/lib/site-config.test.ts` enforces the six-slug order, field completeness, and the (legal-only) claim boundaries.

## Visual identity — "living operations network"

A warm, tactile operations console: paper instead of gradient glass, ink instead of blurple, one signal color instead of three accent hues, real operational diagrams instead of app screenshots. No gradients-as-identity, no blurred color blobs.

### Palette

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#f1ece0` | primary paper background |
| `--color-canvas-raised` | `#e8e0cd` | card borders / recessed surfaces |
| `--color-canvas-elevated` | `#fcfaf5` | elevated cards, buttons |
| `--color-canvas-features` | `#f6f1e9` | Features band, Proof band, BrowserMock panel |
| `--color-text-primary` | `#17130f` | ink — headings, body |
| `--color-text-secondary` | ink @ 66% | supporting copy |
| `--color-text-muted` | ink @ 60% | captions, meta |
| `--color-signal` | `#697d71` | sage — decorative / active states, rails, dots |
| `--color-signal-strong` | `#3f5648` | AA text, links, icons and fills on paper |
| `--color-signal-soft` | `#dbe3dc` | tint fills, badges |
| `--color-canvas-dark` | `#23201a` | navbar, charcoal sections, footer |
| `--color-canvas-dark-raised` | `#2d2a22` | raised surfaces on charcoal |
| `--color-canvas-hero` | `#57685e` | Hero + Final CTA sage band |
| `--color-text-on-dark-primary` | `rgba(252,250,245,0.98)` | headings on charcoal / sage |
| `--color-text-on-dark-secondary` | `rgba(252,250,245,0.82)` | body on dark |
| `--color-text-on-dark-muted` | `rgba(252,250,245,0.62)` | meta on dark |
| `--color-border-on-dark` | `rgba(252,250,245,0.24)` | hairlines on dark |

### Type

- **Display — Fraunces** (variable, `SOFT` 0 / `WONK` 1): editorial, warm, two-weight headings (light line + bold line).
- **Body — Plus Jakarta Sans** (`--font-sans`): clean, quiet, carries the reading experience.
- **Data/operational — JetBrains Mono** (`--font-mono`, `.label-mono`): timestamps, ticket numbers, status tags — the "dispatch ticket" motif.

### Signature element — "The Loop"

A radial diagram: source markers around the edge feed small event-slip tickets along curved paths into a center hub. Two modes (`LoopDiagram` component):

- **`mode="hero"`** — plays once when it enters view (path draws, one event travels in, the hub resolves), then settles into the page's one allowed continuous mobile animation: a slow ambient pulse that pauses whenever the diagram is offscreen, the tab is hidden, or the viewer prefers reduced motion.
- **`mode="loop-section"`** — driven by the Sense→Plan→Act→Verify scroll narrative's `activeIndex`. Stage emphasis crossfades via a CSS transition; exactly one event travels in per stage change. No continuous pulse — this is what keeps the mobile stacked fallback (four diagram instances mounted at once) from running four simultaneous infinite animations.

### Motif — event slip / ticket

A card with a dashed/perforated edge (`.ticket-slip`) and a mono label, used for the problem section's disconnected sources, scenario-timeline entries, and capability-chapter examples.

## Motion system

Tokens (`globals.css` `:root`): `--ease-out`, `--ease-in-out`, `--duration-press` (140ms), `--duration-ui` (220ms), `--duration-state` (300ms), `--duration-narrative` (700ms).

Reveal variants (`Reveal` component, `variant` prop): `soft` (opacity + translateY(16px), 500ms), `clip` (heading clip-path wipe, 650ms), `state` (opacity + translateY(8px), 220ms), `none` (immediately visible). Scroll-triggered reveals go through `useInView` (one-shot, latches true); continuous/ambient effects go through `useAmbientActive` (live — pauses offscreen, tab-hidden, or reduced-motion) — both in `src/lib/motion.ts`.

The hero's command-center animation is the primary attention moment and runs once before settling. The remaining sections use restrained entrance and state transitions without pinned narrative scrolling.

Reduced motion (`globals.css` media query) removes translation, scaling, path travel, and continuous pulses, but keeps a ~180ms opacity transition so state changes still register as feedback rather than an instant snap. No content is ever hidden by an animation that fails to run — every "undrawn"/"untraveled" base state renders fully visible by default; the animation is additive.

## Information architecture

**Public routes:** `/` (landing), `/demo` (booking), `/legal/privacy`, `/legal/terms` — that's the complete route surface. `/product`, `/pricing`, `/about`, and `/industries*` permanently redirect (`next.config.ts`) to landing-page anchors or `/demo`; their page files and the components used only by them (`OperationsPanel`, `CapabilityVisual`, `IndustryDetail`, `PageHero`) have been removed rather than left as dead code behind a redirect.

**Primary nav (`navAnchors`):** Platform (`#capabilities`), How it works (`#how-it-works`), AI control (`#ai-control`), plus Request a Demo.

## Landing page sections (in order)

1. Hero — the operational-intelligence promise plus an animated manager dashboard mock (`BrowserMock`).
2. Pilot strip — aggregate factual proof (no names).
3. Connected systems (`connectedSystems`) — the stack WorkforceOS sits across.
4. Patchwork problem — why running the operation across disconnected apps costs managers time.
5. Features — the six operating areas (`FeatureGrid`) plus the connected-systems chips.
6. Intelligence layer (`intelligenceLayer`) — Connect → Understand → Predict → Act, the "more than a dashboard" differentiator.
7. How it works — practical rollout path.
8. Configure & AI control — `configurability` items plus Inform / Recommend / Execute authority.
9. Proof — the two named pilots and their results (the only section with names).
10. FAQ, then final CTA.

## Content rules

- No fabricated quotes, logos, metrics, or named vendor integrations. Approved factual pilot claims are limited to: two customer pilots, 1,000+ frontline users across their teams, Olive & Vine saving 10–15 operations hours each week, and UC Davis Rec Sports seeing easier scheduling, communication, and emergency coverage while the product learns recurring event staffing from shift history. `customerProof` stays empty until Olive & Vine or UC Davis Rec Sports approves a direct quotation or logo for publication.
- Pilot NAMES and their per-customer RESULTS (including the "10–15 hours" figure) appear in **exactly one** rendered homepage section — the Proof section. The hero, announcement bar, and system strips use the aggregate only ("1,000+ frontline users", "2 active pilots").
- Pilot names (`pilotCustomers`) may otherwise be stated plainly as a fact — distinct from `customerProof`, no quote/logo required.
- The scenario walkthrough is explicitly labeled illustrative.
- Scheduling, day-to-day exceptions, employee communication, labor forecasting, inventory tracking, and operational workflows are the six operating areas, described directly as platform capabilities.
- Forecasting, prediction, inventory, and cross-system connection (POS, payroll) are all in scope and stated plainly. Keep the framing "configured around the systems you already run"; do not name specific vendor integrations or partner logos as live.
- Short banned list (legal/compliance exposure only): "guarantee", "certification", "certified", "hipaa", "soc 2", "pci compliant".

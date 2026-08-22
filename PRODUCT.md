# WorkforceOS — Product & Design Reference

`"buildPath": "comp"`

This is the durable reference for the marketing site. It records the product identity, the design system, the motion system, the information architecture, and the content rules the landing page and demo page must follow.

## Product identity

WorkforceOS is the **AI ops manager for shift-based teams**. It replaces the usual patchwork — a scheduling app, Slack or Discord, and a stream of texts and emails — with one system that actually runs the day: it schedules staff around real availability, learns patterns from the operation's own history rather than a big upfront rules setup, and resolves exceptions (call-outs, no-shows, headcount changes) through backfill, reassignment, or notification — behind a configurable human-approval layer. Team messaging and notifications live where the schedule lives.

One-liner: "WorkforceOS is the AI ops manager for shift-based teams — it schedules your staff, absorbs the daily chaos, and keeps managers in the loop instead of in the weeds."

Primary conversion: **Book a Demo**. Everything on the landing page points there.

Audience: businesses whose workforce is mostly students or hourly staff — caterers staffing events, restaurant groups, and campus sports & recreation departments. Active pilots: **Olive & Vine** and **UC Davis Rec Sports**, named plainly wherever the site references active pilots (`pilotCustomers`). Distinct from `customerProof` (quote + logo + attribution), which stays empty until either pilot approves something specific for publication.

## The four confirmed capabilities (the complete present-day offer)

1. **Scheduling & staffing** — builds and fills shifts around submitted availability. No forecasting, labor-optimization, or certification claims.
2. **Learns your operation** — recognizes recurring patterns from operating history to lighten setup over time. No predictive-accuracy or autonomous-policy claims — it disclaims prediction explicitly ("recognizing what repeats, not predicting the future").
3. **Handles exceptions automatically** — call-outs, no-shows, headcount changes resolve via backfill, reassignment, notification, or a request for approval. Nothing else.
4. **One communication channel** — messages and notifications attach to the schedule event they relate to, instead of living in a separate app.

Every capability chapter (`capabilityStories` in `site-config.ts`) carries all six fields: `trigger`, `inputs`, `action`, `managerControl`, `result`, `example`. `src/lib/site-config.test.ts` enforces field completeness and the claim boundaries above.

## Visual identity — "living operations network"

A warm, tactile operations console: paper instead of gradient glass, ink instead of blurple, one signal color instead of three accent hues, real operational diagrams instead of app screenshots. No gradients-as-identity, no blurred color blobs.

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

### Type

- **Display — Fraunces**: editorial, warm, used with restraint for headlines.
- **Body — Geist Sans**: clean, quiet, carries the reading experience.
- **Data/operational — Geist Mono**: timestamps, ticket numbers, status tags — the "dispatch ticket" motif.

### Signature element — "The Loop"

A radial diagram: source markers around the edge feed small event-slip tickets along curved paths into a center hub. Two modes (`LoopDiagram` component):

- **`mode="hero"`** — plays once when it enters view (path draws, one event travels in, the hub resolves), then settles into the page's one allowed continuous mobile animation: a slow ambient pulse that pauses whenever the diagram is offscreen, the tab is hidden, or the viewer prefers reduced motion.
- **`mode="loop-section"`** — driven by the Sense→Plan→Act→Verify scroll narrative's `activeIndex`. Stage emphasis crossfades via a CSS transition; exactly one event travels in per stage change. No continuous pulse — this is what keeps the mobile stacked fallback (four diagram instances mounted at once) from running four simultaneous infinite animations.

### Motif — event slip / ticket

A card with a dashed/perforated edge (`.ticket-slip`) and a mono label, used for the problem section's disconnected sources, scenario-timeline entries, and capability-chapter examples.

## Motion system

Tokens (`globals.css` `:root`): `--ease-out`, `--ease-in-out`, `--duration-press` (140ms), `--duration-ui` (220ms), `--duration-state` (300ms), `--duration-narrative` (700ms).

Reveal variants (`Reveal` component, `variant` prop): `soft` (opacity + translateY(16px), 500ms), `clip` (heading clip-path wipe, 650ms), `state` (opacity + translateY(8px), 220ms), `none` (immediately visible). Scroll-triggered reveals go through `useInView` (one-shot, latches true); continuous/ambient effects go through `useAmbientActive` (live — pauses offscreen, tab-hidden, or reduced-motion) — both in `src/lib/motion.ts`.

At most one pinned scroll narrative on the page: the Operating Loop section (`ScrollStory`). Everything else (Problem, Scenario, Capability Chapters, Audience Workflows) reveals on normal scroll via `useInView`/`Reveal` — no pinning. Only transforms, opacity, clip-path, and SVG stroke properties are animated; the one pragmatic exception is the FAQ's native `<details>` disclosure, which animates opacity only via `::details-content` (a browser-native mechanism, not a custom accordion) so keyboard/screen-reader semantics stay untouched.

Reduced motion (`globals.css` media query) removes translation, scaling, path travel, and continuous pulses, but keeps a ~180ms opacity transition so state changes still register as feedback rather than an instant snap. No content is ever hidden by an animation that fails to run — every "undrawn"/"untraveled" base state renders fully visible by default; the animation is additive.

## Information architecture

**Public routes:** `/` (landing), `/demo` (booking), `/legal/privacy`, `/legal/terms` — that's the complete route surface. `/product`, `/pricing`, `/about`, and `/industries*` permanently redirect (`next.config.ts`) to landing-page anchors or `/demo`; their page files and the components used only by them (`OperationsPanel`, `CapabilityVisual`, `IndustryDetail`, `PageHero`) have been removed rather than left as dead code behind a redirect.

**Primary nav (anchors on the landing page):** How It Works, What It Handles, Active Pilots, Who It's For, plus Book a Demo.

## Landing page sections (in order)

1. Hero — the four-part promise (Schedule, Learn, Resolve, Communicate) plus the one-shot operating-loop animation.
2. Active pilots (`CustomerTrustStrip`) — named plainly (`pilotCustomers`); logos render only once `customerProof` has real entries.
3. The broken workflow (`ProblemSection`) — one call-out duplicated across scheduling app / Slack-Discord / text / email, routing into one loop.
4. Operating loop (`OperatingLoop`) — Sense → Plan → Act → Verify, the signature scroll-driven section.
5. What it handles (`CapabilityStories`) — four full narrative chapters, not a feature grid.
6. Scenario walkthrough (`ScenarioWalkthrough`) — grouped into the same four stages, with an automatic-vs-approval-required branch at Verify.
7. Who it's for (`AudienceSegments`) — three segments, each with a small workflow diagram.
8. Implementation and control (`ImplementationControl`) — native-`<details>` FAQ.
9. Final CTA (`FinalCta`) — Book a Demo, restated outcome.

## Content rules

- No fabricated quotes, logos, metrics, integrations, or certifications. `customerProof` stays empty until Olive & Vine or UC Davis Rec Sports approve something specific for publication.
- Pilot names (`pilotCustomers`) may be stated plainly as a fact anywhere on the site — distinct from `customerProof`, no quote/logo required.
- The scenario walkthrough is explicitly labeled illustrative; every step carries a `textEquivalent` for the branch that doesn't rely on visual layout to convey which outcome it is.
- No forecasting, labor-optimization, certification, task-management, or predictive-accuracy claims anywhere — `site-config.test.ts` guards this for the capability/scenario/FAQ content.
- Integration claims only appear if technically confirmed (none are, currently — omit).

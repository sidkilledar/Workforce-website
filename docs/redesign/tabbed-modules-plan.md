# Tabbed module restructure — implementation plan

## 1. Objective

Two problems, one structural fix:

1. The page currently reads as a scheduling tool with a few footnotes about other workflows (hero, main demo, and communication section are all the coverage-request scenario; inventory/forecasting/tasks are three small rows further down; the AI permission layer is buried text under the config rule sheet).
2. We need to prove breadth (scheduling, communication, inventory, forecasting, tasks, AI control) **without** flattening our actual strength (scheduling + communication are the deepest, most differentiated capabilities).

Structural answer, borrowed from how Marble organizes their solution section (tab bar swapping content inside one fixed frame, not five separate full-width sections) — adapted so tab *order and depth* signal where we're strongest, not just that we're broad.

## 2. What stays, what changes

| Section (current) | Disposition |
|---|---|
| Header | unchanged |
| Hero (`Hero`) | lightened — remove/shrink the embedded `EventRecord`, lead with headline + one-liner + CTAs |
| Proof strip (`ProofStrip`) | unchanged |
| Coordination problem (`CoordinationProblem`) | unchanged — this is the "recognize your workday" section, still scheduling-flavored by design, stays before the module frame |
| Platform explanation (`PlatformExplanation`) | unchanged — architecture diagram already shows scheduling/sales/inventory/messages as inputs, good breadth signal, keep as-is |
| **NEW: Capability list** | insert after `PlatformExplanation`, before the module frame |
| Execution demo (`ExecutionDemo` → `WorkflowDemonstration`) | absorbed into new **Module Frame**, tab 1 (Scheduling) |
| Communication (`Communication` → `CommunicationExample`) | absorbed into new **Module Frame**, tab 2 |
| Intelligence scenarios (`IntelligenceScenarios`) | split — Inventory content becomes tab 3, Tasks content becomes tab 4 (Forecasting folded into tab 3 or dropped to keep tab count sane — see §5) |
| Configuration (`Configuration` → `ConfigurationExample`) | AI permission control extracted out, becomes **Module Frame tab 5 (Intelligence)**; the rule-sheet/context-selector part stays as its own lighter section right after the module frame |
| Integrations, CaseStories, Rollout, Faq, FinalCta | unchanged, unchanged order |

Net effect: five sections collapse into one module frame + one slimmer configuration section. Page gets shorter, not longer.

## 3. New section: capability list

Purpose: Marble's "16 capabilities in two columns" — scannable breadth signal in ~5 seconds, before any deep example, so the module frame that follows isn't visitors' first exposure to scope.

- Placement: directly under `PlatformExplanation`, light cream background, no dark section between it and the module frame (keep momentum into the demo).
- Layout: two (mobile: one) columns of plain rows, no cards — label + 3-6 word descriptor. Reuse `.op-eyebrow`/mono label styling for consistency, not a new visual language.
- Content grouping (not final copy, structural buckets):
  - Scheduling: shift coverage, availability matching, manager approval
  - Communication: outreach, response tracking, escalation
  - Inventory: stock thresholds, replenishment tasks
  - Forecasting: demand vs. coverage comparison
  - Tasks: ownership, deadlines, escalation
  - Configuration: rules, approvals, terminology per operation
  - Integrations: existing systems, one-way and two-way sync
  - AI control: suggest / approve / run-within-rules
- No animation — static list, this section's job is speed-of-read, not delight.

## 4. Module frame — architecture

This is the centerpiece replacing the current `ExecutionDemo` dark section.

### 4.1 Component shape

New component: `ModuleFrame` in `OperationsInteractive.tsx`, replacing the standalone rendering of `WorkflowDemonstration` / `CommunicationExample` inside `BusinessHomepage.tsx`. Internally still composes the existing three interactive components plus two new lighter ones — no rewrite of the working demo/communication/configuration logic, just a new shell around them.

```
ModuleFrame
├── tab bar (5 tabs, horizontal, same visual language as existing op-segment control)
├── eyebrow line under tab bar (see §4.4)
└── active panel (one of):
    ├── WorkflowDemonstration      (tab: Scheduling)   — existing component, unchanged
    ├── CommunicationExample       (tab: Communication) — existing component, unchanged
    ├── InventoryPanel             (tab: Inventory)     — new, lighter
    ├── TaskPanel                  (tab: Tasks)         — new, lighter
    └── IntelligencePanel          (tab: Intelligence)  — new, extracted from ConfigurationExample's permission block
```

- Frame stays on the charcoal background (current `ExecutionDemo` treatment) for all five tabs — one consistent "console" feel regardless of which domain is active.
- Frame height: fix a `min-height` on the panel container sized to the tallest panel (`WorkflowDemonstration`) so switching tabs doesn't jump-scroll the page. Shorter panels (Inventory/Tasks/Intelligence) vertically center or pad within that same box.
- Tab state: local `useState<number>`, default `0` (Scheduling). No URL/hash sync needed — this isn't deep-linkable content.
- Keyboard: tabs use `role="tablist"` / `role="tab"` / `role="tabpanel"` with arrow-key navigation (left/right cycles tabs), matching the accessibility bar already hit (100 Lighthouse a11y) — don't regress it.

### 4.2 Tab order and depth gradient (the differentiation mechanism)

| # | Tab | Depth | Why |
|---|---|---|---|
| 1 | Scheduling | Full — existing 6-step `WorkflowDemonstration` (detect → eligibility → contact → response → approval → complete), replay, exception path | Flagship. Default tab. Most interactive, most states. |
| 2 | Communication | Full — existing `CommunicationExample` (conversation + status panel, accept/decline branching) | Flagship. Second tab, not diluted into a "feature" bullet. |
| 3 | Inventory | Light — one static/lightly-interactive panel: stock chart + risk callout + one resulting task, no multi-step sequence | Breadth proof, intentionally simpler |
| 4 | Tasks | Light — task list with one overdue row and escalation label, same treatment as current `IntelligenceScenarios` "Tasks" row, just relocated | Breadth proof |
| 5 | Intelligence | Medium — the three-way permission control (`Suggest only / Require approval / Run within approved rules`) plus the one-line resulting-behavior text, given full-width focus since it's a control layer, not a workflow | Differentiator, deliberately set apart (see §4.4) |

The gradient itself is the "we're different" signal: two tabs get full step-by-step interactivity, two get a single static/light view, and the fifth is framed as a control layer rather than a sixth peer workflow. No copy needs to claim "we're best at scheduling" — the depth difference shows it.

### 4.3 Content sourcing for the two new light panels

- **InventoryPanel**: reuse the SVG stock-risk chart currently in `IntelligenceScenarios` (lines ~356-397 of `BusinessHomepage.tsx`) verbatim — it's already built and tested. Wrap in the same panel shell as the other tabs (workspace bar with a category label, matching `op-workflow-detail` styling).
- **TaskPanel**: reuse the `op-task-list` block from the current "Tasks / Campus recreation" row (lines ~399-435). Same wrapping approach.
- Forecasting content (the "Tomorrow's demand" bar chart, lines ~306-336) — folded as a secondary callout *inside* the Inventory tab rather than becoming a 6th tab (keeps tab count at 5, avoids a bar that's too crowded on mobile). Alternative: drop forecasting from the module frame entirely and leave it as a smaller mention in the capability list (§3) plus the case-stories section, since inventory+tasks already carry the "we're broad" message without it.
- **IntelligencePanel**: extract the `.op-permissions` block currently at the bottom of `ConfigurationExample` (lines 448-472 of `OperationsInteractive.tsx`) into its own component. It keeps its existing state/behavior (segment control + `aria-live` result text) — just gets promoted to full-panel treatment instead of a footnote.

### 4.4 Setting Intelligence apart visually

Per the earlier discussion — AI is a control layer across all four workflows, not a fifth peer domain. Treatments to consider (pick one, don't stack all three):

- **Position**: last tab, with a thin visual divider or extra gap before it in the tab bar (e.g. `Scheduling · Communication · Inventory · Tasks | Intelligence`).
- **Icon or label prefix**: small distinct marker (not color-only, per accessibility rules already established) — e.g. a small "layer" glyph next to the tab label.
- **Panel framing**: instead of a workspace-bar-and-detail layout like the other four, the Intelligence panel could visually overlay/underline that it governs the others — e.g. a one-line caption at the top like "Applies across every workflow above" rendered as plain text (own wording, not copied), before the permission control.

Keep this understated — the frame shouldn't gain a new visual language, just enough separation that a visitor doesn't read "Intelligence" as "yet another workflow we support."

### 4.5 Eyebrow line under tab bar

One line of plain text under the tab bar, own wording, something in the spirit of: "deepest on the two things every operation runs on." Sets expectation before clicking, so the depth gradient across tabs reads as intentional design, not an unfinished feature. Only shown once, doesn't change per tab.

## 5. Section that follows the module frame

`ConfigurationExample`'s rule-sheet + operating-context selector (the `contexts` segmented control + `op-rule-sheet` dl) stays as its own section directly after the module frame, under a header like the current "Fits the way your operation works." This keeps the "two configured examples of the same rule" demonstration intact — it's a different message (adaptability) from the permission control (authority), which is why splitting them is correct rather than just moving the whole `ConfigurationExample` wholesale.

Component change needed: `ConfigurationExample` currently renders rule sheet + permissions together (`OperationsInteractive.tsx:386-475`). Split into:
- `ConfigurationExample` (rule sheet + context selector only) — stays where `Configuration()` currently renders it in `BusinessHomepage.tsx`.
- `IntelligencePanel` (permission control only) — new export, rendered inside `ModuleFrame`.

Both can still share the `contexts`/`permissions` constants already defined near the top of `OperationsInteractive.tsx` if `IntelligencePanel` needs contextual language. Current `permission` state and `context` state are already independent `useState` calls in the single existing component, so the split is mechanical, not a behavior change.

## 6. Hero simplification

- Remove or drastically shrink the `EventRecord` currently embedded in the hero (`Hero()`, `BusinessHomepage.tsx:16-77`).
- New hero: category eyebrow, `<h1>`, one-paragraph value prop naming breadth explicitly in plain language (own wording — not Marble's), primary CTA, secondary CTA, reassurance line. No product visual, or at most a much smaller/quieter one (e.g. a single-line status strip, not a full event card) — matches Marble's text-first hero and immediately removes the "this is a scheduling screenshot" first impression.
- `EventRecord` component itself is untouched — still used by `WorkflowDemonstration`'s panel content and `FinalCta`'s completed-record close. Only its standalone hero placement goes away.

## 7. Data/content model changes

`src/lib/operations-scenario.ts` currently exports only `coverageScenario` (scheduling) and `workflowSteps` (scheduling). No new shared-scenario data is strictly required — Inventory/Tasks panels reuse the inline JSX/data already in `BusinessHomepage.tsx`'s `IntelligenceScenarios`, and the Intelligence panel reuses existing `contexts`/`permissions` arrays in `OperationsInteractive.tsx`. If inventory/task content should also share a single structured source (per the original plan's "one structured scenario source" principle), add:

```ts
export const inventoryScenario = { /* stock level, threshold, risk point */ };
export const taskScenario = { /* owner, deadline, escalation */ };
```

Optional — only worth doing if this content will be reused a second place later (e.g. in case stories). Not required for this restructure; flag as a "nice to have," not a blocker.

## 8. Responsive behavior

- Tab bar on mobile: horizontal scroll if 5 labels don't fit at 375px, OR collapse to a labeled single-select control — reuse whatever mobile pattern already exists for the workflow step list rather than inventing a new mobile control type.
- Panel content: each of the 5 panels must already have a mobile-safe layout — Scheduling and Communication already do (existing, tested). Inventory/Tasks panels are direct reuses of already-mobile-tested markup from `IntelligenceScenarios`. Intelligence panel is a straightforward stacked control, no new responsive risk.
- No new breakpoints should be needed; reuse `operations.css` patterns already in place for `op-workflow-detail`, `op-scenario-row`, `op-permissions`.

## 9. Testing impact

Existing tests to update, not rewrite (per `OperationsInteractive.test.tsx`):
- `WorkflowDemonstration` and `CommunicationExample` tests stay valid — component behavior unchanged, only their wrapper changes.
- `ConfigurationExample` test (`configured setup` describe block) — the assertions on `permission`/`aria-pressed` move to a new `IntelligencePanel` test; the `context`/rule-sheet assertions stay on the (now smaller) `ConfigurationExample`.
- New: `ModuleFrame` test — tab click switches active panel, keyboard arrow navigation moves focus/selection, default tab is Scheduling, one test confirming the panel container doesn't change height between tabs (or at least that a `min-height` is applied) to guard the no-jump-scroll requirement.

## 10. CSS impact

- New: `.op-module-frame`, `.op-module-tabs`, `.op-module-eyebrow`, `.op-module-panel` (or similar) added to `operations.css`, styled from the existing `.op-event`/`.op-workflow-detail`/dark-section tokens already defined — no new color values needed, this is a layout wrapper, not a new visual system.
- Remove: the standalone dark-section wrapper currently around `ExecutionDemo` (folds into the module frame's own charcoal panel) and the light-section wrapper currently around `Communication()` (also folds in) — check for orphaned selectors after the JSX move and prune from `operations.css` rather than leaving dead rules.
- Adjust: `.op-scenario-row` styling currently serves 3 rows in `IntelligenceScenarios` — after Inventory/Tasks move into the module frame, confirm nothing else still depends on that class before deleting; Forecasting content (if kept per §4.3 alternative) may still use a trimmed version of it.

## 11. Build order (so nothing is broken mid-work)

1. Extract `IntelligencePanel` out of `ConfigurationExample` (mechanical split, run tests, confirm both halves still pass).
2. Build `InventoryPanel` and `TaskPanel` as thin wrappers around the existing chart/list markup (moved, not rewritten).
3. Build `ModuleFrame` shell (tabs + panel switcher + a11y wiring), wire in all 5 panels.
4. Replace `ExecutionDemo()` and `Communication()` calls in `BusinessHomepage()`'s render with a single `ModuleFrame` call; remove the now-empty `ExecutionDemo`/`Communication` functions and the Inventory/Tasks rows from `IntelligenceScenarios` (trim that function down to Forecasting-only, or remove entirely per §4.3 alternative).
5. Insert the new capability list section after `PlatformExplanation`.
6. Simplify `Hero()`.
7. Update/add tests per §9.
8. Full pass: `npx tsc --noEmit`, `npx vitest run`, `npx eslint .`, Lighthouse re-check on `/` (expect no regression from the current 100/100/100/100), manual click-through of all 5 tabs at desktop + 375px width, keyboard-only tab navigation check.

## 12. Explicit non-goals

- Not copying Marble's wording, imagery, icons, or metrics presentation style.
- Not adding a logo carousel (current proof strip stays text/number based, per original plan).
- Not turning Integrations/CaseStories/Rollout/Faq/FinalCta into tabbed modules — those sections already work and aren't part of the "looks scheduling-only" complaint.
- Not adding forecasting as a 6th tab (see §4.3) unless review after building shows Inventory-with-forecasting-folded-in feels crowded, in which case revisit as a 6-tab layout with a smaller minimum tab-label width.

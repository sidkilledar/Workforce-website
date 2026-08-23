---
target: WorkforceOS landing page (BusinessHomepage.tsx rewrite)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-23T20-20-49Z
slug: src-app-page-tsx
---
# Design Health Score (Nielsen heuristics, Persuade-mode page) -- RE-RUN after homepage rewrite
24/32 (down from 28/32; heuristics 7 and 10 n/a)

# Design Specificity Verdict
Rewrite deleted the signature ticket-slip/LoopDiagram motif from the homepage (grep-confirmed zero references in BusinessHomepage.tsx, though it still exists and works in DemoForm.tsx/demo). Replaced with a generic rounded-card, alternating light/dark-block layout. Net regression on distinctiveness even though individual sections are clean.

# What's new since last check
FIXED: FAQ (implementationControl) now wired in and verified working interactively.
NEW P1: BusinessHomepage.tsx:303 area.outcome.replaceAll("--", ",") leaves a stray space before commas, visible in multiple places (desktop, mobile, FAQ) e.g. "the operation , headcount,". Verified live.
NEW P1: signature visual identity abandoned (see verdict above).
NEW P2: verified empty grid cell in Capabilities section (5 items in a 2-col grid) at ~1440px desktop.
NEW P2: hardcoded #171b20 used 6x instead of --color-canvas-dark token; visually fine/no contrast issues but off design-system.
CARRIED OVER, unfixed: DemoForm.tsx still uses raw Tailwind red-600/700/50 for validation errors (lines 372, 378, 415).
P3: mobile menu button uses text glyphs "x"/"=" not a crafted SVG (renders fine today, inconsistent practice vs ArrowIcon).
P3: inconsistent white/50,55,65,68 opacity tiers on dark sections instead of the existing --color-text-on-dark-secondary/-muted tokens.

# Confirmed non-issues
Mobile overflow re-verified absent under real device-metrics emulation (scrollWidth exactly 390px). Floating "N" badge is Next.js dev toolbar only. cream-palette/overused-font/kicker-above-heading/grid-texture detector flags remain intentional brand choices.

# Minor observations
Dead component files (LoopDiagram, ProblemSection, AuthoritySection, ConnectedOperationsShowcase, CommandCenter, OperatingCycle, +more) and their unused CSS animations remain in the tree -- maintenance hazard.
Demo form placeholder clips mid-word in "Systems currently involved" input -- standard browser behavior, not a bug.

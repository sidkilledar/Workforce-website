# WorkforceOS operations desk redesign

## Design read
A B2B marketing site for frontline operators. Warm editorial typography surrounds precise, readable operational examples. Existing Tailwind and native CSS; no new UI framework. DESIGN_VARIANCE 6, MOTION_INTENSITY 3, VISUAL_DENSITY 4. The user's explicit specifications govern the sage/cream/charcoal section changes, Fraunces, diagrams, and illustrative product UI.

## Content and capability map
- Audience: frontline businesses. Proven contexts: catering, restaurant groups, campus recreation.
- Six operating areas: scheduling, communication, forecasting, inventory, exceptions, workflows, from existing confirmedCapabilities.
- Permission modes: suggest, require approval, execute within approved rules. Setup is assisted, not a visual builder.
- Connections: supported API connections depend on the specific system; payroll/HR/inventory files; custom systems assessed. No vendor-level support or universal write-back claims.
- Communication: operational messages are attached to work; external channels and delivery are confirmed during setup. WhatsApp appears only in the existing Mylapore pilot story.
- Proof: three named pilots, existing reported outcomes. Omit the ambiguous 1,000+ user figure until its definition is confirmed. No fabricated testimonials, photos, or logos.
- Illustrative event: Event 024, Thursday closing shift, 5-9 PM, Jordan, manager Maya. Accepted, approved, and assigned are separate states. Exception escalates to a person and leaves the shift unassigned.

## Tokens and component sheet
Cream #F1ECE0; surface #FCFAF5; ink #17130F; charcoal #23201A; sage #697D71; green #3F5648; hero #57685E. Amber attention, neutral waiting, green completion, restrained red escalation; all include text.
Fraunces headings 60px/38px hero, 42px/30px sections; Jakarta 16px body, 14-16px product; JetBrains 12px metadata.
Content 1200px; gutters 40px/24px; sections 96px/64px. Workspace radius 16px, records 8px, buttons capsules at least 46px tall. One restrained frame shadow. Header layer 50, skip link 100.
Primitives: Status, EventRecord, RuleRow, Message, timeline buttons, activity entries. Focus outline, disabled button treatment, waiting and blocked labels.

## Desktop wireframe and final composition
76px header. Hero 5:7 copy/workspace. Compact proof band. Asymmetric coordination map. Three-zone platform flow. Charcoal execution demo with left step rail, right detail, bottom history. Conversation/status pair. Three editorial scenario rows. Rule sheet/preview. Integration matrix. One large story/two supporting stories. Four open rollout columns. Compact FAQ. Sage CTA/completed event. Charcoal footer.

## Mobile wireframe and final composition
Same reading order. Hero copy then a single readable event, no metrics. Coordination and platform diagrams vertical. Walkthrough wraps a compact step selector above detail; controls and full summary stay visible. Conversation then status. Charts full width. Rule sheet then preview. Integration records labeled vertically. Stories and rollout stacked. CTA then completed event.

## Demo and states
Name, email, company, optional operational problem, optional tools. More qualification under Add more context. Existing consent preserved. Existing validation, busy, failure and confirmation behavior retained. Receipt means contact requested, not booked.

## Interaction and motion
The implemented homepage is the clickable prototype. Walkthrough does not auto-advance. Inspect steps, approve explicitly, view exception, replay. Conversation reply changes next action. Context selector changes rule values, permission selector changes the same action preview. State entrance 220ms, controls 160ms; reduced motion immediate. No looping or forced-scroll animation.

## Validation boundaries
Automated interaction tests and responsive browser checks verify implementation. Representative-operator comprehension testing and the precise aggregate user definition still require human input. Existing analytics adapter receives workflow engagement; actual collection requires a configured provider. No launch/deployment is implied.

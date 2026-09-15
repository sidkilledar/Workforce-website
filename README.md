# WorkforceOS marketing site

A Next.js App Router site for operational intelligence and execution across frontline businesses.

## Development

Install dependencies with `npm install`, configure `.env.local` using `.env.example`, and run `npm run dev`. Open the local URL printed by Next.js.

- `npm run build`: production build
- `npm run lint`: ESLint
- `npm test`: validation, form, API, navigation, content, and walkthrough tests

## Structure

- `/`: homepage, composed in `src/components/site/BusinessHomepage.tsx`
- `/demo`: request form with optional qualification under “Add more context”
- `/legal/privacy` and `/legal/terms`: existing legal content
- `src/components/site/OperationsInteractive.tsx`: walkthrough, communication, configuration
- `src/components/site/OperationPrimitives.tsx`: event, status, message, rule row
- `src/lib/operations-scenario.ts`: shared illustrative Event 024 and workflow states
- `src/lib/site-config.ts`: navigation, customer stories, FAQ, metadata, form choices
- `src/app/operations.css`: responsive operations desk visual system
- `docs/redesign/design.md`: content map, tokens, desktop/mobile compositions, state and motion specifications

## Content boundaries

The three named pilots and their reported outcomes come from existing project content. No fabricated testimonials or vendor support claims are added. The ambiguous aggregate user figure is omitted pending a precise definition. Product demonstrations are explicitly illustrative. Connection methods and supported write-back are confirmed during setup.

## Demo delivery and measurement

The form uses the existing `/api/demo` route with validation, a honeypot, rate limiting, and Resend. `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `SALES_INBOX_EMAIL` are needed for email delivery; without them, the form shows a submission error. Automated checks mock delivery and do not email anyone.

The existing analytics adapter tracks CTA clicks, walkthrough engagement, authority selection, form starts, completions, and failures. Configure an analytics provider for collection. Form contents and personal information are not attached to engagement events.

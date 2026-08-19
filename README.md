# Workforce OS — Marketing Site

Marketing site for Workforce OS, an AI operations manager for frontline businesses. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Resend + site config
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Environment variables

See `.env.example`. `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `SALES_INBOX_EMAIL` are required for the `/demo` form to send email — without them, the demo request API returns a graceful error and the form surfaces it to the user.

## Project structure

- `src/app/*` — routes (App Router). Each top-level page (`product`, `industries`, `about`, `pricing`, `demo`, `legal/*`) is a route segment.
- `src/app/api/demo/route.ts` — demo request endpoint (validation, honeypot, rate limiting, Resend).
- `src/components/ui/*` — design-system primitives (Button, GlassPanel, Reveal, etc).
- `src/components/site/*` — page-level sections (Hero, DemoForm, IndustryDetail, etc).
- `src/components/layout/*` — Header/Footer.
- `src/lib/site-config.ts` — typed content: nav, industries (restaurants, chains, catering, campuses, other), capabilities, operational timeline, scenario data, and the (currently empty) customer-proof list.
- `src/lib/validation.ts` — shared Zod schema for the demo form (client + server).
- `src/components/site/OperationsPanel.tsx` — the shared "command center" visual reused (with different state) across the Hero, Problem, How It Works, and Adaptive Scenario sections.
- `src/components/ui/ScrollStory.tsx` — reusable pinned scroll-driven narrative primitive, with a stacked fallback below `md`.

## Customer proof

`src/components/site/PilotTrust.tsx` shows the "in active customer testing" placeholder message; the logo/quote grid only renders once `customerProof` in `src/lib/site-config.ts` has entries. Add approved names, logos, and testimonials there once customers have signed off on publication.

## Legal pages

`src/app/legal/privacy` and `src/app/legal/terms` are explicitly marked placeholders pending review by legal counsel — replace the copy before launch.

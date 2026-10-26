# Straw marketing site

A Next.js App Router marketing site for Straw, an assistant manager for frontline operations ("Your assistant manager. One text away."). The customer app is external and is not part of this repo.

## Development

Install dependencies with `npm install`, configure `.env.local` using `.env.example`, and run `npm run dev`. Open the local URL printed by Next.js.

- `npm run build`: production build
- `npm run lint`: ESLint
- `npm test`: validation, form, API, navigation, content, and product-demo tests

## Routes

- `/`: homepage, composed in `src/components/site/BusinessHomepage.tsx`
- `/industries/restaurants`, `/industries/catering`, `/industries/campus`: industry pages from `src/app/industries/[industry]/page.tsx`, driven by `src/lib/straw-content.ts`
- `/demo`: demo request form with optional qualification under “Add more context”
- `/legal/privacy` and `/legal/terms`: legal content
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`: generated
- Redirects (`next.config.ts`): `/product`, `/pricing`, `/about`, `/industries`, and legacy `/industries/campuses`, `/industries/chains`, `/industries/other` map to current pages. They are explicit, not wildcards, so they never shadow the industry routes.

## Structure

- `src/lib/site-config.ts`: brand, navigation, CTA copy, demo form choices
- `src/lib/straw-content.ts`: shared industry records
- `src/components/site/StrawProductDemo.tsx` and `straw-demo-data.ts`: reusable product demo (app, iMessage, WhatsApp) using sample data only
- `src/app/globals.css`: Straw design tokens (`--straw-*`)

## Environment

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `SALES_INBOX_EMAIL` | Demo request email delivery. Without them the form shows a submission error. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, structured data. |
| `NEXT_PUBLIC_APP_URL` | Optional. HTTPS URL of the existing customer app. When set and valid, the header shows “Log in”; otherwise no login link appears. It is inlined at build time, so rebuild after changing it. |
| `DEMO_BOOKING_URL` | Optional. HTTPS calendar link shown only after a successful request. Read per request. Unset or invalid means no link. |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Optional: `plausible`, `umami`, or `gtag`. |

## Content boundaries

Proof is anonymous and customer-reported: a catering customer reports saving 10–15 operations hours weekly, campus recreation schedules hundreds of employees, and restaurant managers report more time on the floor. There are no customer names or logos, pricing, founder section, or unverified integrations. Product mockups use sample data and do not imply connected accounts. Legal pages still use the existing WorkforceOS entity and contact wording until replacements are supplied.

## Demo delivery

The form posts to `/api/demo` with validation, a honeypot, rate limiting, and Resend. A successful submission means the request was received, not that a meeting is booked. If `DEMO_BOOKING_URL` is configured, the confirmation links to the calendar and states the meeting is not booked until a time is picked there. Automated checks mock delivery and do not send email.

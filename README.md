# Local Business Technologist Landing Page

## Overview
This repository powers the marketing site for **Evan Parra’s consulting** practice, focused on helping small and mid-sized businesses in **St. Johns County, FL** modernize their technology. The site now runs on [Astro](https://astro.build/) with pre-rendered HTML for strong SEO and fast loads, while interactive pieces (like the case study carousel and intake form) are delivered as lightweight React islands.

## Tech Stack
- **Astro** for static site generation and routing
- **Tailwind CSS** for styling (compiled at build time)
- **React** islands for the booking form and case study carousel
- **Firebase Hosting** for deployment

## Project Structure
```
src/
├── components/        # Reusable UI building blocks and React islands
├── data/              # Structured content (services, case studies)
├── layouts/           # Base HTML layout with SEO and analytics tags
├── pages/             # Astro pages (homepage, 404, service detail routes)
└── styles/            # Global Tailwind entrypoint
public/assets/         # Static images referenced in the site
```

### Editing Content
- **Hero messaging**: `src/components/Hero.astro`
- **Case studies**: `src/data/caseStudies.ts`
- **Services (cards + detail pages)**: `src/data/services.ts`
- **Booking form copy**: `src/components/BookingSection.astro` and `src/components/BookingForm.tsx`
- **Structured data & meta tags**: `src/layouts/BaseLayout.astro`

### Local Development
```bash
npm install
npm run dev
```
Visit http://localhost:4321 to preview changes.

### Production Build
```bash
npm run build
```
This outputs static assets to `dist/`. Deploy that folder to Firebase Hosting:

```bash
firebase deploy --only hosting
```

## Deployment Notes
- `firebase.json` points Firebase to the Astro `dist/` build output.
- A sitemap is generated automatically at build time via `@astrojs/sitemap`.
- Google Analytics and Ads conversion tracking remain configured inside `BaseLayout.astro`.

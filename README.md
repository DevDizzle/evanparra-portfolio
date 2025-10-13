# Insight Acceleration Landing Page

## Overview
This repository powers a single-page landing site for Evan Parra's AI + BI consulting practice. The page focuses on one clear conversion path: demonstrate the value of accelerating time to insight and invite visitors to schedule a 15-minute Insight Audit. ProfitScout.app is highlighted as the flagship case study.

## What's Included
- **Hero** section with the core value proposition and book-a-call CTA.
- **ProfitScout Case Study** detailing the problem, solution, and outcomes using AI + BI.
- **Services** grid tailored to insight acceleration offerings.
- **About** section sharing credentials and approach.
- **Booking** section with a Google Calendar appointment placeholder.
- Updated SEO metadata, OG tags, and Tailwind-powered design.

## Customization
1. **Update Copy & Metrics**: Open `public/index.html` and edit the strings within the React components (Hero, CaseStudy, Services, About, Booking).
2. **Swap Visuals**:
   - Replace `/assets/evan-parra-headshot.jpg` if you have a new headshot.
   - Update the ProfitScout screenshot placeholder inside the `CaseStudy` component with an actual image or embed.
3. **Connect Google Booking**:
   - Generate a Google Calendar Appointment Schedule.
   - Replace the `bookingLink` constant with your live scheduling URL.
   - Paste the iframe or script provided by Google inside the commented placeholder within the `Booking` section to embed the scheduler inline.
4. **OG Image**: Point the `og:image` and `twitter:image` tags to your preferred sharing graphic.

## Deployment
The site is a static React-on-CDN build optimized for Firebase Hosting. To deploy:
1. `firebase login`
2. `firebase deploy --only hosting`

## License
MIT — feel free to adapt for your own AI + BI landing page.

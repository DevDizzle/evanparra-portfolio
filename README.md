# Local AI Expert Landing Page

## Overview
This repository powers a single-page landing site for **Evan Parra’s AI & BI consulting** practice, specifically targeting local businesses in **St. Johns County, FL**. The page is designed to establish Evan as a local expert, build trust through case studies, and convert visitors into scheduling a **free 30-minute Insight Audit**.

## What’s Included
- **Local SEO Focus:** Content is tailored to attract clients in **St. Augustine, Nocatee, and Ponte Vedra**, supported by **Local Business schema**.
- **Hero Section:** A clear **“Your Local AI Expert”** headline with a direct call-to-action.
- **Case Study Carousel:** A dynamic component showcasing multiple real-world projects, demonstrating expertise in solving common business problems.
- **Expanded Services:** Includes AI/BI consulting services as well as **Corporate AI & Prompt Engineering training**.
- **Personalized Booking Section:** Features a **headshot** to build personal connection and an **embedded Google Calendar** for seamless scheduling of a 30-minute audit.
- **Clean, Professional Design:** A **light-themed, mobile-friendly** design built with **Tailwind CSS**.

## Customization
- **Content Updates:** Open `public/index.html` and edit the strings within the React components (**Hero**, **CaseStudyCarousel**, **Services**, **Booking**).
- **Visuals:**
  - Headshot: `/assets/evan-parra-headshot.png`
  - Social sharing (OG) image: `/assets/evan-parra-og-image.png`
- **Booking Link:** The **Google Calendar appointment schedule** is embedded as an iframe in the **Booking** component inside `public/index.html`.

## Deployment
This is a static site optimized for **Firebase Hosting**. To deploy changes:

```bash
firebase login
firebase deploy --only hosting
```

## License
MIT — feel free to adapt for your own local consulting landing page.
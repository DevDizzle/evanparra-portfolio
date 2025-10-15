# Local Business Technologist Landing Page

## Overview
This repository powers a single-page landing site for **Evan Parra’s consulting** practice, specifically targeting local small and medium-sized businesses in **St. Johns County, FL**. The page is designed to establish Evan as a local business technologist who builds practical tech solutions—from modern websites to process automation—to help businesses grow and operate more efficiently.

## What’s Included
- **Local SEO Focus:** Content is tailored to attract clients in **St. Augustine, Nocatee, and Ponte Vedra**, supported by **Local Business schema**.
- **Hero Section:** A clear **“Stop Wrestling With Technology. Start Growing Your Business.”** headline with a direct call-to-action to connect with business owners' primary goals.
- **Case Study Carousel:** A dynamic component showcasing multiple real-world projects, demonstrating expertise in solving common business problems.
- **Expanded Services:** Includes modern web development, payment/booking integration, process automation, data insights, AI solutions, and corporate productivity training.
- **Personalized Booking Section:** Features a **headshot** to build personal connection and an **embedded Google Calendar** for seamless scheduling of a free 30-minute audit.
- **Clean, Professional Design:** A **light-themed, mobile-friendly** design built with **Tailwind CSS**.

## Customization
- **Content Updates:** Open `public/index.html` and edit the strings within the React components (**Hero**, **CaseStudyCarousel**, **Services**, **Booking**). The list of offerings is located in the `Services` component.
- **Visuals:**
  - Headshot: `/assets/evan-parra-headshot.png`
  - Social sharing (OG) image: `/assets/evan-parra-og-image.png`
- **Booking Link:** The **Google Calendar appointment schedule** is embedded as an iframe in the **Booking** component inside `public/index.html`.

## Deployment
This is a static site optimized for **Firebase Hosting**. To deploy changes:

```bash
firebase login
firebase deploy --only hosting

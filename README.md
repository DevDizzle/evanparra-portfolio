# Evan Parra's Portfolio Site - Build Your Own with Firebase & React

## Overview
Welcome to my portfolio site, showcasing my work as an Applied AI Engineer, ML Specialist, and Prompt Engineering Coach. This static site powers evanparra.ai, featuring AI consulting for SMBs, $75 prompt engineering sessions for teens, and project highlights like ProfitScout and MaculaCutis. Built with React (via CDN), Tailwind CSS, and hosted on Firebase with Google Cloud Storage (GCS).

## Setup Guide: Launch Your Portfolio in 10 Minutes
1. **Clone the Repo**: `git clone https://github.com/DevDizzle/evanparra-portfolio.git`
2. **Install Firebase CLI**: Ensure Node.js is installed, then run `npm install -g firebase-tools`.
3. **Login**: `firebase login` (auth via browser with your Google account).
4. **Initialize Hosting**: 
   - CD into the repo: `cd evanparra-portfolio`
   - Run `firebase init hosting`
   - Select your Firebase project (create one if new, e.g., "yourname-portfolio")
   - Public directory: Enter `public` (move files there if needed)
   - Single-page app: Yes (for subpath routing like /consultant)
   - Overwrite index.html: No
5. **Deploy**: `firebase deploy --only hosting` (live at your-project-id.web.app).
6. **Add Custom Domain** (optional): Follow Firebase docs to connect your domain (e.g., yourname.ai) with DNS records.

## Tech Stack
- **Frontend**: HTML, React (CDN), Tailwind CSS
- **Hosting**: Firebase Hosting, GCS
- **Tools**: Firebase CLI, GitHub

## Customization
- Edit `index.html`, `consultant/index.html`, and `prompt-engineering/index.html` to reflect your work.
- Add projects in `projects/` (e.g., `profitscout/index.html`).
- Upload assets (e.g., headshot) to `assets/`.
- Redeploy with `firebase deploy`.

## License
MIT License - Free to use, modify, and distribute. See LICENSE file (add one if desired).

## Call to Action
- **Hire Me**: For AI/BI consulting, visit [evanparra.ai/consultant](https://evanparra.ai/consultant).
- **Learn Prompt Engineering**: [evanparra.ai/prompt-engineering](https://evanparra.ai/prompt-engineering).
- **Feedback**: Email [eraphaelparra@gmail.com](mailto:eraphaelparra@gmail.com).

© 2025 Evan R. Parra. Built with AI & Curiosity.

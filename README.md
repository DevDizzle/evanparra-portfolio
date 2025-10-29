# Evan Parra - Portfolio Website

This is the source code for the personal portfolio and business website for Evan Parra, built with Astro, React, and Tailwind CSS, and deployed on Firebase Hosting.

## Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **UI Components**: [React](https://reactjs.org/) (for interactive islands) & Astro Components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Project Structure

```
src/
├── components/        # Reusable UI building blocks (Astro & React)
├── layouts/           # Base HTML layout with SEO and analytics tags
├── pages/             # Astro pages and API routes
└── styles/            # Global Tailwind entrypoint
public/                # Static assets (images, fonts, etc.)
```

## Editing Content

Most of the website's content can be edited in the following files:

- **Services Pages**: Content for each service is located in its respective file under `src/pages/services/`.
- **Case Studies**: Case study details are in `src/pages/case-studies/`.
- **Homepage**: The homepage content can be edited in `src/pages/index.astro`.
- **Reusable Components**: Text and content within shared components (like the header, footer, and forms) are in `src/components/`.

## Local Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

    The website will be available at `http://localhost:4321`.

## Building and Deploying

The site is deployed to Firebase Hosting.

1.  **Build the site for production**:
    ```bash
    npm run build
    ```

    This will create a `dist/` directory with the optimized, static site.

2.  **Deploy to Firebase**:
    ```bash
    firebase deploy --only hosting
    ```

This will deploy the contents of the `dist/` directory to your live website.

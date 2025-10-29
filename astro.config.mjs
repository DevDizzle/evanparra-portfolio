import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://evanparra.com',
  integrations: [
    tailwind(),
    react(),
    sitemap()
  ],
  redirects: {
    '/services/modern-web-development': 'https://evanparra.com/services/web-design-st-augustine',
    '/services/process-automation': 'https://evanparra.com/services/process-automation-st-johns-county',
    '/services/data-insights-and-dashboards': 'https://evanparra.com/services/dashboards-reporting-st-augustine',
    '/services/ai-for-business-efficiency': 'https://evanparra.com/services/ai-assistant-automation-st-augustine'
  },
  output: "static",
  sitemap: {
    // Note: this is a top-level property
    filename: 'sitemap.xml'
  }
});
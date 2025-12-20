import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

export default defineConfig({

  site: 'https://evanparra.ai',

  integrations: [

    tailwind(),

    react(),

    sitemap()

  ],

  redirects: {

    '/services/modern-web-development': '/',

    '/services/process-automation': '/',

    '/services/data-insights-and-dashboards': '/',

    '/services/ai-for-business-efficiency': '/'

  },

  output: "static",

  sitemap: {

    // Note: this is a top-level property

    filename: 'sitemap.xml'

  }

});

import { type Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;

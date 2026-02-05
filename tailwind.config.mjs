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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',   // Main brand blue
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        accent: {
          green: '#10b981',  // Success/wins
          amber: '#f59e0b',  // Warnings
          red: '#ef4444',    // Errors/losses
        }
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
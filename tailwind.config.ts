import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        moon: ['var(--font-moon)'],
      },
      colors: {
        background: '#0A0517',
        primary: '#2F136D',
        'dark-blue': '#0D061C',
      },
    },
  },
  plugins: [],
};
export default config;

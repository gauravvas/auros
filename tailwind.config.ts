import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'auros-navy': '#0D1B2A',
        'auros-navy-light': '#132033',
        'auros-gold': '#F59E0B',
        'auros-blue': '#2563EB',
        'auros-ice': '#CADCFC',
        'auros-muted': '#94A3B8',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        mono: ['Menlo', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F59E0B, #F97316)',
      },
    },
  },
  plugins: [],
};

export default config;

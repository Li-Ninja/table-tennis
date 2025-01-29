import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const colors = {
  primary: {
    DEFAULT: '#FF6B00',
    light: '#f3956a',
    dark: '#E55E00',
    darker: '#CC5500',
  },
};

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(90deg, #f37822 0%, #d45022 45%, #e6342d 100%)',
      },
      inset: {
        '70px': '70px',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--primary-color': colors.primary.DEFAULT,
          '--primary-color-light': colors.primary.light,
          '--primary-color-dark': colors.primary.dark,
          '--primary-color-darker': colors.primary.darker,
        },
      });
    }),
  ],
};

export default config;

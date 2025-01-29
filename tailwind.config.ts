import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { colors } from './src/config/theme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(90deg, var(--primary-color-light) 0%, var(--primary-color) 45%, var(--primary-color-dark) 100%)',
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
          '--primary-color-light': colors.primary.LIGHT,
          '--secondary-color': colors.secondary.DEFAULT,
        },
      });
    }),
  ],
};

export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tw-elements-react/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(90deg, #f37822 0%, #d45022 45%, #e6342d 100%)',
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          600: '#E55E00',
          700: '#CC5500',
        },
      },
      inset: {
        '70px': '70px',
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#29554D',
        'accent': '#C3A05C',
        'background-light': '#E9E2DE',
        'primary-light': '#73B17A',
      },
      fontFamily: {
        'kufi': ['Noto Kufi Arabic', 'serif'],
      },
    },
  },
  plugins: [],
};

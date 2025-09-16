/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4a2c2a',
        'brand-secondary': '#c7a17a',
        'brand-background': '#f5f0e6',
        'brand-surface': '#ffffff',
        'brand-text': '#333333',
        'brand-accent': '#8d6e63',
      },
    },
  },
  plugins: [],
}

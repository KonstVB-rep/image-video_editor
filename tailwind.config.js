/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'hover-hover': {'raw': '(hover: hover)'},
        'hover-none': {'raw': '(hover: none)'}
      },
      gridTemplateColumns: {
        'auto-fit-200': 'repeat(auto-fit, minmax(240px, max-content))',
      }
    },
  },
  plugins: [],
}

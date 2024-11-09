/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-200': 'repeat(auto-fit, minmax(240px, max-content))',
      }
    },
  },
  plugins: [],
}

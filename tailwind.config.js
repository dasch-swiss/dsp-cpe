/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/**/*.{html, ts}", // all code gets scanned ...
    "./src/app/tailwind/*.ts" // only tw classes from the tailwind module get scanned for minifying/purging
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

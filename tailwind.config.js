const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //"./src/**/*.{html, ts}", // all code gets scanned ...
    // only tw classes from the gui-elements-module get scanned for ending up in the served/built styles;
    // Make sure there is no space between file endings!
    "./src/app/gui-elements-module/**/*.{html,ts}"
  ],
  theme: {
    // overriding the default tw colors - not extending; affects intellisense only
    // renaming to semantic classes is possible - also for grading
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      // intellisense is only providing those blue grades - all others work as well, because 'blue' exists as default;
      // prefixing works like bg-blue-100
      blue: {
        100: '#dbeafe',
        200: '#bfdbfe',
        500: '#3b82f6',
        700: '#1d4ed8',
        900: '#1e3a8a'
      },
      surface: colors.gray, // get all greys from default, but semantically renamed to surface
      midnightblue: { // example for semantic naming; prefixed usage: bg-midnightblue-soft
        'soft': '#EFF1FF'
      },
    }
  },
  plugins: [],
}

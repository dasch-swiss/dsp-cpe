const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //"./src/**/*.{html, ts}", // all code gets scanned ...
    "./src/app/gui-elements-module/**/*.{html, ts}" // only tw classes from the guielements module get scanned for minifying/purging
  ],
  safelist: [
    // 'bg-primary-700'
  ],
  theme: {

    // remove for overriding the default tw colors - not extending
      colors: {
        inherit: 'inherit',
        // name_in_template:preset
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        midnightBlue: { // our midnight-blue
          50: '#EFF1FF'
        },
        primary: colors.blue,
        gray: colors.gray
      }
  },
  plugins: [],
}

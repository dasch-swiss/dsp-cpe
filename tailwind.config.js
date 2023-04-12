/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ // Make sure there is no space between file endings in the files definitions "{html,ts}"!
    "./src/**/*.{html,ts}" // all code gets scanned ...
  ],
    theme: {
      // restrict the color palette by not using the "extend" property.
      // so there is intellisense only for our defined cpeColors - not for the tw color palettes
      colors: { // the semantic color palette in use
          inherit: 'inherit',
          current: 'currentColor',
          // set the colors to the css variables which are set by the TailwindThemeService
          transparent: { DEFAULT: 'var(--transparent)' },
          black: { DEFAULT: 'var(--black)' },
          white: { DEFAULT: 'var(--white)' },
          primary: { DEFAULT: 'var(--primary)' },
          secondary: { DEFAULT: 'var(--secondary)' },
          highlight: { DEFAULT: 'var(--highlight)' },
          disabledText: { DEFAULT: 'var(--disabledText)' },
          disabledBackground: { DEFAULT: 'var(--disabledBackground)' },
          selected: { DEFAULT: 'var(--selected)' },
          checked: { DEFAULT: 'var(--checked)' },
          unchecked: { DEFAULT: 'var(--unchecked)' },
          warningText: { DEFAULT: 'var(--warningText)' },
          warningBackground: { DEFAULT: 'var(--warningBackground)' },
          surface: { DEFAULT: 'var(--surface)' },
          surfaceText: { DEFAULT: 'var(--surfaceText)' }
      }
    },
  plugins: []
};

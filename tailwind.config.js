module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    ripple: theme => ({
        colors: theme('colors')
    }),
  },
  plugins: [
    require('tailwindcss-ripple')()
  ]
}
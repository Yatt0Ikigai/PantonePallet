module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: [
    "./src/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    require('tailwindcss-debug-screens'),
    require('daisyui')
  ],
}

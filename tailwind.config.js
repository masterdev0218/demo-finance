/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",
  "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      'phone': '450px',
      'sm':	'640px',
      'md':	'768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl' :	'1536px'
    },
    color: {
    },
    extend: {},
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [ require("daisyui"),
  require('flowbite/plugin')],
}


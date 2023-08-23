/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#c2ea48',

          secondary: '#92f49b',

          accent: '#175975',

          neutral: '#15161e',

          'base-100': '#f5f5f5',

          info: '#3577e9',

          success: '#21b085',

          warning: '#f5b547',

          error: '#ea6186'
        }
      }
    ]
  }
}

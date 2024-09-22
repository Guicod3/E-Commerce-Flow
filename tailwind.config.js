/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        lg: '1300px',
        md: '800px',
      },
    },
  },
  plugins: [],
}

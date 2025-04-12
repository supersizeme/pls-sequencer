/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-cross': '#E42313',
        'dark-gray': '#333333',
      },
    },
  },
  plugins: [],
}

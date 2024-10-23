/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'dvh': '80dvh', // Adds dvh utility for dynamic viewport height
      },
    },
  },
  plugins: [],
}


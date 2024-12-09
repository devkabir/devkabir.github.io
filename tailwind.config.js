/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,svg}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
};

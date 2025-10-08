/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this path is correct
  ],
  theme: {
    extend: {
      colors: {
        'hirehelper-blue': '#2B59FF', // The vibrant blue from Figma
        'hirehelper-pink': '#EC4899', // The distinct pink for "HireHelper" text
      },
      fontFamily: {
        // You might want to use a specific font like 'Inter' for closer resemblance.
        // If so, make sure to import it in your index.html or index.css.
        // Example: sans: ['Inter', 'sans-serif'],
        sans: ['system-ui', 'sans-serif'], // Default system font
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Playwrite DE Grund", "cursive"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        // Hide scrollbar in webkit browsers (Chrome, Safari)
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        // Hide scrollbar in Firefox and IE/Edge
        ".no-scrollbar": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
      });
    },
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Libre Baskerville", "serif"],
      },
      colors: {
        "cloud-grey": "#F6F6F9",
        "royal-blue": "#0017AD",
        "lavender-blue": "#9AA2D5",
        "cardinal-red": "#CA2525",
        "charcoal-grey": "#4E4E4E",
      },
    },
    screens: {
      'sm': "640px",
      'md': '850px', 
      'lg': '1020px'
    },
  },
  plugins: [],
};

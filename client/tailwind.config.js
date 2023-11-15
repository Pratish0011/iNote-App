/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        myColor: "#D9D9D9"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
 
  ],
}


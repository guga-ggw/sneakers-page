/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens : {
      sm : '480px',
      md : '770px',
      lg : '980px',
      xl : '1440px'
    }
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar' : {
          display : "none"
        },
        '.no-scrollbar' : {
          '-ms-overflow-style' : "none",
          'scrollbar-width' : "none"
        }
      }

      addUtilities(newUtilities)
    }
  ]
}
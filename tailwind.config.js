/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:     '#1A2370',
        electric: '#2E5BFF',
        sky:      '#4DA8DA',
        gold:     '#F5A623',
        offwhite: '#F4F5F7',
        darktext: '#1A2370',
        midgray:  '#555F6E',
        lightbg:  '#F4F5F7',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        pill:  '100px',
        card:  '50px',
        media: '20px',
      },
      boxShadow: {
        'offset-navy':    '4px 4px 0 0 #1A2370',
        'offset-navy-lg': '6px 6px 0 0 #1A2370',
        'offset-gold':    '6px 6px 0 0 #F5A623',
      },
    },
  },
  plugins: [],
}


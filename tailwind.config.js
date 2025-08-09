module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        Karla: ['Karla', 'serif']
      },
      colors:{
        'light-green': {
          200: '#d1fae5',
          400: '#10b981',
          500: '#047857',
          600: '#065f46',
          700: '#064e3b',
          800: '#064e3b',
          900: '#064e3b',
        }
      },
      keyframes: {
        slideDown: { 
          '0%': { transform: 'translateY(-100%)' }, 
          '100%': { transform: 'translateY(0)' } 
        },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } }
      },
      animation: {
        slideDown: 'slideDown .5s ease-in-out',
        fadeIn: 'fadeIn .5s ease-in-out',
      },
      backgroundImage: {
        'slider-bg': "url('./img/img-2009.png')",
      },
    },
  },
  safelist: [
    "bg-[url('./img/s24-ultra-den.jpg')]",
    "group-hover:block"
  ],
  plugins: [],
}


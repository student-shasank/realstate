export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"General Sans"', 'system-ui', 'sans-serif'],
      archivo: ['"Archivo"', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        // 30s controls the speed, higher is slower
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.33%)' }, // Moves exactly one set of the triple-mapped items
        },
      },
    },
  },
}
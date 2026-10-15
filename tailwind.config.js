/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // 320px base, then xs 480 / sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440
    screens: { xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        crimson: { DEFAULT: '#D71920', 500: '#ED2229', 600: '#D71920', 700: '#B8161E', 800: '#8F141B', 900: '#6B0F14' },
        blush: { DEFAULT: '#FDEAEA', 50: '#FFF6F6', 100: '#FDEAEA', 200: '#FBD3D4', 300: '#F7A3A6' },
        cream: '#FFFDF8',
        ink: { DEFAULT: '#1C1112', soft: '#3F3234', body: '#62575A', muted: '#8B8082' },
        line: '#EFE3E3',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(28,17,18,.28)',
        glow: '0 14px 34px -12px rgba(184,22,30,.42)',
      },
    },
  },
  plugins: [],
};

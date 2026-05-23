/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        omnixBlue: '#3b82f6',
      },
      boxShadow: {
        orb: '0 0 100px rgba(255, 255, 255, 0.2), inset 0 -25px 60px rgba(0, 0, 0, 0.9), inset 0 20px 45px rgba(255,255,255,0.2)',
      },
    },
  },
  plugins: [],
};

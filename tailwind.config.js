/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecf9ff',
          100: '#d5f0ff',
          200: '#b3e4ff',
          300: '#85d3ff',
          400: '#50bbff',
          500: '#007BFF', // Logo Blue
          600: '#0061d6',
          700: '#004daa',
          800: '#00428d',
          900: '#063770',
        },
        accent: '#007BFF',
        surface: '#0a0a0a',
        background: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headings: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 123, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 123, 255, 0.4)',
      },
    },
  },
  plugins: [],
}

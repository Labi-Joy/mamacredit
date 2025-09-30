/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fef2f4',
          100: '#fde6e9',
          200: '#fccdd6',
          300: '#f9a8b5',
          400: '#f4708a',
          500: '#ec4b6b',
          600: '#A91B47',
          700: '#be1e3e',
          800: '#8B1538',
          900: '#881337',
          950: '#4c0519',
        },
        cream: '#FAF9F6',
        terracotta: '#E76F51',
        sage: '#2A9D8F',
        gold: '#F4A261',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
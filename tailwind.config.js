/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: {
          light: '#ffffff',
          dark: '#090909',
        },
        primary: {
          50: '#f0f1ff',
          100: '#e4e5ff',
          200: '#ccceff',
          300: '#a5a8ff',
          400: '#7b7eff',
          500: '#5154ff',
          600: '#3235f3',
          700: '#2326d6',
          800: '#1e20ad',
          900: '#1c1e89',
          950: '#12134d',
        },
        accent: {
          50: '#fdf2ff',
          100: '#fae4ff',
          200: '#f5c9ff',
          300: '#f19dff',
          400: '#e65dff',
          500: '#d626ff',
          600: '#bc0ce6',
          700: '#9d08bf',
          800: '#82099c',
          900: '#6b0c7e',
          950: '#420049',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
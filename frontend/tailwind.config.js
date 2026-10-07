/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#030305',
          900: '#07070a',
          850: '#0c0d12',
          800: '#13141c',
          700: '#1e202d',
          600: '#2c2e3f',
        },
        cinema: {
          emerald: '#10b981',
          emeraldDark: '#059669',
          amber: '#f59e0b',
          rose: '#f43f5e',
          indigo: '#6366f1',
          violet: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.25)',
        'glow-ambient': '0 0 40px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './layout/**/*.{ts,tsx}',
    './icons/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        sidebar: '#0f172a',
        'sidebar-hover': '#1e293b',
        background: '#f8fafc',
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.15s ease-out',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: 0, transform: 'translateY(-6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};



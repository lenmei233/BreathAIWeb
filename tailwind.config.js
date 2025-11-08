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
        fluent: {
          // Light theme colors
          'primary': '#0078d4',
          'primary-hover': '#106ebe',
          'secondary': '#6c757d',
          'background': '#ffffff',
          'surface': '#f3f2f1',
          'border': '#edebe9',
          'text': '#323130',
          'text-secondary': '#605e5c',
          'accent': '#0078d4',
          'success': '#107c10',
          'warning': '#ff8c00',
          'error': '#d13438',
          
          // Dark theme colors
          'dark-primary': '#4080ff',
          'dark-primary-hover': '#2b6ce0',
          'dark-secondary': '#a19f9d',
          'dark-background': '#080808',
          'dark-surface': '#1a1a1a',
          'dark-border': '#323130',
          'dark-text': '#ffffff',
          'dark-text-secondary': '#a19f9d',
          'dark-accent': '#4080ff',
        }
      },
      fontFamily: {
        'fluent': ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

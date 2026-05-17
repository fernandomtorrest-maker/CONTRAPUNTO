import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: '#0f0e0c',
          50: '#2a2824',
          100: '#1a1916',
          200: '#141311',
          300: '#0f0e0c',
        },
        stone: {
          dark: '#1a1916',
          DEFAULT: '#242220',
          light: '#2e2c28',
        },
        sand: {
          DEFAULT: '#c4a882',
          dark: '#a8906a',
          light: '#d4bea0',
          muted: '#8a7a64',
        },
        cream: {
          DEFAULT: '#e8ddd0',
          muted: '#c4b8a8',
        },
        border: {
          DEFAULT: '#2a2824',
          light: '#3a3830',
        },
      },
      fontFamily: {
        heading: ['var(--font-barlow)', 'Barlow Condensed', 'Impact', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 8vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'section': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'label': ['0.65rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to right, rgba(15,14,12,0.92) 40%, rgba(15,14,12,0.4) 100%)',
        'gradient-card': 'linear-gradient(to top, rgba(15,14,12,0.95) 0%, rgba(15,14,12,0.4) 60%, transparent 100%)',
        'gradient-section': 'linear-gradient(to bottom, #1a1916, #0f0e0c)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
        'sand': '0 4px 20px rgba(196,168,130,0.2)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

export default config;

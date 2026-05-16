/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF541B',
          dark: '#E04A15',
          light: '#FF671B',
          muted: 'rgba(255, 84, 27, 0.12)',
        },
        background: {
          DEFAULT: '#FFFFFF',
          warm: '#FFF9F9',
        },
        surface: {
          dark: '#1B1B1B',
          elevated: '#FEFEFE',
        },
        content: {
          primary: '#1B1B1B',
          secondary: '#666666',
          inverse: '#FFFFFF',
        },
        semantic: {
          success: '#22C55E',
          error: '#EF4444',
          info: '#0D1B2A',
        },
        border: {
          DEFAULT: 'rgba(27, 27, 27, 0.35)',
          subtle: 'rgba(0, 0, 0, 0.08)',
        },
      },
      fontSize: {
        display: ['32px', { lineHeight: '38px' }],
        h1: ['24px', { lineHeight: '30px' }],
        h2: ['20px', { lineHeight: '26px' }],
        h3: ['18px', { lineHeight: '24px' }],
        body: ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        caption: ['12px', { lineHeight: '16px' }],
        button: ['14px', { lineHeight: '17px' }],
      },
      borderRadius: {
        card: '20px',
        sheet: '40px',
        button: '12px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};

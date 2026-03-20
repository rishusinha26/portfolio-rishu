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
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        neon: {
          cyan: '#00ffff',
          lime: '#00ff00',
          pink: '#ff00ff',
          purple: '#9d4edd',
          orange: '#ff6b35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 3s infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'radar': 'radarScan 8s linear infinite',
        'code-float': 'codeFloat 4s ease-in-out infinite',
        'particle': 'particleFloat 10s linear infinite',
        'h-scan': 'horizontalScan 3s ease-in-out infinite',
        'v-glow': 'verticalGlow 2s ease-in-out infinite',
        'neon-flicker': 'neonFlicker 3s ease-in-out infinite',
        'circuit': 'circuitPulse 2s ease-in-out infinite',
        'hex-rotate': 'hexagonRotate 20s linear infinite',
        'background-shift': 'backgroundShift 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #00ffff, 0 0 20px #00ffff' },
          '50%': { boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 10px #00ffff' },
          '50%': { textShadow: '0 0 20px #00ffff, 0 0 30px #00ffff' },
        },
        radarScan: {
          '0%': { transform: 'rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'rotate(360deg)', opacity: '0.2' },
        },
        codeFloat: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0px)' },
          '50%': { opacity: '0.6', transform: 'translateY(-20px)' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
        horizontalScan: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        verticalGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(0, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 20px rgba(0, 255, 255, 0.2)' },
        },
        circuitPulse: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        hexagonRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        neonFlicker: {
          '0%, 100%': { textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' },
          '50%': { textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff' },
        },
        backgroundShift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, inset 0 0 10px #00ffff',
        'neon-lime': '0 0 10px #00ff00, 0 0 20px #00ff00, inset 0 0 10px #00ff00',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff, inset 0 0 10px #ff00ff',
      },
    },
  },
  plugins: [],
}

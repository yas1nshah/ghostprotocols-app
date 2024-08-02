/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
          foreground: '#111',
          card: 'rgba(123, 123, 123, 0.15)',
          cardForeground: '#111',
          popover: '#ffffff',
          popoverForeground: '#111',
          primary: '#49B618',
          primaryForeground: '#EEEEEE',
          secondary: '#C9D72E',
          secondaryForeground: '#EEEEEE',
          muted: 'rgba(123, 123, 123, 0.5)',
          mutedForeground: 'rgba(255, 255, 255, 0.5)',
          accent: '#C9D72E',
          accentForeground: '#EEEEEE',
          destructive: '#d71344',
          destructiveForeground: '#EEEEEE',
          border: 'rgba(85, 85, 85, 0.15)',
          input: 'rgba(85, 85, 85, 0.15)',
          ring: '#49B618',
          text: '#000000'
        },
        dark: {
          background: '#111',
          foreground: '#EEEEEE',
          card: 'rgba(123, 123, 123, 0.15)',
          cardForeground: 'hsl(210, 40%, 98%)',
          popover: 'rgb(0, 0, 0)',
          popoverForeground: '#EEEEEE',
          primary: '#49B618',
          primaryForeground: '#EEEEEE',
          secondary: '#C9D72E',
          secondaryForeground: '#EEEEEE',
          muted: 'rgba(123, 123, 123, 0.5)',
          mutedForeground: 'rgba(255, 255, 255, 0.5)',
          accent: '#49B618',
          accentForeground: '#EEEEEE',
          destructive: '#d71344',
          destructiveForeground: '#EEEEEE',
          border: 'rgba(85, 85, 85, 0.15)',
          input: 'rgba(85, 85, 85, 0.4)',
          ring: '#49B618',
          text: '#fff'
        }
      },
    },
    fontFamily: {
      iRegular : ["Outfit-Regular", "sans-serif"],
      iSemiBold : ["Outfit-SemiBold", "sans-serif"],
      Striger : ["Striger", "sans-serif"]
    }
  },
  plugins: [],
}

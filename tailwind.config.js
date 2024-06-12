// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",    
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
daisyui: {
    themes: [
      {
        light: {
          "primary": "#1D4ED8",
          "secondary": "#9333EA",
          "accent": "#37CDBE",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
          "base-200": "#EEE",
          "base-300": "#CCC",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
        dark: {
          "primary": "#0D47A1",
          "secondary": "#6200EA",
          "accent": "#00E5FF",
          "neutral": "#263238",
          "base-100": "#121212",
          "base-200": "#1E1E1E",
          "base-300": "#424242",
          "info": "#0288D1",
          "success": "#00C853",
          "warning": "#FFAB00",
          "error": "#D50000",
        },
      },
    ],
  },
}

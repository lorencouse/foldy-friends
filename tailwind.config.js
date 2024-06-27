/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        20: "20px", // Custom border width
      },
      colors: {
        "primary-focus": "#0087f2",
        "secondary-focus": "#ff5e57",
      },
      boxShadow: {
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1f96f4",
          "primary-focus": "#0087f2",
          secondary: "#f53b57",
          "secondary-focus": "#ff5e57",
          accent: "#0be881",
          neutral: "#485460",
          "base-100": "#FFFFFF",
          "base-200": "#EEE",
          "base-300": "#d2dae2",
          "base-content": "#1e272e",
          info: "#3ABFF8",
          success: "#05c46b",
          warning: "#ffd32a",
          error: "#ff3f34",
        },
        dark: {
          primary: "#1f96f4",
          "primary-focus": "#0087f2",
          secondary: "#f53b57",
          "secondary-focus": "#ff5e57",
          accent: "#00E5FF",
          neutral: "#263238",
          "base-100": "#121212",
          "base-200": "#1E1E1E",
          "base-300": "#424242",
          "base-content": "#FFFFFF",
          info: "#0288D1",
          success: "#00C853",
          warning: "#FFAB00",
          error: "#D50000",
        },
      },
    ],
  },
};

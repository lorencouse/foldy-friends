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
          primary: "#54a0ff",
          secondary: "#ee5253",
          accent: "#1dd1a1",
          neutral: "#576574",
          "base-100": "#FFF",
          "base-200": "#c8d6e5",
          "base-300": "#8395a7",
          "base-content": "#222f3e",
          info: "#0abde3",
          success: "#10ac84",
          warning: "#feca57",
          error: "#ff6b6b",
        },
        dark: {
          primary: "#54a0ff",
          secondary: "#ee5253",
          accent: "#1dd1a1",
          neutral: "#576574",
          "base-100": "#222f3e",
          "base-200": "#576574",
          "base-300": "#8395a7",
          "base-content": "#FFFFFF",
          info: "#0abde3",
          success: "#10ac84",
          warning: "#feca57",
          error: "#ff6b6b",
        },
      },
    ],
  },
};

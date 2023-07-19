/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*/*.{ts,vue}", "./src/*/*/*.{ts,vue}", "./src/pages/*.{ts,vue}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    extend: {
      colors: {
        "blue-primary": "#007bff",
        "gray-light": "#f8f9fa",
      },
      height: {
        15: "60px",
      },
      lineHeight: {
        initial: "normal",
      },
      borderWidth: {
        1: "1px",
      },
      gap: {
        6: "1.75rem",
      },
    },
  },
  plugins: [],
};

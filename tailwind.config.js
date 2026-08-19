/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0058be",
          hover: "#00479e",
          container: "#2170e4",
          light: "#d8e2ff",
          fixed: "#d8e2ff",
        },
        secondary: {
          DEFAULT: "#4648d4",
          container: "#6063ee",
          light: "#e1e0ff",
        },
        surface: {
          DEFAULT: "#ffffff",
          bright: "#f9f9ff",
          dim: "#d8d9e3",
          low: "#f2f3fd",
          container: "#ecedf7",
          high: "#e6e7f2",
          highest: "#e1e2ec",
        },
        "on-surface": {
          DEFAULT: "#191b23",
          variant: "#424754",
        },
        outline: {
          DEFAULT: "#727785",
          variant: "#c2c6d6",
        },
        background: "#f9f9ff",
      },
      fontFamily: {
        headline: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        'card': '0.75rem',
        'pill': '9999px',
      },
      maxWidth: {
        'content': '1200px',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-Mirai Color Tokens
        paper: {
          DEFAULT: "#F5F2EB", // Warm Washi Parchment
          soft: "#EFECE4",
          deep: "#E5E1D7",
        },
        ink: {
          DEFAULT: "#1E1B18", // Sumi Ink
          soft: "#45413B",
          ash: "#7C776E",
        },
        sun: {
          DEFAULT: "#E64A19", // Solar Vermilion / Torii Red (Primary CTA)
          hover: "#D84315",
          light: "#FBE9E7",
          deep: "#BF360C",
        },
        gold: {
          DEFAULT: "#C89D3C", // Cyber Antique Gold (Pricing / Seals)
          bright: "#D4AF37",
          light: "#FDF8E8",
        },
        night: {
          DEFAULT: "#0B132B", // Cyber Indigo
          soft: "#131E29",    // Deep Obsidian
          deep: "#070B19",
        },
        line: {
          DEFAULT: "rgba(30, 27, 24, 0.12)",
          subtle: "rgba(30, 27, 24, 0.06)",
        },

        // Semantic Compatibility Aliases
        primary: {
          DEFAULT: "#E64A19", // Vermilion Sun
          hover: "#D84315",
          container: "#BF360C",
          light: "#FBE9E7",
          fixed: "#FBE9E7",
        },
        secondary: {
          DEFAULT: "#C89D3C", // Cyber Gold
          container: "#B3862A",
          light: "#FDF8E8",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          bright: "#FDFBF7",
          dim: "#E5E1D7",
          low: "#EFECE4",
          container: "#E5E1D7",
          high: "#DDD9CE",
          highest: "#D4CFB7",
        },
        "on-surface": {
          DEFAULT: "#1E1B18",
          variant: "#45413B",
        },
        outline: {
          DEFAULT: "rgba(30, 27, 24, 0.25)",
          variant: "rgba(30, 27, 24, 0.12)",
        },
        background: "#F5F2EB",
      },
      fontFamily: {
        display: ["'Chakra Petch'", "'Outfit'", "sans-serif"],
        headline: ["'Chakra Petch'", "'Outfit'", "sans-serif"],
        mono: ["'Azeret Mono'", "'JetBrains Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
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

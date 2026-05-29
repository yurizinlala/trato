import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "paper-cream": "#FFF6E5",
        "ink-black": "#111111",
        "trato-orange": "#FF6B1A",
        "pen-blue": "#1F4E8C",
        "soft-sand": "#F3E2C7",
        "soft-gray": "#E8E2D6",
        "success-green": "#2E8B57",
        "warning-yellow": "#FFD166",
        "danger-red": "#EF476F",
        surface: "#FFF6E5",
        "surface-dim": "#E8E2D6"
      },
      boxShadow: {
        hard: "4px 4px 0 0 #111111",
        "hard-sm": "2px 2px 0 0 #111111",
        "hard-lg": "8px 8px 0 0 #111111",
        "hard-orange": "8px 8px 0 0 #FF6B1A",
        "hard-bottom": "0 4px 0 0 #111111",
        "hard-right": "4px 0 0 0 #111111"
      },
      borderWidth: {
        3: "3px"
      },
      borderRadius: {
        trato: "4px",
        window: "0"
      },
      rotate: {
        trato: "3deg"
      },
      fontFamily: {
        heading: ["Space Grotesk", "Syne", "Inter", "sans-serif"],
        body: ["Inter", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "Consolas", "monospace"]
      },
      spacing: {
        gutter: "24px",
        "desktop-x": "40px",
        "mobile-x": "16px"
      },
      maxWidth: {
        app: "1500px"
      },
      minWidth: {
        table: "840px"
      },
      gridTemplateColumns: {
        "filters-sm": "1fr 220px",
        "filters-md": "1fr 240px",
        "dashboard-main": "420px minmax(0,1fr)",
        "client-detail": "360px minmax(0,1fr)",
        "project-sidebar": "minmax(0,1fr) 380px",
        "document-sidebar": "minmax(0,1fr) 420px",
        "scope-preview": "minmax(0,1fr) 420px",
        "price-editor": "1fr 360px",
        "contract-editor": "minmax(0,560px) minmax(380px,1fr)",
        "city-state": "1fr 120px"
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, rgba(17,17,17,0.13) 1px, transparent 1px)"
      },
      backgroundSize: {
        "dot-grid": "22px 22px"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scan-pulse": {
          "0%, 100%": { transform: "scaleX(0.2)" },
          "50%": { transform: "scaleX(1)" }
        }
      },
      animation: {
        "fade-up": "fade-up 220ms ease-out both",
        "scan-pulse": "scan-pulse 900ms ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

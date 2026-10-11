import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bazar: {
          primary: "#05893E",
          "primary-hover": "#047F39",
          "primary-content": "#F3FBF4",
          success: "#1A9951",
          error: "#D03739",
          "base-100": "#FAFCFA",
          "base-200": "#F0F5F0",
          "base-300": "#E1E8E1",
          "base-content": "#1D271F",
          muted: "#667068",
        },
      },
      fontFamily: {
        bangla: ["var(--font-hind-siliguri)", "Hind Siliguri", "sans-serif"],
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        ticker: "ticker 35s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        global: ['"Libre Franklin"', "sans-serif"],
        title: [""],
      },
      colors: {
        bgGradient: {
          start: "#292B51",
          end: "#503080",
        },
        greenColorSecondary: "#28CB62",
        blueColorTertiary: "#6077D7",
        btnColorSecondary: "#0F172A",
        bgColorTransparent: "rgba(24, 24, 27, 0.2)",
        btnColorIsVoted: "#7B3AC1",
      },
      backgroundImage: {
        "gradient-bg": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

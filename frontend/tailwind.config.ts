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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        "custom-inset":
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -2px inset, rgba(0, 0, 0, 0.9) 0px 18px 36px -19px inset",

        test: "rgba(50, 50, 93, 0.85) 0px 13px 27px -55px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px",
      },
      fontFamily: {
        "sour-gummy": "Sour Gummy",
        "santa-catalina": "Santa Catalina",
      },
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
        900: "900",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        extrafloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        aggrandi: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.92)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        extrafloat: "extrafloat 1s ease-in-out infinite",
        aggrandi: "aggrandi 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

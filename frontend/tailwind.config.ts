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

        test: "rgba(50, 50, 93, 0.85) 0px 13px 27px -55px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px;",
      },
    },
  },
  plugins: [],
};
export default config;

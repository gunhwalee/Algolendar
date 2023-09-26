import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        pageHeight: "calc(100% - 4.5rem)",
      },
      width: {
        pageWidth: "calc(100% - 12rem)",
      },
    },
  },
  plugins: [],
};
export default config;

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
      colors: {
        header: "#374151",
        side: "#1f2937",
        background: "#111827",
        easyStatus: "#2e4d36",
        easySubmit: "#00b8a2",
        mediumStatus: "#5e4e2b",
        mediumSubmit: "#fec01d",
        hardStatus: "#5a3130",
        hardSubmit: "#9e3b39",
      },
    },
  },
  plugins: [],
};
export default config;

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
        "bg-page": "#FAFAF7",
        "bg-sidebar": "#0F0F0F",
        "bg-sidebar-active": "#1F1F1F",
        "accent-crimson": "#C41E3A",
        "border-gray": "#E0E0E0",
        "text-primary": "#0F0F0F",
        "text-secondary": "#666666",
        "text-tertiary": "#999999",
        "text-on-dark": "#FAFAF7",
        success: "#22C55E",
        info: "#3B82F6",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

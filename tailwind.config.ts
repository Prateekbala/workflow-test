import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Custom primary color (indigo-based)
        accent: "#F97316", // Accent color (orange)
        background: "#F8FAFC", // Light background
      },
    },
  },
  plugins: [],
} satisfies Config;

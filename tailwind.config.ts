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
        maincolor : '#4461F2' ,
        muted : '#979CA3',
        backgroundColor : 'rgba(1, 1 , 1 , 0.1)'
      },
    },
  },
  plugins: [],
};
export default config;

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
        "survey-lightgreen": '#1E617A',
				"survey-green": "#0A5F59",
        "survey-yellow": "#FDCF6F",
        "survey-darkblue": "#252B42",
        "survey-light": "#DFEBE9",
        "survey-lighter": "#EAEAEA"
      },
    },
  },
  plugins: [],
};
export default config;

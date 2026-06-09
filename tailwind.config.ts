import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rojo:    { DEFAULT: '#AF2C0E', dark: '#8E2109', soft: '#F3E0DA' },
        naranja: { DEFAULT: '#C25437', dark: '#A23F26', soft: '#F6E6DF' },
        plata:   { DEFAULT: '#CB9E78', dark: '#B07F55', soft: '#F3E9DD' },
        oro:     { DEFAULT: '#D5C4B0', dark: '#BBA582', soft: '#F6F0E7' },
        ink:     { DEFAULT: '#1C1916', 2: '#2A2521', 3: '#3A332D' },
        stone:   { DEFAULT: '#8D8078', 2: '#B3A89F' },
        sand:    '#F1E8DA',
        cream:   '#FBF6EE',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        xs:   '3px',
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        pill: '999px',
      },
      boxShadow: {
        xs:   '0 1px 2px rgba(28,25,22,0.06)',
        sm:   '0 2px 8px rgba(28,25,22,0.07)',
        md:   '0 6px 20px rgba(28,25,22,0.10)',
        lg:   '0 16px 40px rgba(28,25,22,0.14)',
        card: '0 4px 24px rgba(28,25,22,0.08)',
      },
    },
  },
  plugins: [],
};
export default config;

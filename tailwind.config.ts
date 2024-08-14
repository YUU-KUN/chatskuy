import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#ee362e',
        'red': '#ee362e',
        'secondary': '#0A192FD9',
        'grey': '#F0F1F2',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        '10': ['10px', {
          lineHeight: '12px',
        }],
        '12': ['12px', {
          lineHeight: '14.4px',
        }],
        '14': ['14px', {
          lineHeight: '19.1px',
        }],
        '16': ['16px', {
          lineHeight: '19.2px',
        }],
        '18': ['18px', {
          lineHeight: '24.55px',
        }],
        '20': ['20px', {
          lineHeight: '24.55px',
        }],
        '24': ['24px', {
          lineHeight: '39.5px',
        }],
        '32': ['32px', {
          lineHeight: '38.4px',
        }],
        '36': ['36px', {
          lineHeight: '49.1px',
        }],
        '40': ['40px', {
          lineHeight: '48.76px',
        }],
        '48': ['48px', {
          lineHeight: '65px',
        }],
        '51': ['51px', {
          lineHeight: '45.74px',
        }],
        '63': ['63px', {
          lineHeight: '56px',
        }],
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
      },
      width: {
        "10v": "10vw",
        "20v": "20vw",
        "30v": "30vw",
        "40v": "40vw",
        "50v": "50vw",
        "60v": "60vw",
        "70v": "70vw",
        "80v": "80vw",
        "90v": "90vw",
      },
    },
    screens: {
      'phone': '460px',
      // => @media (min-width: 460px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
export default config;

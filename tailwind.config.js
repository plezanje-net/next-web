/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["25px", "32px"],
      "2xl": ["31px", "38px"],
      "3xl": ["39px", "48px"],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
    },
    colors: {
      white: "#ffffff",
      blue: {
        100: "#aaccf0",
        // 200: "...",  // will be added if/when needed
        // 300: "#...",
        // 400: "#...",
        500: "#2b7fd9",
        600: "#246cb8",
        700: "#1e5998",
        // 800: "#...",
        // 900: "#...",
      },
      neutral: {
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
      red: {
        500: "#D9422B",
      },
      current: "currentColor",
      // ...
    },
  },
  plugins: [],
};

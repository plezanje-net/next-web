/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    fontSize: {
      sm: ["13px", "20px"],
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
        50: "#d5e5f7",
        100: "#aaccf0",
        200: "#8ab9ea",
        300: "#6ba5e4",
        // 400: "#...",
        500: "#2b7fd9",
        600: "#256cb8",
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
        25: "#FBECEA",
        50: "#F7D9D5",
        100: "#F0B3AA",
        500: "#d9422b",
      },
      current: "currentColor",

      // ...
    },
    extend: {
      screens: { xs: "512px" },
      width: {
        13: "3.25rem", // 52px
        30: "7.5rem", // 120px
      },
      minWidth: {
        0.5: "0.125rem", // 2px
        8: "2rem", // 32px
        14: "3.5rem", // 56px
        16: "4rem", // 64px
        20: "5rem", // 80px
        22: "5.5rem", // 88px
        28: "7rem", // 112px
        30: "7.5rem", // 120px
        32: "8rem", // 128px
        34: "8.5rem", // 136px
        36: "9rem", // 144px
      },
      margin: {
        18: "4.5rem", // 72px
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
  ],
};

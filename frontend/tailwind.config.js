/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: ["selection"],
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        figtree: ["Figtree", "sans-serif"],
        robotoFlex: ['"Roboto Flex"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
        firaSans: ['"Fira Sans"', "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        tiltWarp: ['"Tilt Warp"', "cursive"],
        outfit: ["Outfit", "sans-serif"],
        nirmala: ["Nirmala UI", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      listStyleType: {
        alpha: "lower-alpha",
      },
    },
  },
  plugins: [],
};

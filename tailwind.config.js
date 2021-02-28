const colors = require("tailwindcss/colors");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      darkMode: "class",
      colors: {
        primary: colors.blue,
        secondary: colors.amber,
        prontodark: {
          "50": "#9ea0b3",
          "100": "#8f92a8",
          "200": "#747790",
          "300": "#5a5d72",
          "400": "#454654",
          "500": "#2c2d35",
          "600": "#22232a",
          "700": "#17171c",
          "800": "#0e0e11",
          "900": "#020203",
        },
      },
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

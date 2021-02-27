module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      darkMode: "class",
      colors: {
        prontodark: {
          "50": "#10f10d109",
          "100": "#f6f7f9",
          "200": "#c3cbda",
          "300": "#919fbb",
          "400": "#5f749b",
          "500": "#404e68",
          "600": "#344055",
          "700": "#293242",
          "800": "#1f2633",
          "900": "#131820",
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

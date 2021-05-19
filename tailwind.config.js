module.exports = {
  purge: ["./app/**/*.tsx", "./app/**/*.jsx", "./app/**/*.js", "./app/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        twitterblue: {
          light: "#0f95e8",
          DEFAULT: "#1fa1f1",
        },
        darkblue: {
          DEFAULT: "#161f2b",
        },
      },
    },
  },
  variants: {
    extend: {
      borderStyle: ["hover"],
    },
  },
  plugins: [],
};

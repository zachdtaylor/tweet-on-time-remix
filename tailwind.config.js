module.exports = {
  mode: "jit",
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
        primary: {
          DEFAULT: "#11111e",
        },
        secondary: {
          DEFAULT: "#0E66A1",
        },
        accent: {
          DEFAULT: "#743BD1",
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

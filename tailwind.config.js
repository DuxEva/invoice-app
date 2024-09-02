/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        "scale-up": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "scale-up": "scale-up 300ms ease-out forwards",
      },
      colors: {
        purple: {
          1: "#7C5DFA",
          2: "#9277FF",
          3: "#7E88C3",
        },
        darkblue: {
          1: "#1E2139",
          2: "#252945",
        },
        grey: {
          1: "#F8F8FB ",
          2: "#DFE3FA",
          3: "#888EB0",
          4: "#373B53",
        },
        black: {
          1: "#0C0E16",
          2: "#141625",
        },
        red: {
          1: "#EC5757",
          2: "#9277FF",
        },
        green: {
          1: "#33D69F",
        },
        yellow: {
          1: "#FF8F00",
        },
      },
    },
  },
  plugins: [],
};

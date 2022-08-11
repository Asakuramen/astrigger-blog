/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "tracking-in-expand":
          "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        "tilt-in-top-1":
          "tilt-in-top-1 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0",
          },
          "40%": {
            opacity: ".6",
          },
          to: {
            opacity: "1",
          },
          "tilt-in-top-1": {
            "0%": {
              transform: "rotateY(30deg) translateY(-300px) skewY(-30deg)",
              opacity: "0",
            },
            "100%": {
              transform: "rotateY(0deg) translateY(0) skewY(0deg)",
              opacity: "1",
            },
          },
        },
      },
    },
  },
  plugins: [],
};

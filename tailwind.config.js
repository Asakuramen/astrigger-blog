/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        danger: "var(--color-danger)",
        body: "var(--color-body)",
        subbody: "var(--color-subbody)",
      },
      animation: {
        "slide-in-bottom":
          "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-out-bottom":
          "slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "fade-in": "fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-out-top":
          "fade-out-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-out-bottom": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(20px)",
            opacity: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-out-top": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(-30px)",
            opacity: "0",
            visibility: "hidden",
          },
        },
      },
    },
  },
  plugins: [],
};

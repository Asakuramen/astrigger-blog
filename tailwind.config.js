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
        "flicker-fast": "flicker-3pulse 1.5s linear  infinite both",
        "flicker-slow": "flicker-75 2.2s linear  infinite both",
        "slide-in-right":
          "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-in-left":
          "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "blink-sun-opacity": "blink-sun-opacity 12s linear infinite   both",
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
        "flicker-3pulse": {
          "0.1%,4.9%,10.1%,14.9%,20.1%,24.9%": {
            opacity: "1",
          },
          "0.0%,5.0%,10.0%,15.0%,20.0%,25.0%,to": {
            opacity: "0.4",
          },
        },
        "flicker-75": {
          "25.1%,to": {
            opacity: "1",
          },
          "0%,25%": {
            opacity: "0",
          },
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "blink-sun-opacity": {
          "0%,15%,to": {
            opacity: "0",
          },
          "1%": {
            opacity: "0.5",
          },
          "0.5%,1.5%": {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};

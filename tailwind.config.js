/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in-blurred-bottom":
          "slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both",
        "slide-out-blurred-bottom":
          "slide-out-blurred-bottom 0.45s cubic-bezier(0.895, 0.030, 0.685, 0.220)   both",
        "swing-in-top-fwd":
          "swing-in-top-fwd 1.0s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both",
      },
      keyframes: {
        "slide-in-blurred-bottom": {
          "0%": {
            transform: "translateY(1000px) scaleY(2.5) scaleX(.2)",
            "transform-origin": "50% 100%",
            filter: "blur(40px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: "1",
          },
        },
        "slide-out-blurred-bottom": {
          "0%": {
            transform: "translateY(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(1000px) scaleY(2) scaleX(.2)",
            "transform-origin": "50% 100%",
            filter: "blur(40px)",
            opacity: "0",
          },
        },
        "swing-in-top-fwd": {
          "0%": {
            transform: "rotateX(-100deg)",
            "transform-origin": "top",
            opacity: "0",
          },
          to: {
            transform: "rotateX(0deg)",
            "transform-origin": "top",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};

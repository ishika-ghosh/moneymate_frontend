// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ["Jakarta-Regular", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#608bbb",
          200: "#904aff",
          300: "#00fad9",
          400: "rgb(236 72 153)",
        },
        gray: {
          10: "#e0e0e6",
          20: "#c1c1cd",
          30: "#979899",
          40: "#83839c",
          50: "#666680",
          60: "#4e4e61",
          70: "#0f0e13",
          80: "#33333F",
          90: "#222226",
          100: "#1c1c24",
          200: "#4e4e61",
        },
      },
    },
  },
  plugins: [],
};

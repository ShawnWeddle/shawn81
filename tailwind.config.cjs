/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "site-blue": "#00CCCC",
      "site-blue-dark": "#006666",
      "site-pink": "#FF94ED",
      "site-pink-dark": "#99598E",
      "site-gray-med": "#45454D",
      "site-gray-dark": "#242626",
      "site-red": "#CC0000",
      "white": "#FFFFFF",
      "black": "#000000",
    },
    animation: {
      pop1: "flash1 3s infinite",
      pop2: "flash2 3s infinite",
    },
    keyframes: {
      flash1: {
        "0%": {backgroundColor: "#242626",},
        "50%": {backgroundColor: "#45454D",},
        "100%": {backgroundColor: "#242626",},
      },
      flash2: {
        "0%": {backgroundColor: "#45454D",},
        "50%": {backgroundColor: "#242626",},
        "100%": {backgroundColor: "#45454D",},
      }
    },
    extend: {
      
    },
  },
  plugins: [],
};

module.exports = config;

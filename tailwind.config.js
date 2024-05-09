/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        mainColor: "#615DFA",
        secondoryColor: "#23D2E2",
        grayColor: "#AFB0C0",
        whiteGrayColor: "#DEDEDE",
        aboutHeading: "#3E3F5E",
      },
      spacing: {
        // "20%": "20%",
        container: "1628px",
      },
      borderWidth: {
        10: "10px",
      },
    },
  },
  plugins: [],
};

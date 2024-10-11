/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#06255b",
        secondary: "#1bd9c5",
        accent: "#149279",
        lightGray: "#fafafa",
      },
      borderRadius: {
        xl: "25px",
      },
      boxShadow: {
        custom: "0 0 20px 1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

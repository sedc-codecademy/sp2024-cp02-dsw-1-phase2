module.exports = {
  content: [
    "./index.html", // Ensure this matches the location of your HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // This covers all JS, TS, JSX, and TSX files in your src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#06255b',
        secondary: '#1bd9c5',
        accent: '#149279',
        lightGray: '#fafafa',
      },
      borderRadius: {
        xl: '25px',
      },
      boxShadow: {
        custom: '0 0 20px 1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

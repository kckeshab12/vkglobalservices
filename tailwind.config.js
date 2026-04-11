/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vk: {
          primary: "#7A1C2F",
          secondary: "#D8ECFF",
          accent: "#F8FBFF",
          neutral: "#FFFFFF",
          ink: "#21161A",
          line: "#E8D7DB",
          soft: "#F7EEF1",
          sky: "#DCEEFF",
        },
      },
    },
  },
  plugins: [],
};

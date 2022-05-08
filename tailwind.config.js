module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {

      },
      gridTemplateColumns: {
        "paragraph": "1fr 2rem",
        "evidence": "2fr 6rem 1fr"
      },
      gridTemplateRows: {
        "evidence": "2rem 1fr"
      },
    },
  },
  plugins: [],
}

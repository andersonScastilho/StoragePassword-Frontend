/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "principal": "#8b0000",
        "secundaria": "#a1030b",
        "destaque": "#663366",
        "fundo": "#d30519",
        "texto-principal": "#000000",
        "texto-secundario": "#bdc3c7",
      },
      borderColor: {
        "color-principal": "#000000"
      },
      borderRadius: {
        "7": "7px",
      },
      width: {
        "28rem": "28rem"
      },
      height: {
        "30rem": "30rem"
      },
      boxShadow: {
        'entry': 'inset -4px 4px 0 #222 '
      }
    },
  },
  plugins: [],
}

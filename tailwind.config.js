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
        "principal": " #FF2D00",
        "secundaria": "#00A8FF",
        "terciaria": "#870000",
        "fundo": "#00002c",

        "texto-principal": "#FFFFFF",
        "texto-secundario": "",
        "texto-error": '#FF0000'
      },
      borderRadius: {
        "radius-7px": "7px",
      },
      width: {
        "form-container": "28rem",
        "form-create-account": "35rem"
      },
      height: {
        "form-container": "30rem",
        "form-create-account": "30rem"
      },
      boxShadow: {
        'login-button': 'inset -4px 4px 0 #222 '
      }
    },
  },
  plugins: [],
}

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
        "login": "url(https://initiate.alphacoders.com/images/132/stretched-1366-768-1322753.jpeg?3315)"
      },
      colors: {
        "principal": "#870000",
        "secundaria": "#FF2D00",

        "fundo-principal": "#222222",
        "fundo-principal-opaco": "rgb(192,192,192,0.8)",
        "fundo-secundario": "#870000",

        "destaque": "#ff8207",
        "destaque-secundario": "#d53d0c",

        "texto-principal": "#870000",
        "texto-secundario": "#FFFFFF",

        "texto-error": '#FF0000'
      },
      borderRadius: {
        "radius-7px": "7px",
      },
      width: {
        "form-login-container": "28rem",
        "form-create-account": "35rem"
      },
      height: {
        "form-login-container": "30rem",
        "form-create-account": "30rem"
      },
      boxShadow: {
        'login-button': 'inset -4px 4px 0 #222 '
      }
    },
  },
  plugins: [],
}

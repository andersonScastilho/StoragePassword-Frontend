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
        "login": "url(https://img.freepik.com/fotos-gratis/uma-pintura-de-um-lago-de-montanha-com-uma-montanha-ao-fundo_188544-9126.jpg)"
      },
      zIndex: {
        '100': '100'
      },
      colors: {
        "principal": "#870000",
        "secundaria": "#FF2D00",
        'loading': 'rgba(0, 0, 0, 0.5)',
        "fundo-principal": "#222222",
        "fundo-principal-opaco": "rgb(192,192,192,0.8)",
        "fundo-secundario": "#870000",

        "destaque": "#ff8207",
        "destaque-secundario": "#d53d0c",

        "texto-principal": "#870000",
        "texto-secundario": "#FFFFFF",
        "texto-error": '#FF0000',

        "color-principal": "#870000",
        "color-contraste": "#FF5733",
        "color-complemento": "#A83232",
        "color-destaque": "#FFC300",
        "color-contraste-secundario": "#5F6CAF",
        "color-frescor": "#00A388"
      },
      borderRadius: {
        "radius-7px": "7px",
      },
      maxWidth: {
        '1/2': '50%'
      },
      width: {
        "form-login-container": "28rem",
        "form-create-account": "35rem"
      },
      height: {
        "form-login-container": "30rem",
        "form-create-account": "30rem",
        "form-create-account-max-height": "35rem"
      },
      boxShadow: {
        'login-button': 'inset -4px 4px 0 #222 '
      }

    },
  },
  plugins: [],
}

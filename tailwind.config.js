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
      maxWidth: {
        '1/2': '50%'
      }
    },
  },
  plugins: [],
}

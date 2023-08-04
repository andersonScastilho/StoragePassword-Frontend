/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'principal': "#3498db",
        "secundaria": "#2ecc71",
        "destaque": "#f39c12",
        "fundo": "#f5f5f5",
        "texto-principal": "#000000",
        "texto-secundario": "#333333"
      }
    },
  },
  plugins: [],
}

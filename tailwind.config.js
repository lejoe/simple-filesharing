
const { iconsPlugin, dynamicIconsPlugin } = require("@egoist/tailwindcss-icons")

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [iconsPlugin(), dynamicIconsPlugin()],
}


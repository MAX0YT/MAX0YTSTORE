module.exports = {
  purge: {
    content: [
    "./**/*.{js,html,css}",
    "./node_modules/flowbite/**/*.js"
  ]
  },
  mode: 'jit',
  content: [
    "./**/*.html",
    "./src/**/*.{js,html,css}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
  require('flowbite/plugin')
]
}
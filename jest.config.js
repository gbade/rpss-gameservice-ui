module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/'],
    transform: {
      "^.+\\.js$": "babel-jest"
    }
}

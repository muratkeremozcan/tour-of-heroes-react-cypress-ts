module.exports = {
  plugins: ['eslint-plugin-cypress'],
  extends: ['react-app', 'plugin:cypress/recommended', 'react-app/jest'],
  env: {'cypress/globals': true},
}

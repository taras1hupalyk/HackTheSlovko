const { EnvironmentPlugin, webpack } = require('webpack');

const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [new EnvironmentPlugin(['BACKEND_HOST', 'BACKEND_PORT'])],
}

const { EnvironmentPlugin, webpack } = require('webpack');

const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new EnvironmentPlugin({
      BACKEND_HOST: 'localhost',
      BACKEND_PORT: '7075'
    })
  ],
}

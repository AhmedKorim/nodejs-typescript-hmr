process.env.NODE_ENV = 'production';
const config = require('./webpack.config');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const dist = 'build';

module.exports = {
  ...config,
  entry: ['./src/main.ts'],
  mode: 'production',
  devtool: 'source-map',
  externals: [
    nodeExternals({
      whitelist: [],
    }),
  ],
  output: {
    path: path.join(__dirname, dist),
    filename: 'compiled.js',
  },
  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true,
    moduleIds: 'named',
  },
  plugins: [new CleanWebpackPlugin(), ...config.plugins],
};

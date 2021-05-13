process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const StartServerPlugin = require('start-server-webpack-plugin');

const dist = 'dist';
module.exports = {
  ...config,
  entry: ['webpack/hot/poll?100', './src/main.hmr.ts'],
  watch: true,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, dist),
    filename: 'bin.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    // new StartServerPlugin({
    //   name: 'server.js',
    //   nodeArgs: ['--inspect'], // allow debugging
    // }),
    ...config.plugins,
  ],
};

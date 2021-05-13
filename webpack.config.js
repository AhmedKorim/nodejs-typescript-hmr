const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
console.info(`Starting Build in ${isDev ? 'Development' : 'Production'} Mode`);
module.exports = {
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: isDev ? 'happypack/loader?id=ts' : 'ts-loader',
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: 'graphql-import-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      exclude: [/node_modules/],
      test: /\.ts($|\?)/i,
    }),
    new HappyPack({
      id: 'ts',
      // We will leve one core for the type-checker
      threads: Math.max(require('os').cpus().length - 1, 1),
      loaders: [
        {
          path: 'ts-loader',
          query: {
            happyPackMode: isDev,
            transpileOnly: isDev,
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: isDev,
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  stats: true,
};

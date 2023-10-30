/* eslint-disable */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const JS_DIR = path.resolve(__dirname, './src');
const JS_ASSET = path.resolve(__dirname, './assets');

const commonConfig = {
  entry: {
    'graditify_product-variants': './assets/graditify_product-variants.module.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [JS_DIR, JS_ASSET],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

module.exports = (argv) => {
  const isDevelopment = argv.mode === 'development';

  const config = {
    ...commonConfig,
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    module: {
      rules: [
        ...commonConfig.module.rules,
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: isDevelopment ? [] : [new MiniCssExtractPlugin()],
  };

  return config;
};

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'), // можно убрать src из пути к файлам
  mode: 'development',
  entry: {
    main: './js/index.js',  // убрали src так как есть context
    analytics: './js/analytics.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html', 
      favicon: './assets/favicon.ico',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(ttf|woff|woff2|eot|otf)$/,
      //   use: ['file-loader'],
      // } подключение шрифтов почему то работает и без этого 
    ],
  },
}
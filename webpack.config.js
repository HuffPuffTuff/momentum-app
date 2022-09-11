const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitignoreBuildWebpackPlugin = require('gitignore-build-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'), // можно убрать src из пути к файлам
  mode: 'development',
  entry: {
    main: './js/index.js',  // убрали src так как есть context
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
    new GitignoreBuildWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './assets/sounds/*',
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: './assets/quotes.json',
          to: path.resolve(__dirname, 'dist/assets'),
        }
      ]
    }),
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
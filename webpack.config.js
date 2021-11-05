const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      serveIndex: true,
      watch: true
    },
    host: '0.0.0.0',
    port: 9000,
    allowedHosts: ['*']
  },
  entry: './src/styles/style.sass',

  module: {
    rules: [
      {test: /\.html$/, use: 'html-loader'},
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader'},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ]
      },
      {test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      experimentalUseImportModule: true
    }),
    new HtmlWebpackPlugin({
      title: 'Sergey Sokolov',
      template: './src/index.html',
      favicon: './src/static/favicon.png',
    }),
  ]
};

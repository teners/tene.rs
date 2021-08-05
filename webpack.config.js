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
  entry: {
    index: './src/scripts/index.ts',
    background: './src/scripts/background.ts',
  },
  optimization: {
    runtimeChunk: 'single'
  },
  resolve: {extensions: [ '.tsx', '.ts', '.js' ]},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  experiments: {
    asset: true,
  },
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
      {test: /\.css$/, use: ['postcss-loader', 'css-loader', 'style-loader']},
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
      {test: /\.(obj|mtl|png)$/, type: 'asset/resource'},
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
      meta: {
        author: 'teners',
        charset: 'utf8',
      }
    }),
    new HtmlWebpackPlugin({
      filename: "seryoja.html",
      template: './src/seryoja.html',
    })
  ]
};

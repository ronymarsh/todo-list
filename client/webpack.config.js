const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = (process.env.NODE_ENV || 'development').trim();
const outputDir = path.resolve(__dirname, '..', 'build');

console.log('this is webpack.config ', mode);

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: outputDir,
  }),
];

console.log(plugins);

module.exports = {
  mode,

  target: 'web',

  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: outputDir,
    publicPath: '/', //mode === 'production' ? '/' : '.',
    assetModuleFilename: 'images/[name].[hash][ext]',
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  devtool: 'source-map',
  //A request to /api/users will now proxy the request to http://localhost:5000/api/users.
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    historyApiFallback: true,
    static: {
      directory: outputDir,
      publicPath: '/',
    }, //path.resolve(__dirname, 'public'),
    port: 3000,
    hot: true,
    open: true,
  },
};

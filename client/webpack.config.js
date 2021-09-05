const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = (process.env.NODE_ENV || 'development').trim();

console.log('this is webpack.config ', mode);

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/template.html',
  }),
];

module.exports = {
  mode,

  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: mode === 'production' ? '/' : '.',
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
    ],
  },
  devtool: 'source-map',
  //A request to /api/users will now proxy the request to http://localhost:5000/api/users.
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    static: path.resolve(__dirname, 'public'),
    port: 3000,
    hot: true,
    open: true,
  },
};


const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  mode: mode,
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: 'client/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  stats: { 
    children: true 
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss?/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    port: 8080,
    static: ['./client'],
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};

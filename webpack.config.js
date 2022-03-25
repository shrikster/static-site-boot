const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const devMode = process.env.NODE_ENV !== 'production';
const basePath = path.resolve(__dirname, 'dist');

let plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]

const devPlugins = [
  new webpack.HotModuleReplacementPlugin()
]

if (devMode) {
  plugins.concat(devPlugins);
}

const config = {
  entry: [
    './src/scripts/main.ts',
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'main.[hash].js',
    path: basePath,
  },
  devtool: devMode ? 'eval-source-map' : 'none',
  plugins,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  devServer: {
    port: 1337,
    hot: true
  }
}

module.exports = config;
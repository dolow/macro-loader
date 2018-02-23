const webpack = require('webpack');
const path = require('path');

// TODO: minify

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.ts'),
  },

  output: {
    path: path.join(__dirname, 'bin'),
    filename: 'index.js',
    library: 'macro-loader',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts']
  },

  devtool: false,

  node: {
    fs: 'empty'
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};

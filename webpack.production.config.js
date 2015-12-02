var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/'
  },
  devtool: 'hidden-sourcemap',
  plugins: [

    //from react-starter
    new webpack.PrefetchPlugin('react'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel?stage=0'
        ],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer-loader?browsers=last 2 version', 'sass' ]
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  }
}
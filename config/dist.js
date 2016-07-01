/* eslint-disable max-len */

import path from 'path'
import webpack from 'webpack'
import base from './base'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const loaders = [{
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '..', 'client', 'scripts'),
  exclude: path.join(__dirname, '/node_modules/'),
}, {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css?module&importLoaders=1!postcss'),
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', 'css?module&importLoaders=1!postcss!resolve-url!sass'),
}]

const config = Object.assign({}, base.config, {
  entry: {
    app: ['./scripts/client.jsx'],
  },
  cache: false,
  devtool: '#source-map',
  name: 'client bundle',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: base.getLoaders().concat(loaders),
  },
})

export default config

/* eslint-disable max-len */
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import base from './base'
import merge from 'lodash/merge'

const loaders = [{
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '..', 'app', 'scripts'),
  exclude: path.join(__dirname, '/node_modules/'),
  query: {
    plugins: [
      'transform-object-rest-spread',
      'transform-runtime',
    ],
  },
}, {
  test: /\.css$/,
  loaders: [
    'isomorphic-style',
    `css?${JSON.stringify({
      modules: true,
      importLoaders: 1,
      localIdentName: '[hash:base64:5]',
    })}`,
    'postcss',
  ],
}, {
  test: /\.scss$/,
  loaders: [
    'isomorphic-style',
    `css?${JSON.stringify({
      modules: true,
      importLoaders: 1,
      localIdentName: '[hash:base64:5]',
    })}`,
    'postcss',
    'resolve-url',
    'sass',
  ],
}].concat(base.getLoaders())

// //////////////////////////////////////////////////////
// Client Config
// //////////////////////////////////////////////////////

const client = Object.assign({}, base.config, {
  name: 'client',
  entry: {
    app: ['./scripts/client.jsx'],
    vendor: ['./scripts/vendor/index.js'],
  },
  cache: false,
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVCLIENT__: false,
      __DEVSERVER__: false,
    }),
  ],
  module: {
    loaders,
  },
})

// //////////////////////////////////////////////////////
// Server Config
// //////////////////////////////////////////////////////

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const server = merge({}, base.config, {
  name: 'server',
  entry: {
    server: ['./scripts/server.jsx'],
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
    }),
  ],
  module: {
    loaders,
  },
})

// Passing an array to Webpack enables its multi-compiler mode, allowing us to build both
// client and server configurations in one command.
const config = [client, server]

export default config

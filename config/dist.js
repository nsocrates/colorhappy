/* eslint-disable max-len */
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import base from './base'
import merge from 'lodash/merge'

const commonLoaders = [{
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
}]

// //////////////////////////////////////////////////////
// Client Config
// //////////////////////////////////////////////////////
const clientLoaders = {
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '..', 'client'),
  exclude: path.join(__dirname, '/node_modules/'),
}

const client = merge({}, base.config, {
  name: 'client',
  entry: {
    app: './scripts/index.jsx',
    vendor: ['./scripts/vendor/index.js'],
  },
  cache: false,
  devtool: false,
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
    loaders: base.getLoaders().concat(commonLoaders, clientLoaders),
  },
})

// //////////////////////////////////////////////////////
// Server Config
// //////////////////////////////////////////////////////
// const outputPath = path.join(__dirname, '..', 'dist')
// const publicPath = '/assets/'

const serverLoaders = {
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [
    path.join(__dirname, '..', 'client'),
    path.join(__dirname, '..', 'server'),
  ],
  exclude: path.join(__dirname, '/node_modules/'),
}

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
  context: path.join(__dirname, '..', 'server'),
  entry: {
    server: './server.jsx',
  },
  target: 'node',
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
  resolve: {
    root: [path.join(__dirname, '..', 'client')],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
    }),
  ],
  module: {
    loaders: base.getLoaders().concat(commonLoaders, serverLoaders),
  },
})

const config = [client, server]

export default config

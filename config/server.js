import path from 'path'
import webpack from 'webpack'
import base from './base'
import fs from 'fs'
import merge from 'lodash/merge'

// Node externals
const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = `commonjs ${mod}`;
  });

// Add loaders
const loaders = [{
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '..', 'app', 'scripts'),
  exclude: path.join(__dirname, '..', 'node_modules'),
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
      localIdentName: '[name]__[local]___[hash:base64:5]',
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
      localIdentName: '[name]__[local]___[hash:base64:5]',
    })}`,
    'postcss',
    'resolve-url',
    'sass',
  ],
}]

const config = merge({}, base.config, {
  name: 'server bundle',
  entry: {
    server: ['./scripts/server.jsx'],
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
    }),
  ],
  module: {
    loaders: base.getLoaders().concat(loaders),
  },
})

export default config

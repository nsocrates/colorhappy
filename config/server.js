import path from 'path'
import webpack from 'webpack'
import base from './base'
import fs from 'fs'
const outputPath = path.join(__dirname, '..', 'dist')

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
  include: [
    path.join(__dirname, '..', 'client'),
    path.join(__dirname, '..', 'server'),
  ],
  exclude: path.join(__dirname, '/node_modules/'),
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

const config = Object.assign({}, base.config, {
  name: 'server bundle',
  entry: {
    server: path.resolve(__dirname, '..', 'server', 'server.jsx'),
  },
  target: 'node',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: outputPath,
  },
  externals: nodeModules,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
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

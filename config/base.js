import path from 'path'
import autoprefixer from 'autoprefixer'

const srcPath = path.join(__dirname, '..', 'client')
const scriptsPath = path.join(__dirname, '..', 'client', 'scripts')
const outputPath = path.join(__dirname, '..', 'dist')

const baseConfig = {
  context: srcPath,
  debug: true,
  output: {
    filename: '[name].js',
    path: outputPath,
  },
  devServer: {
    hot: true,
    noInfo: true,
    stats: {
      colors: true,
    },
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      styles: `${srcPath}/styles/`,
      assets: `${srcPath}/assets/`,
      vendor: `${scriptsPath}/vendor/`,
      services: `${scriptsPath}/services/`,
      components: `${scriptsPath}/components/`,
      routes: `${scriptsPath}/routes/`,
      utils: `${scriptsPath}/utils/`,
      actions: `${scriptsPath}/redux/actions/`,
      constants: `${scriptsPath}/redux/constants/`,
      reducers: `${scriptsPath}/redux/reducers/`,
      sagas: `${scriptsPath}/redux/sagas/`,
      store: `${scriptsPath}/redux/store/`,
    },
  },
  postcss() {
    return [
      autoprefixer({ browsers: ['last 2 versions'] }),
    ]
  },
}

const getLoaders = () => ([{
  test: /\.(png|jpg|gif|woff|woff2)$/,
  loader: 'url',
  query: { name: '[hash].[ext]',
    limit: 8192,
  },
}, {
  test: /\.(mp4|ogg|svg)$/,
  loader: 'file-loader',
}, {
  test: /\.json$/,
  loader: 'json-loader',
}])

const config = JSON.parse(JSON.stringify(baseConfig))

export default {
  getLoaders,
  config,
}

const path = require('path')

const srcPath = path.join(__dirname, '..', 'client')
const scriptsPath = path.join(__dirname, '..', 'client', 'scripts')

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      styles: `${srcPath}/styles/`,
      assets: `${srcPath}/assets/`,
      vendor: `${scriptsPath}/vendor/`,
      components: `${scriptsPath}/components/`,
      routes: `${scriptsPath}/routes/`,
      utils: `${scriptsPath}/utils/`,
      actions: `${scriptsPath}/redux/actions/`,
      constants: `${scriptsPath}/redux/constants/`,
      reducers: `${scriptsPath}/redux/reducers/`,
      services: `${scriptsPath}/redux/services/`,
      sagas: `${scriptsPath}/redux/sagas/`,
      store: `${scriptsPath}/redux/store/`,
    },
  },
}

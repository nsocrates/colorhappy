/* eslint-disable global-require */

import development from './config/dev'
import production from './config/dist'
import server from './config/server'

// List of allowed environments
const allowedEnvs = ['development', 'production']

// Set the correct environment
const currEnv = process.env.NODE_ENV

// Get available configurations
const configs = {
  development,
  production,
  server,
}

// Get valid environment
function getValidEnv(env) {
  const isValid = !!env && allowedEnvs.indexOf(env) !== -1
  if (process.env.WEBPACK_ENV === 'server') return 'server'
  return isValid ? env : 'development'
}

// Build the webpack configuration
function buildConfig(env) {
  const usedEnv = getValidEnv(env)
  return configs[usedEnv]
}

export default buildConfig(currEnv)

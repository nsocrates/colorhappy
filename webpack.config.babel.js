import development from './config/dev'
import production from './config/dist'
import server from './config/server'

const configs = {
  development,
  production,
  server,
}

function getValidEnv(allowed, env) {
  const isValid = !!env && allowed.indexOf(env) !== -1
  return isValid ? env : 'development'
}

const buildConfig = cfg => node => {
  const allowedEnvs = Object.keys(cfg)
  const envToUse = getValidEnv(allowedEnvs, node)
  return cfg[envToUse]
}

export default buildConfig(configs)(process.env.NODE_ENV)

import development from './development'
import production from './production'

const configs = {
  development,
  production,
}

function getValidEnv(allowed, env) {
  const isValid = !!env && allowed.indexOf(env) !== -1
  return isValid ? env : 'development'
}

const buildConfig = cfg => env => {
  const allowedEnvs = Object.keys(cfg)
  const envToUse = getValidEnv(allowedEnvs, env)
  return cfg[envToUse]
}

export default buildConfig(configs)(process.env.NODE_ENV)

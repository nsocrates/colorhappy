import development from './config/dev'
import production from './config/dist'
import server from './config/server'

const configs = {
  development,
  production,
  server,
}

const getValidEnv = allowedEnv => currentEnv => {
  const isValid = !!currentEnv && allowedEnv.indexOf(currentEnv) !== -1
  return isValid ? currentEnv : 'development'
}

const buildConfig = cfg => processEnv => {
  const allowedEnvs = getValidEnv(Object.keys(cfg))
  const envToUse = allowedEnvs(processEnv)

  return cfg[envToUse]
}

export default buildConfig(configs)(process.env.NODE_ENV)

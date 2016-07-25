// Base configuration

import path from 'path'

const port = 8000

const config = {
  // Server root
  root: path.dirname(require.main.filename),
  env: process.env.NODE_ENV,
  port: process.env.PORT || port,
  ip: process.env.IP || '0.0.0.0',
  domain: process.env.DOMAIN || `http://localhost:${port}`,
  secrets: {
    session: process.env.SECRET_SESSION || 'coolcat',
  },
}

export default config

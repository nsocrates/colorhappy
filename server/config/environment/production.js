// Production configurations

import base from './base'

const config = {
  pgp: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'colorhappy',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DB_SSL || false,
  },
}

export default Object.assign({}, base, config)

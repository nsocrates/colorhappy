// Production configurations

import base from './base'

const config = {
  pgp: {
    database: process.env.DB || 'colorhappy',
  },
}

export default Object.assign({}, base, config)

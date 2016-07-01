import api from '../api'
import auth from '../auth'

export default function configureRoutes(app) {
  app.use('/api', api)
  app.use('/auth', auth)
}

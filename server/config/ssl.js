import config from './environment'

// Redirect to HTTPS if request was not made with HTTPS.
function forceSSL(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `${config.domain}${req.url}`)
  }
  return next()
}

// Force SSL in production environment.
export default function configureSSL(app) {
  if (config.env === 'production') {
    app.use(forceSSL)
  }
}

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from './environment'
import express from 'express'
import methodOverride from 'method-override'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'
import PrettyError from 'pretty-error'
import compression from 'compression'

export default function configureExpress(app) {
  app.set('port', config.port)
  app.disable('x-powered-by')
  app.set('view cache', false)
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(methodOverride())

  if (config.env === 'production') app.use(compression())

  // Path to the root of our distribution folder.
  app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

  // Initialize Passport
  app.use(passport.initialize())

  app.use(morgan('dev'))
  const pe = new PrettyError()
  pe.start()
  pe.skipNodeFiles()
  pe.skipPackage('express')

  app.use((err, req, res, next) => {
    console.log(pe.render(err)) // eslint-disable-line no-console
    next()
  })
}

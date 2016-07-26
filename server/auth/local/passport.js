import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';

function findAndAuthenticate(User, username, password, done) {
  User.authenticate({
    username,
    password,
  })
    .then(user => done(null, user))
    .catch(err => done(err))
}

export default function configurePassport(User) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false, // We don’t need them: RESTful APIs are stateless
  }, (username, password, done) => findAndAuthenticate(User, username, password, done)))

  passport.serializeUser((user, next) => next(null, user.id))
  passport.deserializeUser((id, next) => (
    User.show({ id })
      .then(user => next(null, user))
      .catch(err => next(err))
  ))
}

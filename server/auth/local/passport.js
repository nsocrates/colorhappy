import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';

function findUser(User, email, password, done) {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false, { message: 'User does not exist' })
    return user.isMatch(password, (err2, authed) => {
      if (err2) return done(err2)
      if (!authed) return done(null, false, { message: 'Incorrect password' })
      return done(null, user)
    })
  })
}

export default function configurePassport(User) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', // Virtual field
    session: false, // We don’t need them: RESTful APIs are stateless
  }, (email, password, done) => findUser(User, email, password, done)))

  passport.serializeUser((user, next) => next(null, user.id))
  passport.deserializeUser((id, next) => (
    User.findById(id, (err, user) => (
      err ? next(err) : next(null, user)
    ))
  ))
}

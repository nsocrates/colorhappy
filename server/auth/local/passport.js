import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';

function findUser(User, username, password, done) {
  User.findCriteria(username, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false, { message: 'User does not exist' })
    return user.isMatch(password)
      .then(() => done(null, user))
      .catch(err2 => done(null, false, err2))
  })
}

export default function configurePassport(User) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password', // Virtual field
    session: false, // We don’t need them: RESTful APIs are stateless
  }, (username, password, done) => findUser(User, username, password, done)))

  passport.serializeUser((user, next) => next(null, user.id))
  passport.deserializeUser((id, next) => (
    User.findById(id, (err, user) => (
      err ? next(err) : next(null, user)
    ))
  ))
}

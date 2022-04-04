const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = (app) => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'The email is not registered!' })
          }
          return bcrypt.compare(password, user.password)
            .then(isMatched => {
              if (!isMatched) {
                return done(null, false, { message: 'Email or Password is incorrect!' })
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })

}
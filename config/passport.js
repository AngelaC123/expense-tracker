const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

module.exports = (app) => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('warning_msg', '這個Email尚未註冊！'))
          }
          return bcrypt.compare(password, user.password)
            .then(isMatched => {
              if (!isMatched) {
                return done(null, false, req.flash('warning_msg', 'Email或密碼有誤，請重新登入！'))
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

  passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    profileFields: ['email', 'displayName', 'photos']
  }, (accessToken, refreshToken, profile, done) => {

    const { email, name } = profile._json
    return User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => {
            return User.create({ name, email, password: hash })
          })
          .then(user => done(null, user))
          .catch(err => console.log(err))
      })
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
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/user')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedireect: '/user/login'

}))


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

  const { email, name, password, confirmPassword } = req.body
  if (!email || !name || !password || !confirmPassword) {
    console.log('Email, name, password and confimr password are all required!')
    return res.render('register', { email, name, password, confirmPassword })
  }

  if (password !== confirmPassword) {
    console.log('password and confimPassword do not match')
    return res.render('register', { email, name, password, confirmPassword })
  }

  return User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('The email has already registered!')
        return res.render('register', { email, name, password, confirmPassword })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({ email, name, password: hash })
          console.log('user account created!')
        })
        .then(() => res.redirect('/user/login'))
    })

    .catch(err => console.log(err))
})


// Logout
router.get('/logout', (req, res) => {

})


module.exports = router
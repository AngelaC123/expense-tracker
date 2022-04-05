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
  failureRedirect: '/user/login',
  successRedirect: '/'
}))


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const errors = []

  const { email, name, password, confirmPassword } = req.body
  if (!email || !name || !password || !confirmPassword) {
    errors.push({ msg: '名稱、Email、密碼及驗證密碼，都是必填欄位！' })
  }

  if (password !== confirmPassword) {
    errors.push({ msg: '密碼與驗證密碼不相符，請重新輸入！' })
  }
  if (errors.length) {
    return res.render('register', { errors, email, name, password, confirmPassword })
  }

  return User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ msg: '這個Email已被註冊！' })
        return res.render('register', { errors, email, name, password, confirmPassword })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({ email, name, password: hash })
          console.log('user account created!')
        })
        .then(() => {
          req.flash('success_msg', '註冊成功！請登入帳號開始使用！')
          res.redirect('/user/login')
        })
    })

    .catch(err => console.log(err))
})


// Logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出！')
  res.redirect('/user/login')
})


module.exports = router
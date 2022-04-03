const express = require('express')
const router = express.Router()

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  // add passport here
})


// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

})


// Logout
router.get('/logout', (req, res) => {

})


module.exports = router
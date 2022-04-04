const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const records = require('./modules/records')
const user = require('./modules/user')

router.use('/records', authenticator, records)
router.use('/user', user)
router.use('/', authenticator, home)

module.exports = router
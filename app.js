const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const PORT = 3000
const app = express()

const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

app.use(express.static('public'))
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: 'expenseTrackerSecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express server is now listening on http://localhost/:${PORT}`)
})
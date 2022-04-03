const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

const PORT = 3000
const app = express()

const routes = require('./routes')
require('./config/mongoose')

app.use(express.static('public'))
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)


app.listen(PORT, () => {
  console.log(`Express server is now listening on http://localhost/:${PORT}`)
})
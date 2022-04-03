const express = require('express')
const { engine } = require('express-handlebars')

const PORT = 3000
const app = express()

app.use(express.static('public'))
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.listen(PORT, () => {
  console.log(`Express server is now listening on http://localhost/:${PORT}`)
})
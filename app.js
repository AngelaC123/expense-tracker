const express = require('express')

const PORT = 3000
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>This is a expense tracker</h1>')
})

app.listen(PORT, () => {
  console.log(`Express server is now listening on http://localhost/:${PORT}`)
})
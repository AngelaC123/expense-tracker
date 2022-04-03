const express = require('express')
const router = express.Router()


// Create new
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  //res.render('...')
})


// // Check one expense
// router.post('/:id', (req, res) => {
//   //res.render('...')
// })

// Edit 
router.get('/:id/edit', (req, res) => {
  //res.render('...')
})

router.post('/:id/edit', (req, res) => {
  //res.render('...')
})

// Delete
router.post('/:id', (req, res) => {
  //res.render('...')
})

module.exports = router
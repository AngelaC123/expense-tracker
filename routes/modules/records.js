const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')


// Create new
router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(category => {
      res.render('new', { category })
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const record = req.body

  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

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
const express = require('express')
const category = require('../../models/category')
const router = express.Router()

const Category = require('../../models/category')
const Expense = require('../../models/expense')


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
  const expense = req.body

  return Expense.create(expense)
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
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

let categoriesDisplay = []
let totalAmount = 0

router.get('/', (req, res) => {

  Category.find()
    .lean()
    .then(categories => {
      categoriesDisplay = categories
    })

  return Record.find()
    .lean()
    .then(record => {
      let totalAmount = 0
      record.forEach(data => totalAmount += data.amount)
      res.render('index', { record, category: categoriesDisplay, totalAmount })
    })
    .catch(err => console.log(err))



})
module.exports = router
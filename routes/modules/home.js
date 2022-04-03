const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')


router.get('/', (req, res) => {

  Category.find()
    .lean()
    .then(category => {

      return Record.find()
        .populate('categoryId')
        .lean()
        .then(record => {
          let totalAmount = 0
          record.forEach(data => totalAmount += data.amount)
          res.render('index', { record, category, totalAmount })
        })
        .catch(err => console.log(err))
    })
})

module.exports = router

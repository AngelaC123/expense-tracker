const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({

  name: {
    type: String,
    required: true
  },
  iconClassList: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Category', categorySchema)
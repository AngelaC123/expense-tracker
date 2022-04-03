const category = require('../../category.json').categoy
const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  return Promise.all(Array.from(category, (data, i) => {
    Category.create({ name: data.name, iconClassList: data.icon })
  }))
    .then(() => {
      console.log('categorySeeder done!')
      // process.exit()
    })
})
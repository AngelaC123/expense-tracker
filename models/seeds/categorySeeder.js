const Category = require('../category')

const db = require('../../config/mongoose')

const SEED_CATEGORIES = [
  {
    "name": "家居物業",
    "icon": "fa-solid fa-house"
  },
  {
    "name": "交通出行",
    "icon": "fa-solid fa-van-shuttle"
  },
  {
    "name": "休閒娛樂",
    "icon": "fa-solid fa-face-grin-beam"
  },
  {
    "name": "餐飲食品",
    "icon": "fa-solid fa-utensils"
  },
  {
    "name": "其他",
    "icon": "fa-solid fa-pen"
  }
]

db.once('open', () => {
  return Promise.all(Array.from(SEED_CATEGORIES, (data, i) => {
    return Category.create({ name: data.name, iconClassList: data.icon })

  }))
    .then(() => {
      console.log('categorySeeder done!')
      process.exit()
    })
})
const sqlite3 = require('sqlite3')

//pega só a função open de dentro do sqlite
const { open } = require('sqlite')

module.exports = () =>
  open({
    filename: './src/db/rocketq.sqlite',
    driver: sqlite3.Database
  })

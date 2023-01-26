const dbKnex = require('./dbConfig.js')

let emailRegex = '^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$'
let phoneRegex = '^d{0,3}[- ]?[ ]*[(]?d{3}[)]?[- ]?[ ]*d{3}[- ]?[ ]*d{4}$'

const createUserTable = async () => {
  try {
    dbKnex.schema.hasTable('users').then(function (exits) {
      if (!exits) {
        dbKnex.schema
          .createTable('users', (table) => {
            table.increments('id').primary()
            table.string('email')
            table.string('name'),
              table.string('username'),
              table.string('password'),
              table.string('phone'),
              table.string('website'),
              table.timestamp('createdAt').defaultTo(dbKnex.fn.now()),
              table.timestamp('updatedAt').defaultTo(dbKnex.fn.now())
          })
          .then(() => {
            console.log('table created successfully')
          })
          .catch((err) => {
            console.log(err)
            throw err
          })
          .finally(() => {
            // dbKnex.destroy()
          })
      }
    })
  } catch (e) {
    console.log('Error in table creation', err)
  }
}

module.exports = { createUserTable }

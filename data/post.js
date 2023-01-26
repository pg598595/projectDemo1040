const dbKnex = require('./dbConfig.js')

let emailRegex = '^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$'
let phoneRegex = '^d{0,3}[- ]?[ ]*[(]?d{3}[)]?[- ]?[ ]*d{3}[- ]?[ ]*d{4}$'

const createPostTable = async () => {
  try {
    dbKnex.schema.hasTable('posts').then(function (exits) {
      if (!exits) {
        dbKnex.schema
          .createTable('posts', (table) => {
            table.increments('id').primary()
            table.integer('userId').unsigned().notNullable(),
              table.foreign('userId').references('users').inTable('users'),
              table.string('title'),
              table.text('body', ['longtext']),
              table.timestamp('createdAt').defaultTo(dbKnex.fn.now())
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
            dbKnex.destroy()
          })
      }
    })
  } catch (e) {
    console.log('Error in table creation', err)
  }
}

module.exports = { createPostTable }

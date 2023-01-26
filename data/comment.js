const dbKnex = require('./dbConfig.js')

const createCommentTable = async () => {
  try {
    dbKnex.schema.hasTable('comments').then(function (exits) {
      if (!exits) {
        dbKnex.schema
          .createTable('comments', (table) => {
            table.increments('id').primary()
            table.integer('postId').unsigned().notNullable(),
              table.foreign('postId').references('id').inTable('posts')
            table.string('name'),
              table.string('email'),
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

module.exports = { createCommentTable }

const option = {
  client: 'mysql2',
  connection: {
    host: '34.135.217.112',
    user: 'root',
    password: 'Priyanka@123',
    database: 'projectDemo1040'
  },
  useNullAsDefault: true
}

const knex = require('knex')(option)

module.exports = knex

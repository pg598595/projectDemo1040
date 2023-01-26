const bcrypt = require('bcrypt')

function generateHash(password) {
  password = bcrypt.hashSync(password, 10)
  return password
}

async function compareHash(password, passwordFromDb) {
  const match = await bcrypt.compare(password, passwordFromDb)
  return match
}

module.exports = {
  generateHash,
  compareHash
}

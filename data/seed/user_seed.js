const fs = require('fs')
const path = require('path')

const dbKnex = require('../dbConfig.js')
const bcrypt = require('bcrypt')
const hash = require('../../utils/hash.js')

const directory = path.join(__dirname, '../../../Samples')

const usersFilePath = `${directory}/users.json`

const seedUserData = async (data) => {
  try {
    // var data = fs.readFileSync(usersFilePath)
    if (data != null) {
      var insertData = data
      var userData = []
      insertData.password = hash.generateHash(insertData.password)
      userData.push(insertData)

      dbKnex('users')
        .insert(userData)
        .then(() => {
          console.log('User Added Successfully')
        })
        .catch((error) => {
          console.log('Error while adding data', error)
        })
        .finally(() => {
          dbKnex.destroy()
        })
    }
  } catch (err) {
    console.log('error while seeding data', err)
  }
}

const getAllUsersData = async () => {
  var data
  await dbKnex
    .select()
    .table('users')
    .then(async (v) => {
      console.log(v)
      data = v
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  return data
}

const getUserLogin = async (email) => {
  var data
  await dbKnex('users')
    .where({
      email: email
    })
    .select()

    .then(async (v) => {
      console.log(v)
      data = v
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  return data
}

module.exports = { seedUserData, getAllUsersData, getUserLogin }

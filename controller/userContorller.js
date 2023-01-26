const jwt = require('jsonwebtoken')
const {
  getAllUsersData,
  seedUserData,
  getUserLogin
} = require('../data/seed/user_seed.js')
const secretKey = 'CBSC1030Priyanka'
const hash = require('../utils/hash.js')

//To Get all the users

const getUsers = async (req, res) => {
  var data = await getAllUsersData()
  if (data) {
    res.send({ data: data })
    res.status(200)
  } else {
    res.send({ message: 'No data Found' })
    res.status(404)
  }
}

//Add new data to users
const addNewUser = async (req, res) => {
  await seedUserData(req.body)
    .then((value) => {
      res.send({ message: 'Data added successfully' })
      res.status(200)
    })
    .catch((e) => {
      console.log(e)
      res.send({ message: 'No data Found' })
      res.status(404)
    })
}

//User login route and give JWT token

const loginUser = async (req, res) => {
  await getUserLogin(req.body.email)
    .then(async (value) => {
      var data = value
      var isPasswordValid = await hash.compareHash(
        req.body.password,
        data[0].password
      )
      if (isPasswordValid) {
        jwt.sign({ data }, secretKey, { expiresIn: '12h' }, (err, token) => {
          res.status(200).send({ message: 'Success Login', token: token })
        })
      } else if (!isPasswordValid) {
        res.status(403).send({ message: 'Invalid Credentials' })
      } else {
        res.status(404).send({ message: 'User not found' })
      }
    })
    .catch((e) => {
      console.log(e)
      res.send({ message: 'Something went wrong' })
      res.status(404)
    })
}

module.exports = {
  getUsers,
  addNewUser,
  loginUser
}

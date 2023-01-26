const jwt = require('jsonwebtoken')
const {
  getPosts,
  seedPostData,
  getPostData,
  updatePostData
} = require('../data/seed/post_seed.js')
const secretKey = 'CBSC1030Priyanka'

//To Get all the users

const getAllPosts = async (req, res) => {
  var data = await getPosts()
  if (data) {
    res.send({ data: data })
    res.status(200)
  } else {
    res.send({ message: 'No data Found' })
    res.status(404)
  }
}

//Get user data with specific ID with validation for Token

const getPostDataById = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.status(401).send('Invalid Token')
    } else {
      await getPostData(req.params.id)
        .then((value) => {
          var usersDetails = value
          res.status(200).send({
            message: 'Post Details Fetched Successfully',
            data: usersDetails
          })

          res.status(200)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
}

//Add new data to users
const addNewPost = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.status(401).send('Invalid Token')
    } else {
      console.log(authData.data[0].id)
      var reqData = req.body
      reqData.userId = authData.data[0].id
      console.log(reqData)
      await seedPostData(reqData)
        .then((value) => {
          res.send({ message: 'Data added successfully' })
          res.status(200)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
}

//Add new data to users
const updatePost = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.status(401).send('Invalid Token')
    } else {
      console.log(authData.data[0].id)
      var reqData = req.body
      reqData.userId = authData.data[0].id
      console.log(reqData)
      await updatePostData(reqData, req.params.id)
        .then((value) => {
          res.send({ message: 'Data updated successfully' })
          res.status(200)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
}

module.exports = {
  getAllPosts,
  getPostDataById,
  addNewPost,
  updatePost
}

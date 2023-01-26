const jwt = require('jsonwebtoken')
const {
  getAllCommentsForPost,
  seedCommentData,
  updateCommentData,
  deleteCommentData
} = require('../data/seed/comment_seed.js')
const secretKey = 'CBSC1030Priyanka'

//Get user data with specific ID with validation for Token

const getAllComments = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.status(401).send('Invalid Token')
    } else {
      await getAllCommentsForPost(req.params.id)
        .then((value) => {
          var comments = value
          res.status(200).send({
            message: 'Comments Fetched Successfully',
            data: comments
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
const addNewComment = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.status(401).send('Invalid Token')
    } else {
      console.log(authData.data[0].id)
      var reqData = req.body
      reqData.postId = req.params.id
      console.log(reqData)
      await seedCommentData(reqData)
        .then((value) => {
          res.send({ message: 'Comment added successfully' })
          res.status(200)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
}

//Add new data to users
const updateComment = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.status(401).send('Invalid Token')
    } else {
      console.log(authData.data[0].id)
      var reqData = req.body
      reqData.postId = req.params.id
      console.log(reqData)
      await updateCommentData(reqData, req.params.commentId)
        .then((value) => {
          res.send({ message: 'Comment updated successfully' })
          res.status(200)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
}

//Delete comments
const deleteComment = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.status(401).send('Invalid Token')
    } else {
      await deleteCommentData(req.params.commentId)
        .then((value) => {
          res.send({ message: 'Comment deleted successfully' })
          res.status(200)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
}

module.exports = {
  getAllComments,
  addNewComment,
  updateComment,
  deleteComment
}

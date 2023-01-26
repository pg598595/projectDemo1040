const express = require('express')
const postController = require('../controller/postController.js')
const commentController = require('../controller/commentController.js')

const postRouter = express.Router()
const middleware = require('../middleware/middleware.js')

postRouter.use(middleware.verfiyToken)
postRouter.get('/posts', postController.getAllPosts)
postRouter.get('/posts/:id', postController.getPostDataById)
postRouter.get('/posts/:id/comments', commentController.getAllComments)

postRouter.post('/posts', postController.addNewPost)
postRouter.post('/posts/:id/comments', commentController.addNewComment)

postRouter.patch('/posts/:id', postController.updatePost)
postRouter.patch(
  '/posts/:id/comments/:commentId',
  commentController.updateComment
)

postRouter.delete(
  '/posts/:id/comments/:commentId',
  commentController.deleteComment
)

module.exports = postRouter

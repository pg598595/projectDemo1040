const express = require('express')
const userController = require('../controller/userContorller.js')
const userRouter = express.Router()
const middleware = require('../middleware/middleware.js')

userRouter.get('/users', userController.getUsers)
// router.get('/users/:id', middleware.verfiyToken, userController.getUserData)
userRouter.post('/users', middleware.checkRequest, userController.addNewUser)
userRouter.post('/users/login', userController.loginUser)

module.exports = userRouter

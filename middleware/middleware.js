const checkRequest = (req, res, next) => {
  var userData = req.body
  console.log(userData)
  if (userData == null) {
    res
      .send({
        message: 'Please send user data'
      })
      .status(401)
  } else {
    if (
      req.body.email == null ||
      req.body.password == null ||
      req.body.name == null ||
      req.body.username == null ||
      req.body.phone == null
    ) {
      res.send({ messsage: 'Please send proper data' }).status(401)
    } else {
      next()
    }
  }
}

const verfiyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  if (!bearerHeader) res.status(403).send({ message: 'Request Forbidden' })

  const bearer = bearerHeader.split(' ')
  console.log(bearer[1])
  req.token = bearer[1]

  next()
}

module.exports = { checkRequest, verfiyToken }

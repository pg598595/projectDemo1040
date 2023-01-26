const request = require('supertest')
const app = require('../index.js')
let token = ''
var emailId = 'priyanka@gmail.com'
var password = 'Test@1234'

beforeAll(async () => {
  var requestData = {
    email: emailId,
    password: password
  }
  const response = await request(app).post('/users/login').send(requestData)
  token = response.body.token
})

describe('Get All Users API', () => {

  //should be able to retrieve all users data
  it('testing with Token /users', async () => {
    const response = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${token}`)
    //Auth token passing here
    expect(response.status).toBe(200)
  })
})

describe('Get All Post API', () => {
  //should not be able to retrieve all posts data
  it('testing without Token /posts', async () => {
    const response = await request(app).get(`/posts`)
    //Auth token not passing
    expect(response.status).toBe(403)
  })

  //should be able to retrieve all posts data
  it('testing with Token /users', async () => {
    const response = await request(app)
      .get(`/posts`)
      .set('Authorization', `Bearer ${token}`)
    //Auth token passing here
    expect(response.status).toBe(200)
  })
})

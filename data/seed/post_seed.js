const fs = require('fs')
const path = require('path')

const dbKnex = require('../dbConfig.js')

const directory = path.join(__dirname, '../../../Samples')

const usersFilePath = `${directory}/posts.json`

const seedPostData = async (data) => {
  try {
    //Commenting as not using file every time when adding data

    // var data = fs.readFileSync(usersFilePath)
    if (data != null) {
      var insertData = data
      //   var modifyData = insertData.map((user) => ({

      //     userId: user.userId,
      //     title: user.title,
      //     body: user.body,

      //   }))
      dbKnex('posts')
        .insert(insertData)
        .then(() => {
          console.log('Post Added Successfully')
        })
        .catch((error) => {
          console.log('Error while adding data', error)
        })
        .finally(() => {
          //   dbKnex.destroy()
        })
    }
  } catch (err) {
    console.log('error while seeding data', err)
  }
}

const getPosts = async () => {
  var data
  await dbKnex
    .select()
    .table('posts')
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

const getPostData = async (postId) => {
  var data
  await dbKnex('posts')
    .where({
      id: postId
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
const updatePostData = async (data, postId) => {
  try {
    if (data != null) {
      var updateData = data

      dbKnex('posts')
        .update(updateData)
        .where('id', postId)
        .then(() => {
          console.log('Post Updated Successfully')
        })
        .catch((error) => {
          console.log('Error while updating data', error)
        })
        .finally(() => {
          //   dbKnex.destroy()
        })
    }
  } catch (err) {
    console.log('error while seeding data', err)
  }
}
module.exports = { seedPostData, getPosts, getPostData, updatePostData }

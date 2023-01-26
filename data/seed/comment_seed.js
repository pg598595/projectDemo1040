const fs = require('fs')
const path = require('path')

const dbKnex = require('../dbConfig.js')

const directory = path.join(__dirname, '../../../Samples')

const usersFilePath = `${directory}/comments.json`

const seedCommentData = async (data) => {
  try {
    //Commenting as not using file every time when adding data

    // var data = fs.readFileSync(usersFilePath)

    if (data != null) {
      var insertData = data

      //   var modifyData = insertData.map((user) => ({

      //       postId: user.postId,
      //       name:user.name,
      //     email: user.email,
      //     body: user.body,

      //   }))
      //   console.log('data to insert', modifyData)

      dbKnex('comments')
        .insert(insertData)
        .then(() => {
          console.log('Comment Added Successfully')
        })
        .catch((error) => {
          console.log('Error while adding data', error)
        })
        .finally(() => {
          // dbKnex.destroy()
        })
    }
  } catch (err) {
    console.log('error while seeding data', err)
  }
}

const updateCommentData = async (data, commentId) => {
  try {
    if (data != null) {
      var updateData = data

      dbKnex('comments')
        .update(updateData)
        .where('id', commentId)
        .then(() => {
          console.log('Comment Updated Successfully')
        })
        .catch((error) => {
          console.log('Error while updating data', error)
        })
        .finally(() => {
          // dbKnex.destroy()
        })
    }
  } catch (err) {
    console.log('error while updating data', err)
  }
}

const getAllCommentsForPost = async (postId) => {
  var data
  await dbKnex('comments')
    .where({
      postId: postId
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

const deleteCommentData = async (commentId) => {
  var data
  await dbKnex('comments')
    .where({
      id: commentId
    })
    .del()
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

module.exports = {
  seedCommentData,
  getAllCommentsForPost,
  updateCommentData,
  deleteCommentData
}

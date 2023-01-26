const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const app = express();
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const {
  createUserTable
} = require('./data/user.js');
const {
  createPostTable
} = require('./data/post.js');
const {
  createCommentTable
} = require('./data/comment.js');

//initialize knex
app.use(jsonParser);
app.use('', userRoutes);
app.use('', postRoutes);

//Error handling when route not found

createUserTable();
createPostTable();
createCommentTable();

//To Add data from Json File, but commented for now as not to add same data again

// seedData()

app.get('*', function (req, res) {
  res.status(404).send('Sorry! Page Not Found');
});
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('Listening to post 3000 ...');
});
module.exports = app;
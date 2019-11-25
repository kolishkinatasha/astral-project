const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
let { users, posts } = require('./posts');

const app = express();

app.use(bodyParser());
app.use(express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.get('/data', (req, res) => {
  res.send(posts);
});

app.post('/signup', (req, res) => {
  users.push(req.body.param);
  console.log(users);
  res.sendStatus(200);
});

app.post('/login', (req, res) => {
  const { login, password } = req.body.param;
  let authorization = false;
  users.forEach(item => {
    console.log(item);
    if (item.login == login && item.password == password) {
      authorization = true;
    }
  });
  // console.log(authorization);
  authorization ? res.send(true) : res.send(false);
  console.log(login);
});

app.post('/comment', (req, res) => {
  const { id } = req.body.param;
  posts[id].comment.push(req.body.param.userComment);
  res.send(posts);
});

app.post('/like', (req, res) => {
  const { id, user } = req.body.params;

  const likes = posts.map(item => {
    if (item.id === id) {
      if (!item.likedUsers.includes(users)) {
        item.likedUsers.push(user);
      } else {
        item.likedUsers.splice(item.likedUsers.indexOf(user), 1);
      }
    }
    return item;
  });

  res.send(likes);
});

app.post('/delete', (req, res) => {
  posts = req.body;
  res.send(posts);
});

app.listen(3000, () => console.log('port 3000'));

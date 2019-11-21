const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { users, posts } = require('./posts');

const app = express();

app.use(bodyParser());
app.use(express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.get('/data', (req, res) => {
  res.send(posts);
});

//регистрация
app.post('/signup', (req, res) => {
  users.push(req.body.param);
  console.log(users);
  res.sendStatus(200);
});

//авторизация
app.post('/login', (req, res) => {
  const { login, password } = req.body.param;
  // console.log(login,password);
  // res.sendStatus(200);
  let authorization = false;

  users.forEach(item => {
    console.log(item);
    if (item.login == login && item.password == password) {
      authorization = true;
    }
  });
  console.log(authorization);

  authorization ? res.send(true) : res.send(false);
});

//отправка комментария
app.post('/comment', (req, res) => {
  const { id } = req.body.param;
  // console.log(author, comment);
  posts[id].comment.push(req.body.param.userComment);
  res.send(posts);
});

app.listen(3000, () => console.log('port 3000'));

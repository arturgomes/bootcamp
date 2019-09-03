const express = require('express');


const server = express();

const users = ['Artur', 'Sofia', 'LidianeAA'];
server.use(express.json());

//middleware global

server.use((req, res, next) => {
  console.time('Request');
  console.log(`metodo: ${req.method}, URL: ${req.url}`);
  next();
  console.timeEnd('Request');
});


// middleware local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "user not found on request body" });
  }
  return next();
}
function checkIdReturnUser(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "user out of index of users" });

  }
  req.user = user;
  return next();
}

// CRUD
//list all users
server.get('/users', checkIdReturnUser, (req, res) => {
  return res.json(users)
})

//list user id
server.get('/users/:index', checkIdReturnUser, (req, res) => {
  // Query params = ?name=artur
  // const nome = req.query.nome;
  // Route params = /users/1
  // const { index } = req.params; //ou essa

  // return res.json(users[index]);
  return res.json(req.user);
});
//add user
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

//edit user

server.put('/users/:index', checkUserExists, checkIdReturnUser, (req, res) => {
  const { index } = req.params; //ou essa
  const { name } = req.body;
  users[index] = name;

  return res.json(users);
})

// delete user
server.post('/users/:index', checkIdReturnUser, (req, res) => {
  const { index } = req.params; //ou essa
  users.splice(index, 1);
  return res.json(users);
})

server.listen(3000);

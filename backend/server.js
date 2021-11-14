const express = require('express');

const app = express();

const PORT = 8000;

// Import Models

const { Connect } = require("./database/db_config.js");
const { UserModel }  = require("./database/db_model.js");


app.use(express.json());

//Routes 

app.get('/api/v1/posts', (req, res) => {
  res.status(201).send('Hi from Posts!!')
})

app.get('/api/v1/posts/:id', (req, res) => {
  res.status(201).send('Hi from Post!!')
})

app.post('/api/v1/login', (req,res) => {
  const { username, email, avatar, about, cover, posts, likes, comment} = req.body;
  console.log(username)
  res.status(201).send('Hi from Login')
})

app.post('/api/v1/signup', (req,res) => {
  res.status(201).send('Hi from Signup')
})

app.post('/api/v1/posts', (req, res) => {
  res.status(201).send('Hi from Post Request!!')
})

app.patch('/api/v1/posts/:id', (req, res) => {
  res.status(201).send('Hi from Patch Post!!')
})

app.delete('/api/v1/posts/:id', (req, res) => {
  res.status(201).send('Hi from Delete Post!!')
})






Connect().then(res => {
  console.log('success');
  app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`); 
})
}).catch(e =>{
  console.log(e.message);
  process.exit(1);
});




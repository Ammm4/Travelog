
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')

const userRouter = require('./Routers/userRouter');
const postRouter = require('./Routers/postRouter')

app.use(cookieParser());
app.use(express.json());

//=============================== Routes =====================================//
app.use('/api/v1', userRouter)
app.use('/api/v1', postRouter)




module.exports = app;

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const userRouter = require('./Routers/userRouter');
const postRouter = require('./Routers/postRouter');
const likeRouter = require('./Routers/likeRouter');
const commentRouter = require('./Routers/commentRouter');

const errorMiddleware = require('./middleware/error');

app.use(cookieParser());
app.use(express.json());

//=============================== Routes =====================================//

app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);
app.use('/api/v1/posts', likeRouter);
app.use('/api/v1/posts', commentRouter);
app.use(errorMiddleware);


module.exports = app;
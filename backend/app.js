const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./Routers/userRouter');
const postRouter = require('./Routers/postRouter');
const forumRouter = require('./Routers/forumRouter');
const likeRouter = require('./Routers/likeRouter');
const replyRouter = require('./Routers/replyRouter');
const commentRouter = require('./Routers/commentRouter');

const errorMiddleware = require('./middleware/error');

app.use(cookieParser());
app.use(express.json( { limit: '50mb' } ));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

//=============================== Routes =====================================//
app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);
app.use('/api/v1', forumRouter);
app.use('/api/v1', likeRouter);
app.use('/api/v1', replyRouter);
app.use('/api/v1', commentRouter)
app.use(errorMiddleware);

module.exports = app;
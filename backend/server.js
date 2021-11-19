require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')

const { Connect } = require("./database/db_config.js");
const userRouter = require('./Routers/userRouter');
const postRouter = require('./Routers/postRouter')

app.use(cookieParser());
app.use(express.json());

//=============================== Routes =====================================//
app.use('/api/v1', userRouter)
app.use('/api/v1', postRouter)


//============================ DATABASE CONNECTION ==========================//

Connect().then(res => {
  console.log('success');
  app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`); 
})
}).catch(e =>{
  console.log(e.message);
  process.exit(1);
});



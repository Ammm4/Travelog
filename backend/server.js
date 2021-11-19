const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const { Connect } = require("./database/db_config.js");

Connect().then(res => {
  console.log('success');
  app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`); 
})
}).catch(e =>{
  console.log(e.message);
  process.exit(1);
});



const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`)
  console.log("Server shutting down to Unhandled Exception");
  process.exit(1)
})

const { Connect_To_MongoDB_Atlas } = require("./database/db_config.js");

Connect_To_MongoDB_Atlas().then(res => {
  console.log('success');
  app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`); 
})
}).catch(e =>{ 
  console.log(`Error: ${e.message}`)
  console.log("Server shutting down to DATABASE connection problem");
  process.exit(1);
});



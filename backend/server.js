const app = require('./app');

require('dotenv').config();
const cloudinary = require('cloudinary');

const PORT = process.env.PORT || 8000;

process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`)
  console.log("Server shutting down to Unhandled Exception");
  process.exit(1)
})

const { Connect_To_MongoDB_Atlas } = require("./database/db_config.js");

Connect_To_MongoDB_Atlas().then(res => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  })
  console.log('success');
  app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`); 
})
}).catch(e =>{ 
  console.log(`Error: ${e.message}`)
  console.log("Server shutting down, DATABASE connection problem");
  process.exit(1);
});



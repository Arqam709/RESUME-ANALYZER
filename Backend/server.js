require("dotenv").config(); //read the env file and set the environment variables
const app = require("./src/app");
const connectTodb = require("./src/config/database");



connectTodb();


  

  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });


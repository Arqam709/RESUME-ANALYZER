require("dotenv").config(); //read the env file and set the environment variables
const app = require("./src/app");
const connectTodb = require("./src/config/database");



connectTodb();


  

 const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

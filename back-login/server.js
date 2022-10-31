const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const DATABASE_ENDPOINT = process.env.DATABASE_LOCAL_ENDPOINT;

mongoose
  .connect(DATABASE_ENDPOINT)
  .then((connection) => {
    console.log("Successfully connect to MongoDB")})
  .catch((error) => console.log(error));

const port = process.env.PORT;
app.listen(port, () => console.log(`Running on port*: ${port}`));
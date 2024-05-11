require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then((db) => console.log("Connected with MongoDB."))
  .catch((err) =>
    console.log(`Unable to connect with MongoDB: ${err.message}`)
  );

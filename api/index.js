require("./db/connection");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const users = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.status(200).send("API is working..."));
app.use("/users", users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

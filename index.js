const express = require("express");
const app = express();
const route = require("./Routes");
require("dotenv").config();
const port = process.env.PORT;

app.use(express.json())

app.use("/", route);

app.listen(port, () => {
  console.log("server is running .....");
})
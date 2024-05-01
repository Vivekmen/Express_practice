const express = require("express");
const app = express();
const route = require("./routes_admin_user");
require("dotenv").config();
const config=require("./config");


app.use(express.json())

app.use("/", route);

app.listen(config.PORT, () => {
  console.log("server is running .....");
})
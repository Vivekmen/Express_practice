const express = require("express");
const app = express();
const route = require("./routes_admin_user");
require("dotenv").config();
const config = require("./config");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("dev", { stream: accessLogStream }));

app.use(express.json());

app.use("/", route);

app.listen(config.PORT, () => {
  console.log("server is running .....");
});

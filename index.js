const express = require("express");
const app = express();
const route = require("./routes_admin_user");
require("dotenv").config();
const config = require("./config");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const cors =require("cors")
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
const corsoption={
  origin:"http://127.0.0.1:5501",
  // origin:"*"
}
app.use(cors(corsoption))
app.use(express.json());

app.use("/", route);

app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}.....`);
});

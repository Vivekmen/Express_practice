const fs = require("fs");
exports.readuserdata = (req, res, next) => {
  const readuserdata = fs.readFileSync("./user.json", "utf8");
  req.userdata = JSON.parse(readuserdata);
  next();
};

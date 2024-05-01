const fs = require("fs");
const crypto = require("crypto");

function writefile(data) {
  let userdata = JSON.stringify(data);
  fs.writeFileSync("./user.json", userdata);
}

function readfile() {
  const datauser = fs.readFileSync("./user.json");
  const userdata = JSON.parse(datauser);
  return userdata;
}

function passwordencrypt(password) {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
}

exports.creatuser = (req, res) => {
  const { username, email, password } = req.body;
  const user = req.userdata;
  const encryptpass = passwordencrypt(password);
  const findelement = user.some((e) => e.username === username);
  if (findelement)
    return res.status(409).jsonp({ message: "User Already Exist!" });
  user.push({ username, email, password: encryptpass });
  writefile(user);
  return res.status(200).send({ message: "User created Sucessfully" });
};

exports.getalluser = (req, res) => {
  const getdata = readfile();
  return res.status(200).jsonp(getdata);
};

exports.updateuser = (req, res) => {
  const { username, newusername } = req.body;
  let user = readfile();
  const findidx = user.findIndex((e) => e.username === username);
  if (findidx == -1)
    return res.status(404).send({ Message: "user is not exists!" });
  user[findidx].username = newusername;
  writefile(user);
  return res.status(200).send({ Message: "user data updated succesfully" });
};

exports.deleteuser = (req, res) => {
  const { username } = req.body;
  let userdata = readfile();
  const findidx = userdata.findIndex((e) => e.username === username);
  if (findidx == -1)
    return res.status(409).jsonp({ Message: "User Is Not Exist!" });
  userdata.splice(findidx, 1);
  writefile(userdata);
  return res.status(200).jsonp({ Message: "User deleted succesfully!" });
};

exports.finduser = (req, res) => {
  const searchdata = [];
  const { id } = req.params;
  let userdata = readfile();
  for (const searcharray of userdata) {
    const reg = new RegExp(id + "\\w");
    if (searcharray.username.match(reg)) {
      searchdata.push(searcharray);
    }
  }

  if (searchdata.length == 0)
    return res.status(409).send({ Message: "User Is Not Exist!" });
  return res.status(200).jsonp(searchdata);
};
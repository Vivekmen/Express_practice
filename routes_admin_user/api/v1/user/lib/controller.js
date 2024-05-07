const fs = require("fs");
const bcrypt = require("bcrypt");
const { messages, status } = require("../../../../../message/index");
const jwt = require("jsonwebtoken");
const config = require("../../../../../config");
// const userdatafile=require("../../../../../user.json")

function writefile(data) {
  let userdata = JSON.stringify(data);
  fs.writeFile("./user.json", userdata, (err) => {
    if (err) {
      return res.status(500).json({ Message: "Internal server error" });
    }
  });
}

function readfile(callback) {
  fs.readFile("./user.json", "utf8", (err, data) => {
    if (err) return callback(err);
    const userdata = JSON.parse(data);
    callback(err, userdata);
  });
}

exports.creatuser = async (req, res) => {
  readfile(async (err, user) => {
    try {
      const { username, email, password, role } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const findusername = user.some((e) => e.username === username);
      const findemail = user.some((e) => e.email === email);

      if (findusername) return res.status(409).jsonp(messages.userExists);
      if (findemail) return res.status(409).jsonp(messages.userExists);
      user.push({ username, email, password: hash, role });
      writefile(user);
      return res.status(200).send(messages.registerSucess);
    } catch (error) {
      return res.status(500).send(messages.serverError);
    }
  });
};

exports.getalluser = (req, res) => {
  try {
    readfile((err, user) => {
      return res.status(200).jsonp(user);
    });
  } catch (error) {
    return res.status(500).send(messages.serverError);
  }
};

exports.updateuser = (req, res) => {
  try {
    readfile((err, user) => {
      const { username, newusername } = req.body;
      const findidx = user.findIndex((e) => e.username === username);
      if (findidx == -1) return res.status(404).send(messages.userNotFound);
      user[findidx].username = newusername;
      writefile(user);
      return res.status(200).send(messages.userNameUpdated);
    });
  } catch (err) {
    if(err) return res.status(500).send(messages.serverError);
  }
};

exports.deleteuser = (req, res) => {
  try {
    readfile((err, user) => {
      const { username } = req.body;

      const findidx = user.findIndex((e) => e.username === username);
      if (findidx == -1) return res.status(409).jsonp(messages.userNotFound);
      user.splice(findidx, 1);
      writefile(user);
      return res.status(200).jsonp(messages.userProfiledelete);
    });
  } catch (error) {
    return res.status(500).send(messages.serverError);
  }
};

exports.finduser = (req, res) => {
  try {
    const searchdata = [];
    const { id } = req.params;
    readfile((err, user) => {
      for (const searcharray of user) {
        const reg = new RegExp(id + "\\w");
        if (searcharray.username.match(reg)) {
          searchdata.push(searcharray);
        }
      }
      if (searchdata.length == 0)
        return res.status(409).send(messages.userExists);
      return res.status(200).jsonp(searchdata);
    });
  } catch (error) {
    return res.status(500).send(messages.serverError);
  }
};

exports.loginuser = async (req, res) => {
  readfile(async (err, user) => {
    const { username, password, role } = req.body;
    const findusername = user.find((e) => e.username == username);
    if (!findusername) return res.status(200).json(messages.userNotFound);
    const match = await bcrypt.compare(password, findusername.password);
    if (!match) return res.status(200).json(messages.passwordNotValid);

    const jwtoken = await jwt.sign(
      {
        username: username,
        role: findusername.role,
      },
      config.SECERETKEY,
      {
        expiresIn: "4d",
      }
    );
    res.setHeader("Authorization", jwtoken);
    return res.status(200).json(messages.loginSuccess);
  });
};

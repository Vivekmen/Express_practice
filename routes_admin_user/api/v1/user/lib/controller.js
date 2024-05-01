const fs = require("fs");
const crypto = require("crypto");
const bcrypt=require("bcrypt");
const {messages,status}=require("../../../../../message/index")

function writefile(data) {
  let userdata = JSON.stringify(data);
  fs.writeFileSync("./user.json", userdata);
}

function readfile() {
  const datauser = fs.readFileSync("./user.json");
  const userdata = JSON.parse(datauser);
  return userdata;
}


exports.creatuser = async(req, res) => {
  const { username, email, password } = req.body;
  const user = req.userdata;
  const saltRounds = 10;
  const myPassword =password
  const salt=await bcrypt.genSalt(saltRounds);
  const hash=await bcrypt.hash(myPassword,salt)
  
  const findusername = user.some((e) => e.username === username);
  const findemail = user.some((e) => e.email === email);

  if (findusername)
    return res.status(409).jsonp(messages.userExists);
    if (findemail)
    return res.status(409).jsonp(messages.userExists);
  user.push({ username, email, password: hash });
  writefile(user);
  return res.status(200).send(messages.registerSucess);
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
    return res.status(404).send(messages.userExists);
  user[findidx].username = newusername;
  writefile(user);
  return res.status(200).send(messages.userNameUpdated);
};

exports.deleteuser = (req, res) => {
  const { username } = req.body;
  let userdata = readfile();
  const findidx = userdata.findIndex((e) => e.username === username);
  if (findidx == -1)
    return res.status(409).jsonp(messages.userExists);
  userdata.splice(findidx, 1);
  writefile(userdata);
  return res.status(200).jsonp(messages.userProfiledelete);
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
    return res.status(409).send(messages.userExists);
  return res.status(200).jsonp(searchdata);
};

exports.loginuser=async(req,res)=>{
try {
  const {username ,password}=req.body;
  let userdata=req.userdata;
  const findusername=userdata.find((e)=>e.username==username);
  if(!findusername) return  res.status(200).json(messages.userExists);
  const match = await bcrypt.compare(password, findusername.password);
  if(!match) return  res.status(200).json(messages.passwordNotValid);
    return res.status(200).json(messages.loginSuccess);
  
} catch (error) {
  res.status(500).send({Message:"server error"});
}
}
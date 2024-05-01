const routadminv1 = require("express").Router();
const usercontroller = require("./lib/controller");
const uservalidatore = require("./lib/validatore");
const middeleweare=require("./lib/middleweare")

routadminv1.get("/admin",middeleweare.readuserdata,usercontroller.getdata);
module.exports = routadminv1   
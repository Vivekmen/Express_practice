const routv1 = require("express").Router();
const usercontroller = require("./lib/controller");
const uservalidatore = require("./lib/validator");
const middeleweare=require("./lib/middleweare")

routv1.post("/user",uservalidatore.isvalidate,middeleweare.readdata,usercontroller.creatuser);
routv1.get("/user",middeleweare.readdata,usercontroller.getalluser);
routv1.patch("/user",middeleweare.readdata,usercontroller.updateuser);
routv1.delete("/user",middeleweare.readdata,usercontroller.deleteuser);
routv1.get("/user/:id",middeleweare.readdata,usercontroller.finduser);
routv1.post("/user/login",middeleweare.readdata,usercontroller.loginuser)



module.exports = routv1
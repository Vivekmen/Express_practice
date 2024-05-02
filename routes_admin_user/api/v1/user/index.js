const routv1 = require("express").Router({caseSensitive : false});
const usercontroller = require("./lib/controller");
const uservalidatore = require("./lib/validator");
const middeleweare=require("./lib/middleweare")

routv1.use(middeleweare.readdata)
routv1.post("/user",uservalidatore.isvalidate,usercontroller.creatuser);
routv1.get("/user",usercontroller.getalluser);
routv1.patch("/user",usercontroller.updateuser);
routv1.delete("/user",usercontroller.deleteuser);
routv1.get("/user/:id",usercontroller.finduser);
routv1.post("/user/login",usercontroller.loginuser)



module.exports = routv1
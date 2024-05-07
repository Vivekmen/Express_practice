const routv1 = require("express").Router({caseSensitive : false});
const usercontroller = require("./lib/controller");
const uservalidatore = require("./lib/validator");
const middeleweare=require("./lib/middleweare")
const authmiddle=require("../../../../helper/user.auth")

// routv1.use(middeleweare.readdata)
routv1.get("/user",(req,res)=>{
    res.sendFile(__dirname+'/static/login.html')
})
routv1.get("/user",authmiddle.authmiddleweare,usercontroller.getalluser);
routv1.post("/user/registration",uservalidatore.usercreatvalidation,usercontroller.creatuser);
routv1.patch("/user",uservalidatore.userupdatevalidation,usercontroller.updateuser);
routv1.delete("/user",authmiddle.authmiddleweare,usercontroller.deleteuser);
routv1.get("/user/:id",usercontroller.finduser);
routv1.post("/user/login",usercontroller.loginuser)



module.exports = routv1
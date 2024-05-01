const routv1 = require("express").Router();
const usercontroller = require("./controller/controller");
const uservalidatore = require("./validatore/validator");
const middeleweare=require("./midleweare/middleweare")

routv1.post("/user",uservalidatore.isvalidate,middeleweare.readdata,usercontroller.creatuser);
routv1.get("/user",middeleweare.readdata,usercontroller.getalluser);
routv1.patch("/user",middeleweare.readdata,usercontroller.updateuser);
routv1.delete("/user",middeleweare.readdata,usercontroller.deleteuser);
routv1.get("/user/:id",middeleweare.readdata,usercontroller.finduser);

routv1.all('*',function (req,res){
    return res.status(404).json({message:" Not Found"});
})
module.exports = routv1
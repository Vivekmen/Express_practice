const routv1 = require("express").Router();
const usercontroller = require("./controller/controller");
const uservalidatore = require("./validatore/validator");
const middeleweare=require("./midleweare/middleweare")

routv1.post("/user",uservalidatore.isvalidate,middeleweare.readdata,usercontroller.creatuser);
routv1.get("/user",usercontroller.getalluser);
routv1.patch("/user",usercontroller.updateuser);
routv1.delete("/user",usercontroller.deleteuser);
routv1.get("/user/:id",usercontroller.finduser);

routv1.all('*',function (req,res){
    return res.status(404).json({message:" Not Found"});
})
module.exports = routv1
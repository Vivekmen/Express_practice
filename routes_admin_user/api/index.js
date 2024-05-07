const users= require("express").Router();
const apiv1rout=require("./v1/user/index");
const apiadminrout=require("./v1/admin/index")

users.use("/v1/home",(req,res)=>{
    res.sendFile(__dirname+'/v1/user/static/index.html')
})
users.use("/v1",apiv1rout);
users.use("/v1",apiadminrout)


module.exports = users
const users= require("express").Router();
const apiv1rout=require("./v1/index")

users.use("/v1",apiv1rout);

users.all('*',function (req,res){
    return res.status(404).json({message:" hiii Not Found"});
})
module.exports = users
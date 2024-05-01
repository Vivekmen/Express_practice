const rout = require("express").Router();
const apirout=require('./api/index')


rout.use('/api',apirout)

rout.all('*',function (req,res){
    return res.status(404).json({message:"Not Found"});
})
// ghp_r6SZaPtOyrlE0CtZTqyH7Qze7ORSr83H5wG
module.exports = rout
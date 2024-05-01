const rout = require("express").Router();
const apirout=require('./api/index')
const {messages,status}=require('../message/index')


rout.use('/api',apirout)

rout.all('*',function (req,res){
    return res.status(status.statusNotFound).json(messages.routeNotFound);
})
// ghp_r6SZaPtOyrlE0CtZTqyH7Qze7ORSr83H5wG
module.exports = rout
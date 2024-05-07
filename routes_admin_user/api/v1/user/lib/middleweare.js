const fs=require("fs")
exports.rendering=(req,res,next)=>{
      res.sendFile(__dirname+"/static/login.html");
      next();
}
exports.readdata=(req,res,next)=>{
  
      const readdata=fs.readFileSync('./user.json',"utf8");
      req.userdata=JSON.parse(readdata);
      next();
}

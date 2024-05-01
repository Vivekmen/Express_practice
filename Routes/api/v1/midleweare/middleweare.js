const fs=require("fs")
exports.readdata=(req,res,next)=>{
  
      const readdata=fs.readFileSync('./user.json',"utf8");
      req.userdata=JSON.parse(readdata);
      next();
}

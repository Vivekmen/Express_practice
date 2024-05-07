const {messages,status}=require("../../../../../message/index")
exports.usercreatvalidation= (req, res,next) => {
     const {username,email,password,role}=req.body;
      
      const emailformat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const passwordformat =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
      if(!username)  return res.status(409).json(messages.userreq)
      if(!email)  return res.status(409).json(messages.emailReq)
      if(!password)  return res.status(409).json(messages.passReq)
      if(!role)  return res.status(409).json(messages.role)
      if(!email.match(emailformat)) return res.status(409).json(messages.emailMatch)
      if(!password.match(passwordformat)) return res.status(409).json(messages.passMatch)
      
      next();
  }; 

exports.userupdatevalidation= (req, res,next) => {
    const {username, newusername}=req.body;

     if(!username)  return res.status(409).json(messages.userreq)
     if(!newusername)  return res.status(409).json(messages.userreq)
     
     next();
 }; 
 
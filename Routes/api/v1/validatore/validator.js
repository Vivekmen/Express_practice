exports.isvalidate= (req, res,next) => {
     const {username,email,password}=req.body;

      const emailformat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const passwordformat =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
      if(!username)  return res.status(409).jsonp({message:"Please Enter Username"})
      if(!email)  return res.status(409).jsonp({message:"Please Enter email"})
      if(!password)  return res.status(409).jsonp({message:"Please Enter password"})
      if(!email.match(emailformat)) return res.status(409).jsonp({message:"Please Enter valid format of Email"})
      if(!password.match(passwordformat)) return res.status(409).jsonp({message:"Please Enter valid format of password"})
    
      next();
  }; 
  
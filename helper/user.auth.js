const jwt = require("jsonwebtoken");
const config=require("../config")
exports.authmiddleweare = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      Message: "Unauthorized! No Token recieved ",
    });
  }  
  try {
    const authtoken = jwt.verify(token, config.SECERETKEY);
    
    if (authtoken.role !== "admin") {
      return res.status(401).json({ Message: "Unauthorized this servise for user" });
    }
    return next();
    
  } catch (error) {
    return res.status(500).json({Message:"Internal Server Error"})
  }
};

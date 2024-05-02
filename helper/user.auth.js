const jwt = require("jsonwebtoken");

exports.authmiddleweare = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      Message: "Token is Invalid!",
    });
  }
  const auth = jwt.verify(token, process.env.SECERETKEY);
  
  if (auth.role !== "admin") {
    return res.status(401).json({ Message: "Unauthorized this servise for user" });
  }
  return next();
};

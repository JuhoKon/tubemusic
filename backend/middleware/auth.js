const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWTSECRET;

function auth(req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //checking for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }
  try {
    // verifying token
    const decoded = jwt.verify(token, jwtSecret);
    // Add user from payload
    req.user = decoded;
    next(); //call next piece of middleware
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}

module.exports = auth;
//This middleware is called from the routes

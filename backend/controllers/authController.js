var User = require("../models/user.model");
var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWTSECRET;

exports.auth = function(req, res, next) {
  const { email, password } = req.body;

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    //password validation
    bcrypt.compare(password, user.password).then(isCorrect => {
      if (!isCorrect)
        return res.status(400).json({ msg: "Invalid credentials" });
      //signing jwt
      jwt.sign(
        { id: user.id },
        jwtSecret,
        //get secret from config-file
        { expiresIn: "1h" }, //set to expire in hour
        (err, token) => {
          if (err) throw err;
          res.json({
            //respond with token and and user info
            token,
            user: {
              _id: user.id,
              name: user.name,
              email: user.email,
              age: user.age
            }
          });
        }
      );
    });
  });
};

exports.findUser = function(req, res, next) {
  User.findById(req.user.id)
    .select("-password") //return everything but password
    .then(user => res.json(user));
};

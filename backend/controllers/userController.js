const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWTSECRET;

exports.index = function(req, res, next) {
  User.find()
    .select("name")
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
};
// Handle create on POST.
exports.create = function(req, res, next) {
  var resSent = false; //logic to prevent sending headers twice
  const email = req.body.email;
  const name = req.body.name;
  //validation is done in middleware, but double checking here
  //(uservalidator.js)
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ err: "Please enter all fields" });
  }
  //Check if there's an entry with the email
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        if (!resSent) {
          //Some logic so we don't set headers after they are sent to client
          //in case email and username are both taken.
          resSent = true;
          return res.status(400).json({
            err: "The email already exists. Please use a different email"
          });
        }
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
  //Check if there's an entry with the username
  User.findOne({ name: name })
    .then(user => {
      if (user) {
        if (!resSent) {
          //Some logic so we don't set headers after they are sent to client
          //in case email and username are both taken.
          resSent = true;
          return res.status(400).json({
            err: "The username already exists. Please use a different username"
          });
        }
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
  //Actual functionality, checks if theres a match either in email or name and creates user if not
  User.findOne({ $or: [{ email: email }, { name: name }] })
    .then(user => {
      if (user) {
      } else {
        var user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          age: req.body.age
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash; //save hashed password to DB
            user.save().then(user => {
              jwt.sign(
                //make token for the user
                { id: user.id },
                jwtSecret, //get secret from config file
                { expiresIn: "1h" }, //set to expire in hour
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    //return made token with the userinfo
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
        });
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
};

exports.addPlaylist = function(req, res, next) {
  if (!req.body.playlistId) {
    return res.status(400).json({
      error: "No playlistid provided."
    });
  }
  User.findById(req.user.id)
    .then(user => {
      //console.log(user);
      user.playlists.push(req.body.playlistId);
      user
        .save() //attempt to save the user
        .then(() => res.json(user.playlists))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
};

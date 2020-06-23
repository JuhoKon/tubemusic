const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWTSECRET;

exports.index = function (req, res, next) {
  if (req.user.role !== "Admin") {
    return res
      .status(401)
      .json({ msg: "Authorization denied. Insufficient role" });
  }
  User.find()
    .select("name")
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};
// Handle create on POST.
exports.create = function (req, res, next) {
  var resSent = false; //logic to prevent sending headers twice
  const email = req.body.email;
  const name = req.body.name;
  //validation is done in middleware, but double checking here
  //(uservalidator.js)
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  //Check if there's an entry with the email
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (!resSent) {
          //Some logic so we don't set headers after they are sent to client
          //in case email and username are both taken.
          resSent = true;
          return res.status(400).json({
            error: "The email already exists. Please use a different email",
          });
        }
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
  //Check if there's an entry with the username
  User.findOne({ name: name })
    .then((user) => {
      if (user) {
        if (!resSent) {
          //Some logic so we don't set headers after they are sent to client
          //in case email and username are both taken.
          resSent = true;
          return res.status(400).json({
            error:
              "The username already exists. Please use a different username",
          });
        }
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
  //Actual functionality, checks if theres a match either in email or name and creates user if not
  User.findOne({ $or: [{ email: email }, { name: name }] })
    .then((user) => {
      if (user) {
      } else {
        var user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          age: req.body.age,
          role: req.body.role,
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash; //save hashed password to DB
            user.save().then((user) => {
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
                      age: user.age,
                      role: user.role,
                    },
                  });
                }
              );
            });
          });
        });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.addPlaylist = function (req, res, next) {
  if (!req.body.playlistId) {
    return res.status(400).json({
      error: "No playlistid provided.",
    });
  }
  if (!req.body.playlistName) {
    return res.status(400).json({
      error: "No playlist name provided.",
    });
  }
  User.findById(req.user.id)
    .then((user) => {
      //console.log(user);
      user.playlists.unshift({
        _id: req.body.playlistId,
        name: req.body.playlistName,
        private: req.body.private,
        owner: req.body.owner,
        createdAt: req.body.createdAt,
      });
      user
        .save() //attempt to save the user
        .then(() => res.json(user.playlists))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.removePlaylist = function (req, res, next) {
  /* User.findById(req.user.id).then(user => {
    user.playlists.pull({ _id: "uniiekki" }).exec();
    user
      .save() //attempt to save the user
      .then(() => res.json(user.playlists))
      .catch(err => res.status(400).json("Error: " + err));
  });*/
  User.updateMany(
    { _id: req.user.id },
    { $pull: { playlists: { _id: req.params.id } } },
    function (err, data) {
      res.json(data);
    }
  );
};
exports.editPlaylist = function (req, res, next) {
  //console.log(req.body.playlistName);
  if (!req.body.playlistName) {
    return res.status(400).json({
      error: "No playlist name provided.",
    });
  }
  User.findById(req.user.id).then((user) => {
    for (let i = 0; i < user.playlists.length; i++) {
      if (user.playlists[i]._id === req.params.id) {
        user.playlists[i].name = req.body.playlistName;
        user.playlists[i].private = req.body.private;
      }
    }
    user.markModified("playlists"); //very important.....
    user.save().then(res.json({ status: "OK" }));
  });
};

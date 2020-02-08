var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var {
  userValidationRules,
  uservalidate
} = require("../middleware/uservalidator.js");
var auth = require("../middleware/auth");

router.get("/", userController.index);

router.post(
  "/create",
  userValidationRules(),
  uservalidate,
  userController.create
);

router.put("/addPlaylist", auth, userController.addPlaylist);
module.exports = router;

var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var {
  userValidationRules,
  uservalidate
} = require("../middleware/uservalidator.js");
var auth = require("../middleware/auth");

router.get("/", auth, userController.index); //ADMIN
//TODO: ADD DELETE USER
router.post(
  "/create",
  userValidationRules(),
  uservalidate,
  userController.create
);

router.put("/addPlaylist", auth, userController.addPlaylist);
router.delete("/deletePlaylist:id", auth, userController.removePlaylist);
router.put("/editPlaylist:id", auth, userController.editPlaylist);
module.exports = router;

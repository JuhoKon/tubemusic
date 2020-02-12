var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
var authController = require("../controllers/authController");

router.post("/", authController.auth);

router.get("/user", auth, authController.findUser); //returns ALL info about user made
router.get("/renew", auth, authController.renew);
module.exports = router;

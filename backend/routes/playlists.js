var express = require("express");
var router = express.Router();
var playlist_controller = require("../controllers/playlistController");

var auth = require("../middleware/auth");
/* GET users listing. */
router.get("/", auth, playlist_controller.index); //ADMIN
router.delete("/delete/:id", auth, playlist_controller.deletebyID); //ADMIN

router.post("/create", auth, playlist_controller.create);

router.get("/find/:id", auth, playlist_controller.findByID);
router.put("/update/:id", auth, playlist_controller.updatebyID);

module.exports = router;

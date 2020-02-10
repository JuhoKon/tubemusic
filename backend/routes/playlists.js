var express = require("express");
var router = express.Router();
var playlist_controller = require("../controllers/playlistController");
/* GET users listing. */
router.get("/", playlist_controller.index);
router.post("/create", playlist_controller.create);

router.get("/find/:id", playlist_controller.findByID);
router.put("/update/:id", playlist_controller.updatebyID);
router.delete("/delete/:id", playlist_controller.deletebyID);
module.exports = router;

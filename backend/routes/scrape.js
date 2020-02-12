var express = require("express");
var router = express.Router();
var scrape_controller = require("../controllers/scrapeController");
var auth = require("../middleware/auth");
/* GET users listing. */

router.post("/scrape", auth, scrape_controller.scrape);
router.get("/search", auth, scrape_controller.searchScrape);
module.exports = router;

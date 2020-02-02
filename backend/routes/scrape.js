var express = require("express");
var router = express.Router();
var scrape_controller = require("../controllers/scrapeController");
/* GET users listing. */

router.post("/scrape", scrape_controller.scrape);
router.get("/search", scrape_controller.searchScrape);
module.exports = router;

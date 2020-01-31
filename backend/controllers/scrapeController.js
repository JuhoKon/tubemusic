const request = require("request-promise");
const cheerio = require("cheerio");

exports.scrape = async function(req, res, next) {
  //console.log(req.body.term);
  let url = encodeURI(req.body.term);
  let response = await request(url);
  let $ = cheerio.load(response);
  let videoTime = null;
  if (
    typeof $('[class="yt-lockup-title "]')[0] !== "undefined"
  ) {
    let data = $('[class="yt-lockup-title "]')[0].children[0].attribs;
    if (typeof 
    $('[class="video-time"]')[0] !== "undefined") {
      videoTime = $('[class="video-time"]')[0].children[0].data;
    }
    
    //console.log(data.href, data.title, videoTime);
    res.json({
      videoId: data.href.split("v=")[1],
      title: data.title,
      duration: videoTime,
      scraped: true
    });
  } else {
    res.status(404).json({ error: "Not found" });
  }
};

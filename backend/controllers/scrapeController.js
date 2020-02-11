const request = require("request-promise");
const cheerio = require("cheerio");

const handleScrape = async (term, counter) => {
  try {
    let url = encodeURI(term);
    let response = await request(url).catch(async e => {
      console.log(e);
      await timeout(2500);
      return handleScrape(term, counter);
    }); //mby add catch here? .catch(err => console.log(err));

    let $ = await cheerio.load(response);
    let videoTime = null;
    if (typeof $('[class="yt-lockup-title "]')[0] !== "undefined") {
      let data = $('[class="yt-lockup-title "]')[0].children[0].attribs;
      if (typeof $('[class="video-time"]')[0] !== "undefined") {
        videoTime = $('[class="video-time"]')[0].children[0].data;
      }
      //console.log(data.href, data.title, videoTime);
      //add retry when connection is lost

      return {
        videoId: data.href.split("v=")[1],
        title: data.title,
        duration: videoTime,
        scraped: true,
        uniqueId: Math.random(),
        date: Date.now()
      };
    } else {
      if (counter < 5) {
        //try again
        console.log("Trying again..");
        await timeout(100);
        return handleScrape(term, counter++);
      } else {
        return null;
      }
    }
  } catch (err) {
    throw err;
  }
};
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.searchScrape = async function(req, res, next) {
  //console.log(req.query.term);
  let string = "https://www.youtube.com/results?search_query=";
  let term = req.query.term;
  term = term.split(" ").join("+");
  term = string.concat(term);
  let url = encodeURI(term);
  let response = await request(url);
  let $ = cheerio.load(response);
  let timeArray = [];
  let dataArray = [];
  let data = $('[class="yt-lockup-title "]');
  let videoTime = $('[class="video-time"]');
  let href = {};
  let title = {};
  for (let i = 0; i < data.length - 3; i++) {
    if (typeof data[i] !== "undefined") {
      href = data[i].children[0].attribs.href;
      title = data[i].children[0].attribs.title;
      if (href[1] === "w") {
        dataArray.push({
          videoId: href.split("v=")[1],
          title: title,
          uniqueId: Math.random()
        });
      }
    }
    if (typeof videoTime[i] !== "undefined") {
      const videoTime2 = videoTime[i].children[0].data;
      timeArray.push(videoTime2);
    }
  }
  let array = dataArray.map((track, index) => ({
    title: track.title,
    uniqueId: track.uniqueId,
    videoId: track.videoId,
    duration: timeArray[index]
  }));
  res.json({ array });
};
exports.scrape = async function(req, res, next) {
  //console.log(req.body.term);
  let tracks = req.body.items;
  let promises = [];
  let string = "https://www.youtube.com/results?search_query=";
  for (let i = 0; i < tracks.length; i++) {
    let artistName = tracks[i].artistName;
    let title = tracks[i].title;
    let term = title + " " + artistName; //need to think about how to improve
    term = term.split(" ").join("+");
    term = string.concat(term);

    await timeout(60); //Delay so we won't get problems with too many requests to the page

    promises.push(handleScrape(term, 0));
  }
  Promise.all(promises)
    .then(results => {
      res.json(results);
    })
    .catch(e => {
      res.json(e);
    });
};

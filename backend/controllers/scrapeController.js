const request = require("request-promise");
const cheerio = require("cheerio");

const handleScrape = async (term, counter) => {
  try {
    let url = encodeURI(term);
    let response = await request(url).catch(e => {
      console.log(e);
      return;
    }); //mby add catch here? .catch(err => console.log(err));
    let $ = cheerio.load(response);
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
        await timeout(60);
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
    //jotain logiikkaa riippuen siitä kuinka paljon meillä on itemeita, kuitenkin max 500 tässä ->
    //function.js sitten logiikkaa jos on yli 500 niin tehdään monessa eri erässä -> ei saada hang up erroria
    //tai esim funciton.js logiikkaa, että 50 tai 25 tai jopa 10 erissä, sitten saadaan lähetettyä siinä välissä aina front-endiin tietoa!!
    //use webvscraping buttonii disabled, jos loading niin ei vahingoskaa paina kaks kertaa :) ja checkki siihe funktioo
    //jos loading === true return
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

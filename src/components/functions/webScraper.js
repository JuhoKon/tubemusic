const request = require("request-promise");
const cheerio = require("cheerio");

const handleScrape = async (term, counter) => {
  try {
    let url = encodeURI(term);
    let response = await request("https://crossorigin.me/" + url).catch((e) => {
      return;
    }); //mby add catch here? .catch(err => console.log(err));
    let $ = cheerio.load(response);
    let videoTime = null;
    if (typeof $('[class="yt-lockup-title "]')[0] !== "undefined") {
      let data = $('[class="yt-lockup-title "]')[0].children[0].attribs;
      if (typeof $('[class="video-time"]')[0] !== "undefined") {
        videoTime = $('[class="video-time"]')[0].children[0].data;
      }

      //add retry when connection is lost
      return {
        videoId: data.href.split("v=")[1],
        title: data.title,
        duration: videoTime,
        scraped: true,
        uniqueId: Math.random(),
        date: Date.now(),
      };
    } else {
      if (counter < 5) {
        //try again

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
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const scrape = async function (items) {
  let tracks = items;
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
  return Promise.all(promises)
    .then((results) => {
      return results;
    })
    .catch((e) => {
      return e;
    });
};

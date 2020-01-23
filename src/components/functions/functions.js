import axios from "axios";
const key = "AIzaSyCc5tyizZ6BVh1XtAv_ItjIlS7QMKWhe0c";

export const handleSubmit = async termFromSearch => {
  axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 7,
        key: key,
        q: termFromSearch
      }
    })
    .then(res => {
      console.log(res.data.items);
      return res.data.items;
    });
};
export const getPlaylists = async () => {
  let res = await axios.get("http://localhost:8080/playlists");

  return res;
};

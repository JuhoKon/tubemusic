import axios from "axios";
const key = "AIzaSyCc5tyizZ6BVh1XtAv_ItjIlS7QMKWhe0c";

export const handleSubmit = async termFromSearch => {
  let res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      maxResults: 7,
      key: key,
      q: termFromSearch
    }
  });
  return res.data.items;
};
export const getPlaylists = async () => {
  let res = await axios.get("http://localhost:8080/playlists");

  return res;
};
export const makePlaylist = async body => {
  console.log(body);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  let res = await axios.post(
    "http://localhost:8080/playlists/create",
    body,
    config
  );
  return res;
};
export const updatePlaylist = async (body, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  let res = await axios.put(
    `http://localhost:8080/playlists/update/${id}`,
    body,
    config
  );
  return res;
};
//TODO: delete

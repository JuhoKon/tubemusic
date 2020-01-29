import axios from "axios";
const key = "AIzaSyCc5tyizZ6BVh1XtAv_ItjIlS7QMKWhe0c";
const clientId = "dc20085012814f3d8cab4b36a4144393";
export const handleSubmit = async termFromSearch => {
  let res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      maxResults: 30,
      key: key,
      q: termFromSearch
    }
  });

  return res.data.items;
};
export const getContentDetails = async ListOfIds => {
  let res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "contentDetails",
      id: ListOfIds,
      key: key
    }
  });
  return res.data.items;
};
export const getSpotifyUserId = async token => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  let res = await axios.get("https://api.spotify.com/v1/me", config);

  return res;
};
export const getSpotifyUsersPlaylists = async token => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  let res = await axios.get("https://api.spotify.com/v1/me/playlists", config);
  return res.data;
};
export const getRequestWithToken = async (token, address) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  let res = await axios.get(address, config);
  return res.data;
};
export const getPlaylistTracks = async (id, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  let res = await axios.get(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    config
  );
  //console.log(res.data.items);
  return res.data;
};

/* -------------------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------*/
//////////////          SPOTIFY & YOUTUBE API ABOVE ////////////////////////
/* -------------------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------*/
export const getPlaylists = async () => {
  let res = await axios.get("http://localhost:8080/playlists");
  return res;
};
export const makePlaylist = async body => {
  //console.log(body);
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
export const deletePlaylist = async id => {
  let res = await axios.delete(`http://localhost:8080/playlists/delete/${id}`);
  return res;
};
export const getPlayListById = async id => {
  let res = await axios.get(`http://localhost:8080/playlists/find/${id}`);
  return res;
};

import axios from "axios";
import { authenticationService } from "./authenthication";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";
import jwt from "jsonwebtoken";

const key = "AIzaSyCc5tyizZ6BVh1XtAv_ItjIlS7QMKWhe0c"; //spotify
//const clientId = "dc20085012814f3d8cab4b36a4144393"; youtube
export const handleScrape = async items => {
  let res = await axios
    .post(
      "http://localhost:8080/scrape/scrape",
      {
        items: items
      },
      tokenConfig()
    )
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });

  if (res) {
    return res.data;
  } else {
    return null;
  }
};
//////////////////////////////////////////////////////////
export const handleSubmit = async termFromSearch => {
  //SETUPPING HEADERS ETC.
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      item: termFromSearch
    }
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  /////////
  let res = await axios
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });

  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
export const handleSubmit2 = async termFromSearch => {
  let res = await axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 30,
        key: key,
        q: termFromSearch
      }
    })
    .catch(err => console.log(err));
  console.log(res.data.items);
  if (res) {
    return res.data.items;
  } else {
    return null;
  }
};
export const handleSpotifySearchFromYoutube = async termFromSearch => {
  //OLD
  let res = await axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 1,
        key: key,
        q: termFromSearch
      }
    })
    .catch(err => console.log(err));

  if (res) {
    return res.data.items;
  } else {
    return null;
  }
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
  let res = await axios
    .get("http://localhost:8080/playlists", tokenConfig())
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });

  //console.log(res);
  return res;
};
/*export const getPlaylists = async () => {
  let res = await axios.get("http://localhost:8080/playlists");
  return res;
};*/
export const makePlaylist = async body => {
  //console.log(body);

  let res = await axios
    .post("http://localhost:8080/playlists/create", body, tokenConfig())
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });

  return res;
};

export const updatePlaylist = async (body, id) => {
  let res = await axios.put(
    `http://localhost:8080/playlists/update/${id}`,
    body,
    tokenConfig()
  );
  return res;
};
export const deletePlaylist = async id => {
  let res = await axios
    .delete(`http://localhost:8080/playlists/delete/${id}`, tokenConfig())
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });
  return res;
};
export const getPlayListById = async id => {
  let res = await axios
    .get(`http://localhost:8080/playlists/find/${id}`, tokenConfig())
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });
  return res;
};

export const addUserPlaylist = async (playlistid, name, token) => {
  const body = JSON.stringify({ playlistId: playlistid, playlistName: name });
  let res = await axios
    .put("http://localhost:8080/users/addPlaylist", body, tokenConfig())
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });
};
export const deleteUserPlaylist = async (playlistid, token) => {
  let res = await axios
    .delete(
      `http://localhost:8080/users/deletePlaylist${playlistid}`,
      tokenConfig()
    )
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });
  return res;
};
export const updateUserPlaylist = async (playlistid, name, token) => {
  const body = JSON.stringify({ playlistId: playlistid, playlistName: name });
  let res = await axios
    .put(
      `http://localhost:8080/users/editPlaylist${playlistid}`,
      body,
      tokenConfig()
    )
    .catch(err => {
      handleError(err).then(res => {
        return res;
      });
    });
};
const tokenConfig = () => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    const decode = jwt.decode(currentUser.token);
    if (!decode) {
      authenticationService.logout();
      window.location.reload(true);
    }
    const diff = Math.floor(new Date().getTime() / 1000) - decode.exp;

    if (diff > -60 * 10 && diff < -30) {
      config.headers["x-auth-token"] = currentUser.token;
      //if token will expire in 10mins && will not expire in 30seconds
      //issue new Token
      axios.get("http://localhost:8080/auth/renew", config).then(res => {
        authenticationService.newToken(res.data);
      });
    } else {
      //either it's okay or too late to renew
      //error handler will handle once the token goes invalid finally
      config.headers["x-auth-token"] = currentUser.token;
    }
  }
  return config;
};

import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";

import {
  getSpotifyUserId,
  getSpotifyUsersPlaylists,
  getRequestWithToken
} from "../functions/functions";

export default class Spotify extends Component {
  state = {
    auth: false,
    token: null,
    userPlaylists: [],
    display_name: "",
    user_id: "",
    nextPlaylists: null,
    chosenPlaylist: [] //chosen playlist
  };
  async getUserId(token) {
    let data = await getSpotifyUserId(token);
    this.getPlayListData(token);
    console.log(data.data);
    this.setState({
      display_name: data.data.display_name,
      user_id: data.data.id
    });
  }
  async getPlayListData(token) {
    let data = await getSpotifyUsersPlaylists(token);
    let nextData = null;
    this.setState({
      userPlaylists: data.items
    });
    while (data.next !== null || typeof data.next !== "undefined") {
      nextData = await getRequestWithToken(token, data.next);
      console.log(nextData);
      this.setState({
        userPlaylists: this.state.userPlaylists.concat(nextData.items)
      });
      if (nextData.next === null) {
        break;
      }
      data.next = nextData.next;
    }
  }
  componentDidMount() {
    let url = window.location.href;
    url = url.split("_token=")[1]; //extract token from the url
    if (typeof url !== "undefined") {
      url = url.split("&token")[0];
      this.setState({
        token: url,
        auth: true
      });
      this.getUserId(url);
      //playlist haku->
    } else {
      this.setState({
        token: null,
        auth: false
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Import your spotify playlists into the app!</h3>
        <div className="container-fluid">
          <Row>
            <Col sm="4">
              Hello, you are logged in as <br />
              {this.state.display_name}
            </Col>
            <Col sm="4">
              <Button
                href={
                  "https://accounts.spotify.com/authorize?client_id=dc20085012814f3d8cab4b36a4144393&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fspotify&show_dialog=true&scope=playlist-read-private%20playlist-read-collaborative%20user-follow-read"
                }
              >
                Log in
              </Button>
            </Col>
            <Col sm="4">
              <Button></Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

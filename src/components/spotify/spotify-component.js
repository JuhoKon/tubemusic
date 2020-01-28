import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import Videolist from "../videolist/videolist";
import Search from "../search/search";
import Queue from "../queue/queue";
import Player from "../player/Player";
import Playlist from "../playlist/playlist";
import nameGenerator from "../functions/nameGenerator";
import {
  handleSubmit,
  getPlaylists,
  makePlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlayListById,
  getContentDetails
} from "../functions/functions";

export default class Spotify extends Component {
  state = {
    auth: false,
    token: null
  };

  componentDidMount() {
    let url = window.location.href;
    url = url.split("_token=")[1]; //extract token from the url
    if (typeof url !== "undefined") {
      url = url.split("&token")[0];
      this.setState({
        token: url,
        auth: true
      });
      console.log(url);
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
            <Col sm="4">sd</Col>
            <Col sm="4">
              Login to spotify
              <Button
                href={
                  "https://accounts.spotify.com/authorize?client_id=dc20085012814f3d8cab4b36a4144393&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fspotify"
                }
              >
                Authorize
              </Button>
            </Col>
            <Col sm="4">as</Col>
          </Row>
        </div>
      </div>
    );
  }
}

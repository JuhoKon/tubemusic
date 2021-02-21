import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import SpotifyPlaylist from "./spotifyplaylist/spotifyPlaylist";
import {
  getSpotifyUserId,
  getSpotifyUsersPlaylists,
  getRequestWithToken,
} from "../functions/functions";
import DiscoveryModal from "./discover/spotifySearchModal";
export default class Spotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      token: null,
      userPlaylists: [],
      display_name: "",
      user_id: "",
      nextPlaylists: null,
      loading: false,
      chosenPlaylist: [], //chosen playlist
      isOpen: false,
    };
    this.getUserId = this.getUserId.bind(this);
    this.getPlayListData = this.getPlayListData.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async getUserId(token) {
    this.setState({
      loading: true,
    });
    let data = await getSpotifyUserId(token);
    setTimeout(
      function () {
        this.getPlayListData(token);
      }.bind(this),
      2000
    );
    //console.log(data.data);
    this.setState({
      display_name: data.data.display_name,
      user_id: data.data.id,
    });
  }
  async getPlayListData(token) {
    this.setState({
      loading: true,
    });
    let data = await getSpotifyUsersPlaylists(token);

    let dataArray = [];
    let nextData = null;
    dataArray = data.items;

    while (typeof data.next !== "undefined" && data.next !== null) {
      nextData = await getRequestWithToken(token, data.next);
      //console.log(nextData);
      dataArray = dataArray.concat(nextData.items);

      if (nextData.next === null) {
        break;
      }
      data.next = nextData.next;
    }
    //editing data array
    let imageArray = [];
    let trackRefArray = [];
    let ownerArray = [];
    let trackTotalArray = [];
    //console.log(dataArray);
    let userPlaylists = [];
    dataArray.forEach((item) =>
      item.images[0]
        ? imageArray.push(item.images[0].url)
        : imageArray.push(null)
    );
    dataArray.forEach((item) => trackRefArray.push(item.tracks.href));
    dataArray.forEach((item) => trackTotalArray.push(item.tracks.total));
    dataArray.forEach((item) => ownerArray.push(item.owner.display_name));

    for (let i = 0; i < dataArray.length; i++) {
      let dataObject = {};
      dataObject["id"] = dataArray[i].id;
      dataObject["name"] = dataArray[i].name;
      dataObject["description"] = dataArray[i].description;
      dataObject["imageUrl"] = imageArray[i];
      dataObject["trackRef"] = trackRefArray[i];
      dataObject["ownerName"] = ownerArray[i];
      dataObject["totalTracks"] = trackTotalArray[i];
      userPlaylists.push(dataObject);
    }

    this.setState({
      loading: false,
      userPlaylists,
    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  componentDidMount() {
    let url = window.location.href;
    url = url.split("_token=")[1]; //extract token from the url
    if (typeof url !== "undefined") {
      url = url.split("&token")[0];
      this.setState({
        token: url,
        auth: true,
      });
      this.getUserId(url);
      //playlist haku->
    } else {
      this.setState({
        token: null,
        auth: false,
      });
    }
  }

  render() {
    //console.log(this.state);

    return (
      <div className="homepage-div">
        <br />
        <h3>Import your spotify playlists into the app!</h3>
        <div className="container-fluid">
          <Row>
            <Col sm="4" className="spotifypage1">
              {this.state.auth ? (
                <span>
                  Hello, you are logged in as <br />
                  {this.state.display_name} !+
                </span>
              ) : (
                "Please login to use the playlist importer!"
              )}
            </Col>
            {/*https://tubemusicapp.herokuapp.com/spotify */}
            <Col sm="4" className="spotifypage2">
              {/*https://accounts.spotify.com/authorize?client_id=dc20085012814f3d8cab4b36a4144393&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fspotify&show_dialog=true&scope=playlist-read-private%20playlist-read-collaborative%20user-follow-read */}
              <Button
                href={
                  "https://accounts.spotify.com/fi/authorize?client_id=dc20085012814f3d8cab4b36a4144393&response_type=token&redirect_uri=https:%2F%2Ftubemusicapp.herokuapp.com%2Fspotify&show_dialog=true&scope=playlist-read-private%20playlist-read-collaborative%20user-follow-read"
                }
              >
                {this.state.auth ? "Change account." : "Log in."}
              </Button>
              <br />
              <br />
              {this.state.auth ? (
                <Button className="discover-button" onClick={this.toggle}>
                  {" "}
                  Discover
                </Button>
              ) : null}
            </Col>
            <Col sm="4" className="spotifypage3">
              {this.state.auth ? (
                <SpotifyPlaylist
                  Userplaylists={this.state.userPlaylists}
                  loading={this.state.loading}
                  token={this.state.token}
                />
              ) : (
                ""
              )}
            </Col>
            <DiscoveryModal
              token={this.state.token}
              isOpen={this.state.isOpen}
              toggle={this.toggle}
            />
          </Row>
        </div>
      </div>
    );
  }
}

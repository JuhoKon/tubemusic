import React, { Component } from "react";
import { getPlaylists, getPlayListById } from "../functions/functions";
import { authenticationService } from "../functions/authenthication";
import PlaylistsList from "./playlistsList";
import PlayListEditor from "./playlistEditor/playlistEditor";
//import PlaylistsList from "../admin/PlaylistsList";
import Spinner from "../spinner/spinner";
import { Row, Col, Input } from "reactstrap";

import "./styles.css";

//https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/
export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      token: "",
      filter: "",
      tracks: [],
      loading: true
    };
    this.loadPlaylists = this.loadPlaylists.bind(this);
    this.getPlayListById = this.getPlayListById.bind(this);
    // redirect to home if already logged in
  }

  async loadPlaylists() {
    let res = await getPlaylists();
    this.setState({
      playlists: res.data.Playlist
    });
  }
  async getPlayListById(id) {
    this.setState({
      loading: true
    });
    //tähä vois laittaa ihan pienen delayn.
    const result = await getPlayListById(id);
    this.setState({
      tracks: result.data.playlist,
      loading: false
    });
    //console.log(result);
  }
  componentDidMount() {
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      this.setState({
        token: currentUser.token
      });
      this.loadPlaylists();
    }
  }
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };
  render() {
    const { token, playlists, filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    //console.log(playlist);
    const filteredData = playlists.filter(item => {
      if (item === null || typeof item === "undefined") return playlists; //problems
      return Object.keys(item).some(
        key =>
          typeof item[key] === "string" &&
          key !== "_id" &&
          //only filter based on name
          item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    console.log(filteredData);
    return (
      <div className="container-fluid homepage-div">
        Playlists to choose from :)!
        <div id="spinnerDiv">{this.state.loading ? <Spinner /> : " Hello"}</div>
        {/*tee uus spinneri sinne spinner kansioo , vähä elegantimpi ja tähä*/}
        <br />
        <div className="container-fluid">
          <Row>
            <Col xs="4" sm="4" className="spotifypage1">
              <br />
              You can subscribe to public playlists or just load a playlist by
              clicking on the name and editing on the playlist-editor on the
              right side.
              <br />
              <br />
              <Input
                value={filter}
                onChange={this.handleChange}
                placeholder="Filter playlists..."
              />
              <PlaylistsList
                loadPlaylists={this.loadPlaylists}
                token={token}
                playlists={filteredData}
                getPlayListById={this.getPlayListById}
              />
            </Col>
            <Col xs="8" sm="8" className="spotifypage2">
              Chosen playlist. With options to A) Make a copy to your playlists
              B) If it's a yhteissoittolista: "subscribe"
              <div
                className={
                  this.state.tracks.length
                    ? "playListEditorActive"
                    : "playListEditorNotActive"
                }
              >
                {this.state.tracks.length ? (
                  <PlayListEditor
                    loadPlaylists={this.loadPlaylists}
                    token={token}
                    playlists={filteredData}
                    getPlayListById={this.getPlayListById}
                    tracks={this.state.tracks}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

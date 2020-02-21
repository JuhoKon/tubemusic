import React, { Component } from "react";
import { getPlaylists, getPlayListById } from "../functions/functions";
import { authenticationService } from "../functions/authenthication";
import PlaylistsList from "./playlistsList";
//import PlaylistsList from "../admin/PlaylistsList";
import { Row, Col, Input } from "reactstrap";

import "./styles.css";

//https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/
export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      token: "",
      filter: ""
    };
    this.loadPlaylists = this.loadPlaylists.bind(this);
    // redirect to home if already logged in
  }
  async loadPlaylists() {
    let res = await getPlaylists();
    this.setState({
      playlists: res.data.Playlist
    });
  }
  async getPlayListById(id) {
    const result = await getPlayListById(id);
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
        <br />
        <h3>Public playlists</h3>

        <div className="container-fluid">
          <Row>
            <Col xs="4" sm="4" className="spotifypage1">
              Playlists to choose from :)!
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
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

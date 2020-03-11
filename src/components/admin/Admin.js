import React, { Component } from "react";
import { authenticationService } from "../functions/authenthication";
import { getPlaylists, deletePlaylist } from "../functions/functions";
import PlaylistsList from "./PlaylistsList";
import { Row, Col } from "reactstrap";
import "./admin.css";
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      token: ""
    };
    this.loadPlaylists = this.loadPlaylists.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
  }
  async loadPlaylists() {
    console.log("I shouldn't");
    let res = await getPlaylists();
    this.setState({
      playlists: res.data.Playlist
    });
  }
  async deletePlaylist(id) {
    await deletePlaylist(id);

    this.loadPlaylists();
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

  render() {
    //console.log(this.state);
    const { token, playlists } = this.state;
    //console.log(filteredData);
    return (
      <div>
        <div className="container-fluid homepage-div">
          <Row>
            <Col xs="2" sm="2" className="adminpage1">
              ds
            </Col>
            <Col xs="6" sm="6" className="adminpage2">
              <PlaylistsList
                loadPlaylists={this.loadPlaylists}
                token={token}
                playlists={playlists}
                deletePlaylist={this.deletePlaylist}
              />
            </Col>
            <Col xs="4" sm="4" className="adminpage3">
              d
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default AdminPage;

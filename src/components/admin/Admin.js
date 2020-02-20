import React, { Component } from "react";
import { authenticationService } from "../functions/authenthication";
import { getPlaylists } from "../functions/functions";
import { AutoSizer } from "react-virtualized";
import PlaylistsList from "./PlaylistsList";
import { Row, Col, Container } from "reactstrap";
import "./admin.css";
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      token: ""
    };
    this.loadPlaylists = this.loadPlaylists.bind(this);
  }
  async loadPlaylists() {
    let res = await getPlaylists();
    this.setState({
      playlists: res.data.Playlist
    });
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
    console.log(this.state);
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

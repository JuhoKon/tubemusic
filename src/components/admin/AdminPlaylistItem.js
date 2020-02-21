import React, { Component } from "react";
import { Card, CardBody, CardText, Row, Col, Button } from "reactstrap";
import Moment from "react-moment";
import "moment-duration-format";
import { getPlayListById, deletePlaylist } from "../functions/functions";
import AdminPlaylistModal from "./AdminPlaylistModal";

class AdminPlaylistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.deletePlaylist = this.deletePlaylist.bind(this);
  }
  deletePlaylist() {
    deletePlaylist(this.props.id);
    this.props.loadPlaylists();
  }
  async clickOnPlayList() {
    this.setState({
      loading: true
    });
    const result = await getPlayListById(this.props.id);

    this.setState({
      playlist: result.data.playlist,
      playlistName: result.data.name,
      playlistId: result.data._id,
      loading: false,
      private: result.data.private
    });
    this.toggleList();
  }
  toggleList = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    //console.log(this.props);
    //console.log(this.state);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="6" sm="6">
                <Button
                  href="# "
                  color="secondary"
                  style={{ cursor: "pointer" }}
                  onClick={this.clickOnPlayList.bind(this, this.state)}
                >
                  <CardText>{this.props.name}</CardText>
                </Button>
              </Col>

              <Col xs="4" sm="4">
                <small className="text-muted">
                  Created at:{" "}
                  <Moment format="DD-MM-YYYY HH:mm">
                    {this.props.createdAt}
                  </Moment>
                </small>
              </Col>

              <Col xs="2" sm="2">
                <Button onClick={this.deletePlaylist.bind(this)}>Delete</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <AdminPlaylistModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          name={this.state.playlistName}
          playlists={this.state.playlist}
        ></AdminPlaylistModal>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default AdminPlaylistItem;

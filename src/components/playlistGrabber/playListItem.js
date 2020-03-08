import React, { Component } from "react";
import { Card, CardBody, CardText, Row, Col, Button } from "reactstrap";
import Moment from "react-moment";
import isEqual from "react-fast-compare";
import "moment-duration-format";
import { getPlayListById } from "../functions/functions";
import { addUserPlaylist, deleteUserPlaylist } from "../functions/functions";
import { authenticationService } from "../functions/authenthication";
class PlayListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserInfo: []
    };
  }

  clickOnPlayList() {
    this.props.getPlayListById(this.props.id);
  }
  async load(token) {
    const Array2 = [];
    let response = await authenticationService.loadUser(token);
    if (response !== null) {
      response.playlists.forEach(element => {
        Array2.push(element._id);
      });
      this.setState({
        currentUserInfo: Array2
      });
    }
  }
  componentDidMount() {
    this.load(this.props.token);
  }
  async subscribe() {
    console.log(this.props);
    console.log(this.state);
    await addUserPlaylist(
      this.props.id,
      this.props.name,
      this.props.private,
      this.props.owner,
      this.props.createdAt,
      this.props.token
    );
    this.load(this.props.token);
    //props has token,createdAt,id,owner,private
    //adds this playlist ID and NAME to current users (token)
    //playlists.
    //he cannot change name but he can delete & add items & change order
  }
  async unsubscribe() {
    await deleteUserPlaylist(this.props.id);
    this.load(this.props.token);
  }
  render() {
    const playlists = this.state.currentUserInfo || "s";
    const id = this.props.id;
    //console.log(this.props);
    //console.log(this.state);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="2" sm="2">
                {playlists.includes(id) ? (
                  <div>
                    <Button
                      disabled={this.props.private}
                      href="# "
                      color="secondary"
                      style={{ cursor: "pointer" }}
                      onClick={this.unsubscribe.bind(this, this.state)}
                    >
                      <CardText>Unsubscribe</CardText>{" "}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      disabled={this.props.private}
                      href="# "
                      color="secondary"
                      style={{ cursor: "pointer" }}
                      onClick={this.subscribe.bind(this, this.state)}
                    >
                      <CardText>Subscribe</CardText>{" "}
                    </Button>
                  </div>
                )}
              </Col>
              <Col xs="4" sm="4">
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
                By {this.props.owner}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default PlayListItem;

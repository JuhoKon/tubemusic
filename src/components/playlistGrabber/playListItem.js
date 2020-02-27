import React, { Component } from "react";
import { Card, CardBody, CardText, Row, Col, Button } from "reactstrap";
import Moment from "react-moment";
import "moment-duration-format";
import { getPlayListById } from "../functions/functions";

class PlayListItem extends Component {
  constructor(props) {
    super(props);
  }

  clickOnPlayList() {
    this.props.getPlayListById(this.props.id);
  }
  subscribe(playlist) {
    console.log(this.props);
    //props has token,createdAt,id,owner,private
    //adds this playlist ID and NAME to current users (token)
    //playlists.
    //he cannot change name but he can delete & add items & change order
  }
  render() {
    //console.log(this.props);
    //console.log(this.state);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="2" sm="2">
                <Button
                  disabled={this.props.private}
                  href="# "
                  color="secondary"
                  style={{ cursor: "pointer" }}
                  onClick={this.subscribe.bind(this, this.state)}
                >
                  <CardText>Subscribe</CardText>{" "}
                  {/* this also should be UnSubscribe if you have the playlist already?
                  should check it somehow maybe*/}
                  {/* Add this playlist id straight to current users array of playlists. */}
                  {/* disabled is based on the playlists public? */}
                </Button>
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

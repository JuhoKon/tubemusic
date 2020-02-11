import React, { Component } from "react";
import { Card, CardBody, CardText, Row, Col } from "reactstrap";

import "moment-duration-format";

class AdminPlaylistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    //console.log(this.state.name);
    return (
      <div>
        <a
          //href="# "
          style={{ cursor: "pointer" }}
        >
          <Card className="card">
            <CardBody>
              <Row>
                <Col xs="1" sm="1"></Col>
                <Col xs="8" sm="8">
                  <CardText>{this.props.name}</CardText>
                </Col>

                <Col xs="3" sm="3">
                  <small>{this.props.totalTracks} songs</small>
                </Col>
              </Row>
              <Row>
                <Col xs="6" sm="6">
                  <small className="float-left">
                    By {this.props.ownerName}
                  </small>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </a>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default AdminPlaylistItem;

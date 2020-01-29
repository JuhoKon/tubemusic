import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col
} from "reactstrap";

import Moment from "react-moment";
import moment from "moment";
import "moment-duration-format";

class PlaylistModalItem extends Component {
  render() {
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="1" sm="1"></Col>
              <Col xs="5" sm="5">
                <CardText>{this.props.title}</CardText>
              </Col>
              <Col xs="4" sm="4">
                <CardText className="float-left">
                  {this.props.artistName}
                </CardText>
              </Col>
              <Col xs="2" sm="2">
                <Button className="btn btn-primary">+</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default PlaylistModalItem;

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
import isEqual from "react-fast-compare";

class PlaylistModalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: this.props.artistName,
      title: this.props.title,
      imported: this.props.imported
    };
  }

  addToImport(props) {
    console.log(props);
    this.props.addToImport(props);
  }
  removeFromPlaylist(props) {
    this.props.removeFromPlaylist(props);
  }
  render() {
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="1" sm="1"></Col>
              <Col xs="5" sm="5">
                <CardText>{this.state.title}</CardText>
              </Col>
              <Col xs="4" sm="4">
                <CardText className="float-left">
                  {this.state.artistName}
                </CardText>
              </Col>
              <Col xs="2" sm="2">
                {this.state.imported ? (
                  <Button
                    onClick={this.removeFromPlaylist.bind(this, this.props)}
                    className="btn btn-primary"
                    color="danger"
                  >
                    x
                  </Button>
                ) : (
                  <Button
                    onClick={this.addToImport.bind(this, this.props)}
                    className="btn btn-primary"
                    color="primary"
                  >
                    +
                  </Button>
                )}
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

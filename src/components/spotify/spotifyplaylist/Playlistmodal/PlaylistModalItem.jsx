import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";

import "moment-duration-format";

class PlaylistModalItem extends Component {
  state = {
    artistName: this.props.artistName,
    title: this.props.title,
    imported: this.props.imported,
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    return false;
  }*/
  addToImport(props) {
    //console.log(props);
    this.props.addToImport(props);
  }
  removeFromPlaylist(props) {
    this.props.removeFromPlaylist(props);
  }
  render() {
    //console.log("item");
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Row>
              <Col xs="4" sm="4">
                <CardText>{this.state.title}</CardText>
              </Col>
              <Col xs="4" sm="4">
                <CardText className="float-left">
                  {this.state.artistName}
                </CardText>
              </Col>
              <Col xs="2" sm="2">
                {this.props.createdAt}
                {/* format better using moment */}
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

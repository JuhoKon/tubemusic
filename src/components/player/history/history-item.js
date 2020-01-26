import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button
} from "reactstrap";

class HistoryItem extends Component {
  loadPlaylist(playlist) {
    this.props.loadPlaylist(playlist);
  }
  deletePlaylist(playlist) {
    this.props.deletePlaylist(playlist._id);
  }
  render() {
    return (
      <div>
        <Card className="card">
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              <Button
                className="btn btn-primary float-right btn-remove"
                color="danger"
                onClick={this.deletePlaylist.bind(this, this.props)}
              >
                x
              </Button>
              <Button className="btn btn-primary float-right" color="info">
                + Queue
              </Button>
              <Button
                className="btn btn-primary float-left"
                color="primary"
                onClick={this.loadPlaylist.bind(this, this.props)}
              >
                Play
              </Button>
            </span>
            <CardTitle style={{ textAlign: "center" }}>
              {this.props.name}
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default HistoryItem;

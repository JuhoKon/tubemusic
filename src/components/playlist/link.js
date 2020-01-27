import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

class Link extends Component {
  loadPlaylist(playlist) {
    this.props.loadPlaylist(playlist._id);
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
                Delete
              </Button>
              <Button className="btn btn-primary float-right" color="info">
                Edit
              </Button>
              <Button
                className="btn btn-primary float-left"
                color="primary"
                onClick={this.loadPlaylist.bind(this, this.props)}
              >
                Load
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
export default Link;

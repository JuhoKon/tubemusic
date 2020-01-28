import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

class HistoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: Math.random(),
      title: this.props.name,
      videoId: this.props.url.split("https://www.youtube.com/watch?v=")[1]
    };
    this.loadPlaylist = this.loadPlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onAddToPlaylist = this.onAddToPlaylist.bind(this);
  }

  loadPlaylist(playlist) {
    this.props.loadPlaylist(playlist);
  }
  deletePlaylist(playlist) {
    this.props.deletePlaylist(playlist._id);
  }
  onAddClick = item => {
    this.props.addFunc(item);
  };
  onPlayClick = item => {
    this.props.onPlay(item);
  };
  onAddToPlaylist = item => {
    this.props.AddToPlaylist(item);
  };
  render() {
    //console.log(this.state);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              <Button
                className="btn btn-primary float-right btn-remove"
                color="secondary"
                onClick={this.onAddToPlaylist.bind(this, this.state)}
              >
                + P
              </Button>
              <Button
                className="btn btn-primary float-left btn-remove"
                onClick={this.onPlayClick.bind(this, this.state)}
                color="primary"
              >
                Play
              </Button>

              <Button
                className="btn btn-primary float-right btn-remove"
                color="info"
                onClick={this.onAddClick.bind(this, this.state)}
              >
                + Q
              </Button>
            </span>
            <CardTitle style={{ textAlign: "center" }}>
              {this.state.title}
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default HistoryItem;

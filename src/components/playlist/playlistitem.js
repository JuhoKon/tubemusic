import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button
} from "reactstrap";
import "./playlist.css";
import isEqual from "react-fast-compare";
class Playlistitem extends Component {
  state = {
    playlist: this.props.playlist
  };
  onAddClick = id => {
    this.props.addFunc(id);
  };
  onPlayClick = id => {
    this.props.onPlay(id);
  };
  onDeleteClick = id => {
    this.props.onDeleteFromPlaylist(id);
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      //if change in props
      this.setState({
        playlist: this.props.playlist
      });
    }
  }
  render() {
    // console.log(this.props);
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Button
              className="btn btn-primary btn-remove float-right"
              color="danger"
              onClick={this.onDeleteClick.bind(this, this.props)}
            >
              x
            </Button>
            <Button
              className="btn btn-primary float-right "
              color="info"
              onClick={this.onAddClick.bind(this, this.props)}
            >
              + Queue
            </Button>
            <Button
              className="btn btn-primary float-left"
              onClick={this.onPlayClick.bind(this, this.props)}
              color="primary"
            >
              Play
            </Button>
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>{this.props.channelTitle}</CardText>
          </CardBody>
        </Card>

        <br />
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Playlistitem;

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
class Playlistitem extends Component {
  onAddClick = id => {
    this.props.addFunc(id);
  };
  onPlayClick = id => {
    this.props.onPlay(id);
  };
  render() {
    return (
      <div>
        <Card className="card">
          <CardBody>
            <Button
              className="btn btn-primary btn-remove float-right"
              color="danger"
              onClick={this.onAddClick.bind(this, this.props)}
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

import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button
} from "reactstrap";
import "./videolist.css";
import Moment from "react-moment";
class Videoitem extends Component {
  onAddClick = id => {
    this.props.addFunc(id);
  };
  onPlayClick = id => {
    this.props.onPlay(id);
  };
  onAddToPlaylist = id => {
    this.props.AddToPlaylist(id);
  };
  render() {
    return (
      <div>
        {this.props.videoId ? (
          <Card className="card">
            <CardBody>
              <span style={{ flexDirection: "column" }}>
                <Button
                  className="btn btn-primary float-right"
                  color="info"
                  onClick={this.onAddClick.bind(this, this.props)}
                >
                  + Queue
                </Button>

                <Button
                  className="btn btn-primary float-left"
                  color="primary"
                  onClick={this.onPlayClick.bind(this, this.props)}
                >
                  Play
                </Button>
              </span>
              <CardTitle>{this.props.title}</CardTitle>
              <CardText>{this.props.channelTitle}</CardText>
              <CardText>
                <small className="text-muted">
                  <Moment format="DD/MM/YYYY">{this.props.publishedAt}</Moment>
                  <br />
                  <Moment fromNow>{this.props.publishedAt}</Moment>
                </small>
              </CardText>
              <CardImg
                width="10px"
                bottom
                src={this.props.thumbnail}
                alt={this.props.thumbnail}
              />
            </CardBody>
            <Button
              className="btn btn-primary float-right"
              color="secondary"
              onClick={this.onAddToPlaylist.bind(this, this.props)}
            >
              + Playlist
            </Button>
          </Card>
        ) : null}

        <br />
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Videoitem;

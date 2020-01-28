import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import "./videolist.css";
import Moment from "react-moment";
import moment from "moment";
import "moment-duration-format";

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
    //TODO: make it look much better
    return (
      <div>
        <Card className="card">
          <CardBody>
            <span style={{ flexDirection: "column" }}>
              <Button
                className="btn btn-primary float-right btn-remove"
                color="secondary"
                onClick={this.onAddToPlaylist.bind(this, this.props)}
              >
                + P
              </Button>

              <Button
                className="btn btn-primary float-left"
                color="primary"
                onClick={this.onPlayClick.bind(this, this.props)}
              >
                Play
              </Button>
              <Button
                className="btn btn-primary float-right btn-remove"
                color="info"
                onClick={this.onAddClick.bind(this, this.props)}
              >
                + Q
              </Button>
            </span>
            <CardTitle>{this.props.title}</CardTitle>
            {/* A JSX comment 
              <CardImg
                width="10px"
                bottom
                src={this.props.thumbnail}
                alt={this.props.thumbnail}
              />
              */}

            <small className="float-left">
              Length&nbsp;
              {moment.duration(this.props.duration).format("h:mm:ss")}
            </small>

            <small className="published">
              <Moment fromNow>{this.props.publishedAt}</Moment>
            </small>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Videoitem;

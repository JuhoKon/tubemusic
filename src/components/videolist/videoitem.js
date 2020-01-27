import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
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
    //TODO: make it look much better
    return (
      <div>
        {this.props.videoId ? (
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
            </CardBody>
          </Card>
        ) : null}
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Videoitem;

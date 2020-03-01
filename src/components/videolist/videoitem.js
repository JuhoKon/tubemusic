import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import "./videolist.css";
import "moment-duration-format";

class Videoitem extends Component {
  onAddClick = id => {
    this.props.addFunc({
      uniqueId: Math.random(),
      title: id.title,
      videoId: id.videoId,
      duration: id.duration,
      publishedAt: id.publishedAt,
      channelTitle: id.channelTitle
    });
  };
  onPlayClick = id => {
    this.props.onPlay({
      uniqueId: Math.random(),
      title: id.title,
      videoId: id.videoId,
      duration: id.duration,
      publishedAt: id.publishedAt,
      channelTitle: id.channelTitle
    });
  };
  onAddToPlaylist = id => {
    console.log(id);
    this.props.AddToPlaylist({
      uniqueId: Math.random(),
      title: id.title,
      videoId: id.videoId,
      duration: id.duration,
      publishedAt: id.publishedAt,
      channelTitle: id.channelTitle,
      date: Date.now()
    });
  };
  playNextClick = item => {
    this.props.playNext(item);
  };
  render() {
    //TODO: make it look much better
    return (
      <div>
        <Card className="card-2" id="videoitem">
          <CardBody>
            <Row>
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  <Button
                    className="btn btn-secondary float-right btn-item"
                    onClick={this.onPlayClick.bind(this, this.props)}
                  >
                    Play
                  </Button>
                </div>
              </Col>
              <Col xs="7" sm="7">
                <CardText>{this.props.title}</CardText>
              </Col>
              <Col xs="2" sm="2">
                <br />
                <br />
                <div className="placeforbutton">
                  <Button
                    className="btn btn-primary btn-item"
                    color="secondary"
                    onClick={this.onAddToPlaylist.bind(this, this.props)}
                  >
                    +P
                  </Button>
                </div>
              </Col>
              <Col xs="1" sm="1">
                <div className="placeforbutton">
                  <Button
                    className="btn btn-secondary  float-right btn-item"
                    color="secondary"
                    onClick={this.playNextClick.bind(this, this.props)}
                  >
                    +N
                  </Button>
                  <Button
                    className="btn btn-secondary  float-right btn-item"
                    color="secondary"
                    onClick={this.onAddClick.bind(this, this.props)}
                  >
                    +Q
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="4" sm="4">
                <small className="float-left">
                  Length&nbsp;
                  {this.props.duration}
                </small>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
//actions we want to use as second paranthesis
export default Videoitem;

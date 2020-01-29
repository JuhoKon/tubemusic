import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col
} from "reactstrap";
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
            <Row>
              <Col xs="2" sm="2">
                <div className="placeforbutton">
                  <Button
                    className="btn btn-primary btn-item"
                    onClick={this.onPlayClick.bind(this, this.props)}
                    color="primary"
                  >
                    Play
                  </Button>
                </div>
              </Col>
              <Col xs="7" sm="7">
                <CardText>{this.props.title}</CardText>
              </Col>
              <Col xs="1" sm="1">
                <div className="placeforbutton">
                  <Button
                    className="btn btn-primary float-right btn-item"
                    color="info"
                    onClick={this.onAddClick.bind(this, this.props)}
                  >
                    +Q
                  </Button>
                </div>
              </Col>
              <Col xs="2" sm="2">
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
            </Row>
            <Row>
              <Col xs="4" sm="4">
                <small className="float-left">
                  Length&nbsp;
                  {moment.duration(this.props.duration).format("h:mm:ss")}
                </small>
              </Col>
              <Col xs="4" sm="4">
                <small className="">
                  <Moment fromNow>{this.props.publishedAt}</Moment>
                </small>
              </Col>
              <Col xs="4" sm="4">
                <small className="">By: {this.props.channelTitle}</small>
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

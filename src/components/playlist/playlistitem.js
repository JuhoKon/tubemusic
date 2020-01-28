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
import "./playlist.css";
import isEqual from "react-fast-compare";
import Moment from "react-moment";
import moment from "moment";
import "moment-duration-format";

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
    //console.log(this.props.editMode);
    return (
      <Card className="card">
        <CardBody>
          {this.props.editMode ? (
            <Button
              className="btn btn-primary btn-remove float-right"
              color="danger"
              onClick={this.onDeleteClick.bind(this, this.props)}
            >
              x
            </Button>
          ) : null}

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
          <Row>
            <Col xs="6" sm="4">
              <small className="float-left">
                Length&nbsp;
                {moment.duration(this.props.duration).format("h:mm:ss")}
              </small>
            </Col>
            <Col xs="6" sm="4">
              <small className="published">
                <Moment fromNow>{this.props.publishedAt}</Moment>
              </small>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
//actions we want to use as second paranthesis
export default Playlistitem;
